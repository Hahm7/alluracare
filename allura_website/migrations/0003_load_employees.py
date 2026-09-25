import csv
from datetime import datetime
from pathlib import Path

from django.db import migrations


def blank(value):
    text = (value or '').strip()
    if text.upper() == 'NULL':
        return ''
    return text


def load_employees(apps, schema_editor):
    Employee = apps.get_model('allura_website', 'Employee')
    csv_path = Path(__file__).resolve().parents[1] / 'data' / 'employee_list.csv'
    with csv_path.open(newline='', encoding='utf-8') as handle:
        for row in csv.DictReader(handle):
            Employee.objects.create(
                employee_id=int(row['employeeID']),
                first_name=row['firstName'],
                last_name=row['lastName'],
                date_started=datetime.strptime(row['dateStarted'], '%Y-%m-%d').date(),
                telephone=blank(row['telephone']),
                email=blank(row['email']),
            )


class Migration(migrations.Migration):

    dependencies = [
        ('allura_website', '0002_employee'),
    ]

    operations = [
        migrations.RunPython(load_employees, migrations.RunPython.noop),
    ]
