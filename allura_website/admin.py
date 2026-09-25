from django.contrib import admin

from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['employee_id', 'first_name', 'last_name', 'date_started', 'telephone', 'email']
    search_fields = ['employee_id', 'first_name', 'last_name', 'telephone', 'email']
    ordering = ['employee_id']
