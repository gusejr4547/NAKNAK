
from django.urls import path
from . import views


urlpatterns = [
    path('fishes/', views.fishes),
]