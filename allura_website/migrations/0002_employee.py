from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allura_website', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('employee_id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('date_started', models.DateField()),
                ('telephone', models.CharField(blank=True, max_length=32)),
                ('email', models.EmailField(blank=True, max_length=254)),
            ],
            options={
                'ordering': ['employee_id'],
            },
        ),
    ]
