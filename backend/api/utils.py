from django.utils import timezone


def get_current_timestamp():
    now = timezone.now().timestamp()
    return round(now)


def get_string_time(timestamp):
    return timestamp
