# Generated by Django 4.0.6 on 2023-10-31 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('end_year', models.CharField(blank=True, max_length=10, null=True)),
                ('intensity', models.IntegerField()),
                ('sector', models.CharField(max_length=100)),
                ('topic', models.CharField(max_length=100)),
                ('insight', models.CharField(max_length=200)),
                ('url', models.URLField()),
                ('region', models.CharField(max_length=100)),
                ('start_year', models.CharField(blank=True, max_length=10, null=True)),
                ('impact', models.CharField(blank=True, max_length=100, null=True)),
                ('added', models.DateTimeField()),
                ('published', models.DateTimeField()),
                ('country', models.CharField(max_length=100)),
                ('relevance', models.IntegerField()),
                ('pestle', models.CharField(max_length=100)),
                ('source', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=200)),
                ('likelihood', models.IntegerField()),
            ],
        ),
    ]
