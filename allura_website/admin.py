from django.contrib import admin

from .models import AppLog, Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['employee_id', 'first_name', 'last_name', 'date_started', 'telephone', 'email']
    search_fields = ['employee_id', 'first_name', 'last_name', 'telephone', 'email']
    ordering = ['employee_id']


@admin.register(AppLog)
class AppLogAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'computer_name', 'level', 'message_start']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'computer_name', 'level', 'message']

    @admin.display(description='message')
    def message_start(self, obj):
        return obj.message[:80]

    def has_add_permission(self, request):
        return False
