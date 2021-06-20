from .views import RegisterAPI, LoginAPI, ReactAPI, CommentAPI
from django.urls import path
from knox import views as knox_views

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logout_all/', knox_views.LogoutAllView.as_view(), name='logout_all'),
    path('react/', ReactAPI.as_view(), name='react'),
    path('comment/', CommentAPI.as_view(), name='comment')
]
