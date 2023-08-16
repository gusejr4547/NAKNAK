
from django.urls import path
from . import views


urlpatterns = [
    path('test/', views.test),
    path('fishes/', views.fishes),
    path('test/', views.test),
]