import json

from django.test import TestCase, override_settings

from allura_website.models import Employee


TOKEN = 'test-staff-token'
AUTH = {'HTTP_AUTHORIZATION': f'Bearer {TOKEN}'}


@override_settings(EMPLOYEE_API_TOKEN=TOKEN)
class EmployeeApiTests(TestCase):
    def test_practice_list_keeps_ids_and_gaps(self):
        ids = list(Employee.objects.values_list('employee_id', flat=True))
        self.assertEqual(len(ids), 38)
        self.assertEqual(ids[0], 1)
        self.assertNotIn(4, ids)
        self.assertNotIn(5, ids)
        self.assertEqual(ids[-1], 61)
        spaced = Employee.objects.get(pk=42)
        self.assertEqual(spaced.first_name, 'Abdi Fatah')
        blank = Employee.objects.get(pk=38)
        self.assertEqual(blank.telephone, '')
        self.assertEqual(blank.email, '')
        leading_zero = Employee.objects.get(pk=11)
        self.assertEqual(leading_zero.telephone, '05060706050')

    def test_rejects_missing_token(self):
        response = self.client.get('/api/employees/')
        self.assertEqual(response.status_code, 401)

    def test_list_is_ordered_and_uses_api_names(self):
        response = self.client.get('/api/employees/', **AUTH)
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload[0]['employeeID'], 1)
        self.assertEqual(payload[0]['dateStarted'], '2019-10-11')
        self.assertIsInstance(payload[0]['employeeID'], int)
        self.assertLess(payload[0]['employeeID'], payload[1]['employeeID'])

    def test_partial_name_filter(self):
        response = self.client.get('/api/employees/', {'firstName': 'abd'}, **AUTH)
        self.assertEqual(response.status_code, 200)
        names = [row['firstName'] for row in response.json()]
        self.assertIn('Abdi Fatah', names)
        self.assertTrue(all('abd' in name.lower() for name in names))

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
