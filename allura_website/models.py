from django.db import models


class Employee(models.Model):
    employee_id = models.PositiveIntegerField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_started = models.DateField()
    telephone = models.CharField(max_length=32, blank=True)
    email = models.EmailField(max_length=254, blank=True)

    class Meta:
        ordering = ['employee_id']

    def __str__(self):
        return f'{self.employee_id} {self.first_name} {self.last_name}'


class AppLog(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    computer_name = models.CharField(max_length=100)
    level = models.CharField(max_length=20)
    message = models.TextField()

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'app log'
        verbose_name_plural = 'app logs'

    def __str__(self):
        return f'{self.computer_name} {self.level}'
