from django.urls import path
from . import views

urlpatterns = [
    path('api', views.igdb_view, name='home'),
]