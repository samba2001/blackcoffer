from rest_framework.response import Response
from rest_framework.views import APIView
from charts.reports_manager import get_reports, get_filters_data, get_reports_in_range


class GetReports(APIView):
    @staticmethod
    def get(request):
        try:
            return Response({'data': get_reports(request)}, status=200)
        except Exception as e:
            return Response({e})


class FiltersData(APIView):
    @staticmethod
    def get(request):
        try:
            return Response(get_filters_data(), status=200)
        except Exception as e:
            return Response({e})


class ReportsInRange(APIView):
    @staticmethod
    def get(request):
        try:
            return Response(get_reports_in_range(request), status=200)
        except Exception as e:
            return Response({e})
