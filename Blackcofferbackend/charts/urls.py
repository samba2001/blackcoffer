from django.urls import path
from charts.views import GetReports, FiltersData, ReportsInRange

urlpatterns = [
    path('get-reports', GetReports.as_view()),
    path('get-filters-data', FiltersData.as_view()),
    path('get-reports-in-range', ReportsInRange.as_view())
]
