from django.urls import path
from . import views

urlpatterns = [path('', views.post_list, name='post_list'),
               path('about', views.about, name='about'),
               # path('list', views.index, name='index_list'),
               # path('list/new', views.new, name='new'),
               path('list/new', views.new, name='students_new'),
               path('list/', views.index, name='students'),
               path('list/(?P<surname>\d+)/edit/$', views.edit, name='students_edit'),
               ]
