FROM python:3.6
ENV PYTHONUNBUFFERED=1
RUN mkdir /movieholic
RUN mkdir /movieholic/backend
WORKDIR /movieholic/backend
COPY requirements.txt /movieholic/backend/
RUN pip install -r requirements.txt
COPY . /movieholic/backend/
#CMD ["sh", "-c", "python manage.py collectstatic --no-input; python manage.py migrate; gunicorn app.wsgi -b 0.0.0.0:8000"]
