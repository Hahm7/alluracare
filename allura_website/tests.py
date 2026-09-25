import json

from django.test import TestCase, override_settings

from allura_website.models import Employee


TOKEN = 'test-staff-token'
AUTH = {'HTTP_AUTHORIZATION': f'Bearer {TOKEN}'}


@override_settings(EMPLOYEE_API_TOKEN=TOKEN)
class EmployeeApiTests(TestCase):
    def setUp(self):
        Employee.objects.create(
            employee_id=1,
            first_name='Ada',
            last_name='Example',
            date_started='2020-01-02',
            telephone='07000000001',
            email='ada@example.com',
        )
        Employee.objects.create(
            employee_id=2,
            first_name='Grace',
            last_name='Example',
            date_started='2021-03-04',
            telephone='',
            email='',
        )

    def test_rejects_missing_token(self):
        response = self.client.get('/api/employees/')
        self.assertEqual(response.status_code, 401)

    def test_list_is_ordered_and_uses_api_names(self):
        response = self.client.get('/api/employees/', **AUTH)
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload[0]['employeeID'], 1)
        self.assertEqual(payload[0]['firstName'], 'Ada')
        self.assertEqual(payload[0]['dateStarted'], '2020-01-02')
        self.assertIsInstance(payload[0]['employeeID'], int)
        self.assertLess(payload[0]['employeeID'], payload[1]['employeeID'])

    def test_partial_name_filter(self):
        response = self.client.get('/api/employees/', {'firstName': 'gra'}, **AUTH)
        self.assertEqual(response.status_code, 200)
        names = [row['firstName'] for row in response.json()]
        self.assertEqual(names, ['Grace'])

    def test_create_update_delete(self):
        created = self.client.post(
            '/api/employees/',
            data=json.dumps({
                'employeeID': 100,
                'firstName': 'Ada',
                'lastName': 'Lovelace',
                'dateStarted': '2024-02-01',
                'telephone': '07000000000',
                'email': 'ada@example.com',
            }),
            content_type='application/json',
            **AUTH,
        )
        self.assertEqual(created.status_code, 201)
        self.assertEqual(created.json()['employeeID'], 100)

        patched = self.client.patch(
            '/api/employees/100/',
            data=json.dumps({'telephone': '07111111111'}),
            content_type='application/json',
            **AUTH,
        )
        self.assertEqual(patched.status_code, 200)
        self.assertEqual(patched.json()['lastName'], 'Lovelace')
        self.assertEqual(patched.json()['telephone'], '07111111111')

        deleted = self.client.delete('/api/employees/100/', **AUTH)
        self.assertEqual(deleted.status_code, 204)
        self.assertFalse(Employee.objects.filter(pk=100).exists())
