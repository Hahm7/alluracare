import hmac
import json
from datetime import datetime

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Employee

API_FIELDS = {
    'employeeID': 'employee_id',
    'firstName': 'first_name',
    'lastName': 'last_name',
    'dateStarted': 'date_started',
    'telephone': 'telephone',
    'email': 'email',
}
PARTIAL_FILTERS = {'firstName', 'lastName', 'email'}
REQUIRED_ON_CREATE = ('employeeID', 'firstName', 'lastName', 'dateStarted')


def employee_payload(employee):
    return {
        'employeeID': employee.employee_id,
        'firstName': employee.first_name,
        'lastName': employee.last_name,
        'dateStarted': employee.date_started.isoformat(),
        'telephone': employee.telephone,
        'email': employee.email,
    }


def _authorized(request):
    expected = settings.EMPLOYEE_API_TOKEN or ''
    if not expected:
        return False
    header = request.headers.get('Authorization', '')
    prefix = 'Bearer '
    if not header.startswith(prefix):
        return False
    provided = header[len(prefix):]
    return hmac.compare_digest(provided, expected)


def _json_body(request):
    if not request.body:
        return {}, None
    try:
        data = json.loads(request.body.decode('utf-8'))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return None, JsonResponse({'detail': 'Request body must be JSON.'}, status=400)
    if not isinstance(data, dict):
        return None, JsonResponse({'detail': 'Request body must be a JSON object.'}, status=400)
    return data, None


def _clean_text(value):
    if value is None:
        return ''
    text = str(value).strip()
    if text.upper() == 'NULL':
        return ''
    return text


def _parse_date(value):
    text = _clean_text(value)
    try:
        return datetime.strptime(text, '%Y-%m-%d').date()
    except ValueError:
        return None


def _apply_fields(employee, data, creating):
    unknown = [key for key in data if key not in API_FIELDS]
    if unknown:
        return f'Unknown field: {unknown[0]}.'

    if creating:
        missing = [key for key in REQUIRED_ON_CREATE if key not in data]
        if missing:
            return f'Missing field: {missing[0]}.'

    if 'employeeID' in data:
        raw_id = data['employeeID']
        if isinstance(raw_id, bool) or not isinstance(raw_id, int) or raw_id < 1:
            return 'employeeID must be a positive integer.'
        if creating and Employee.objects.filter(pk=raw_id).exists():
            return 'An employee with this employeeID already exists.'
        if not creating and raw_id != employee.employee_id:
            return 'employeeID cannot be changed.'
        employee.employee_id = raw_id

    if 'firstName' in data:
        first_name = _clean_text(data['firstName'])
        if not first_name:
            return 'firstName is required.'
        employee.first_name = first_name

    if 'lastName' in data:
        last_name = _clean_text(data['lastName'])
        if not last_name:
            return 'lastName is required.'
        employee.last_name = last_name

    if 'dateStarted' in data:
        date_started = _parse_date(data['dateStarted'])
        if date_started is None:
            return 'dateStarted must be YYYY-MM-DD.'
        employee.date_started = date_started

    if 'telephone' in data:
        employee.telephone = _clean_text(data['telephone'])

    if 'email' in data:
        employee.email = _clean_text(data['email'])

    return None


def _filtered_employees(request):
    employees = Employee.objects.all()
    for name, value in request.GET.items():
        if name not in API_FIELDS or value == '':
            continue
        if name == 'employeeID':
            if not value.isdigit() or int(value) < 1:
                return None, JsonResponse({'detail': 'employeeID must be a positive integer.'}, status=400)
            employees = employees.filter(employee_id=int(value))
        elif name == 'dateStarted':
            if _parse_date(value) is None:
                return None, JsonResponse({'detail': 'dateStarted must be YYYY-MM-DD.'}, status=400)
            employees = employees.filter(date_started=value)
        elif name == 'telephone':
            employees = employees.filter(telephone=value)
        elif name in PARTIAL_FILTERS:
            employees = employees.filter(**{f'{API_FIELDS[name]}__icontains': value})
    return employees, None


@csrf_exempt
@require_http_methods(['GET', 'POST'])
def employees(request):
    if not _authorized(request):
        return JsonResponse({'detail': 'Staff token required.'}, status=401)

    if request.method == 'GET':
        queryset, error = _filtered_employees(request)
        if error:
            return error
        return JsonResponse([employee_payload(employee) for employee in queryset], safe=False)

    data, error = _json_body(request)
    if error:
        return error
    employee = Employee()
    message = _apply_fields(employee, data, creating=True)
    if message:
        return JsonResponse({'detail': message}, status=400)
    employee.save()
    return JsonResponse(employee_payload(employee), status=201)


@csrf_exempt
@require_http_methods(['PATCH', 'DELETE'])
def employee_detail(request, employee_id):
    if not _authorized(request):
        return JsonResponse({'detail': 'Staff token required.'}, status=401)

    try:
        employee = Employee.objects.get(pk=employee_id)
    except Employee.DoesNotExist:
        return JsonResponse({'detail': 'Employee not found.'}, status=404)

    if request.method == 'DELETE':
        employee.delete()
        return HttpResponse(status=204)

    data, error = _json_body(request)
    if error:
        return error
    if not data:
        return JsonResponse({'detail': 'No fields to update.'}, status=400)
    message = _apply_fields(employee, data, creating=False)
    if message:
        return JsonResponse({'detail': message}, status=400)
    employee.save()
    return JsonResponse(employee_payload(employee))
