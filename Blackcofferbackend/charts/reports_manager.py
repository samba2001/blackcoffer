from django.core.paginator import Paginator

from charts.models import Report
from django.db.models import Q
from charts.serializer import ReportSerializer


def get_reports(request=None):
    query = Q()
    params = request.query_params
    if request.GET.getlist('sector[]'):
        query = query & Q(sector__in=request.GET.getlist('sector[]'))
    if request.GET.getlist('source[]'):
        query = query & Q(source__in=request.GET.getlist('source[]'))
    if request.GET.getlist('topic[]'):
        query = query & Q(topic__in=request.GET.getlist('topic[]'))
    if request.GET.getlist('country[]'):
        query = query & Q(country__in=request.GET.getlist('country[]'))
    if request.GET.getlist('region[]'):
        query = query & Q(region__in=request.GET.getlist('region[]'))
    if request.GET.getlist('pestle[]'):
        query = query & Q(pestle__in=request.GET.getlist('pestle[]'))
    reports = Report.objects.filter(query).values()
    # serializer = ReportSerializer(data=reports, many=True)
    # if not serializer.is_valid():
    #     errors = serializer.errors

    return reports


def get_filters_data():
    reports = Report.objects.all()
    cities = set()
    sources = set()
    sectors = set()
    topics = set()
    countries = set()
    regions = set()
    pastle = set()
    for report in reports:
        sources.add(report.source)
        sectors.add(report.sector)
        topics.add(report.topic)
        countries.add(report.country)
        regions.add(report.region)
        pastle.add(report.pestle)
    return {'countires': countries, 'sectors': sectors, 'topics': topics, 'sources': sources, 'regions': regions,
            'pastle': pastle}


def get_reports_in_range(request):
    query = Q()

    if request.query_params['reporttype'] == 'intensity':
        query = query & Q(intensity=request.query_params['range'])
    if request.query_params['reporttype'] == 'likelihood':
        query = query & Q(likelihood=request.query_params['range'])
    if request.query_params['reporttype'] == 'impact':
        query = query & Q(impact=request.query_params['range'])
    if request.query_params['reporttype'] == 'country':
        query = query & Q(country=request.query_params['range'])
    if request.query_params['reporttype'] == 'relevance':
        query = query & Q(relevance=request.query_params['range'])
    if request.query_params['reporttype'] == 'region':
        query = query & Q(region=request.query_params['range'])
    reports = Report.objects.filter(query).values()
    paginator = Paginator(reports, 10)
    page = request.GET.get('page')
    items = paginator.get_page(page)
    response_data = {
        "page_number": items.number,
        "total_pages": paginator.num_pages,
        "has_previous": items.has_previous(),
        "has_next": items.has_next(),
        "data": list(items)
    }

    return response_data
