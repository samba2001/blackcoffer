import copy
import sys
from datetime import datetime

sys.path.insert(0, '.')
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Blackcofferbackend.settings')
import django

django.setup()

import pandas as pd
import json
from django.db import transaction
from charts.models import Report

file_path = '/home/mphs/Downloads/jsondata.json'
with open(file_path, 'r') as json_file:
    data = json.load(json_file)
df = pd.DataFrame(data)
bulk_list = []
with transaction.atomic():
    for index, row in df.iterrows():
        data_item = Report(
            end_year=row["end_year"] if row["end_year"] != '' else None,
            intensity=row["intensity"] if row["intensity"] != '' else None,
            sector=row["sector"] if row["sector"] != '' else None ,
            topic=row["topic"] if row["topic"] != '' else None,
            insight=row["insight"] if row["insight"] != '' else None,
            url=row["url"] if row["url"] != '' else None,
            region=row["region"] if row["region"] != '' else None,
            start_year=row["start_year"] if row["start_year"] != '' else None,
            impact=row["impact"] if row["impact"] != '' else None,
            added=datetime.strptime(row["added"], "%B, %d %Y %H:%M:%S") if row["added"] != '' else None,
            published=datetime.strptime(row["published"], "%B, %d %Y %H:%M:%S") if row["published"] != '' else None,
            country=row["country"] if row["country"] != '' else None,
            relevance=row["relevance"] if row["relevance"] != '' else None,
            pestle=row["pestle"] if row["pestle"] != '' else None,
            source=row["source"] if row["source"] != '' else None,
            title=row["title"] if row["title"] != '' else None,
            likelihood=row["likelihood"] if row["likelihood"] != '' else None,
        )
        bulk_list.append(data_item)

    Report.objects.bulk_create(bulk_list)
