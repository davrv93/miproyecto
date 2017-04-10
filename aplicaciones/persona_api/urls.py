from django.conf.urls import url, include
from rest_framework import routers
from .views.persona_natural_view import PersonaNaturalViewSet
from .views.tipo_hobby_view import TipoHobbyViewSet
from .views.hobby_view import HobbyViewSet


router = routers.DefaultRouter()
router.register(r'persona_natural', PersonaNaturalViewSet)
router.register(r'hobby', HobbyViewSet)
router.register(r'tipo_hobby', TipoHobbyViewSet)



urlpatterns = [
    url(r'^', include(router.urls)),
]
