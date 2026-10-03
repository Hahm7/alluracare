from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .employee_api import _authorized, _json_body
from .models import AppLog

MESSAGE_LIMIT = 20000
ROW_LIMIT = 300


def _trim_rows():
    keep_ids = list(
        AppLog.objects.order_by('-created_at', '-id').values_list('id', flat=True)[:ROW_LIMIT]
    )
    if len(keep_ids) < ROW_LIMIT:
        return
    AppLog.objects.exclude(id__in=keep_ids).delete()


@csrf_exempt
@require_http_methods(['POST'])
def app_logs(request):
    if not _authorized(request):
        return JsonResponse({'detail': 'Staff token required.'}, status=401)

    content_type = request.content_type or ''
    if not content_type.startswith('application/json'):
        return JsonResponse({'detail': 'Request body must be JSON.'}, status=400)

    data, error = _json_body(request)
    if error:
        return error

    computer_name = str(data.get('computer_name') or '').strip()
    message = str(data.get('message') or '').strip()
    level = str(data.get('level') or '').strip() or 'ERROR'

    if not computer_name or not message:
        return JsonResponse({'detail': 'computer_name and message are required.'}, status=400)
    if len(computer_name) > 100 or len(level) > 20:
        return JsonResponse({'detail': 'computer_name or level is too long.'}, status=400)

    AppLog.objects.create(
        computer_name=computer_name,
        level=level,
        message=message[:MESSAGE_LIMIT],
    )
    _trim_rows()
    return HttpResponse(status=201)
