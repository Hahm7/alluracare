from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allura_website', '0003_load_employees'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('computer_name', models.CharField(max_length=100)),
                ('level', models.CharField(max_length=20)),
                ('message', models.TextField()),
            ],
            options={
                'verbose_name': 'app log',
                'verbose_name_plural': 'app logs',
                'ordering': ['-created_at'],
            },
        ),
    ]
