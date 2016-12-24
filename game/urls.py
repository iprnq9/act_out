from django.conf.urls import url
from . import views

from django.conf import settings

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^game/(?P<pk>\d+)/$', views.game_detail, name='game_detail'),
    url(r'^game/(?P<pk>\d+)/play$', views.game_play, name='game_play'),
    url(r'^game/(?P<pk>\d+)/add', views.game_add, name='game_add'),
]