from django.contrib import admin

from aplicaciones.persona.models.persona_natural import PersonaNatural
from aplicaciones.persona.models.tipo_hobby import TipoHobby
from aplicaciones.persona.models.hobby import Hobby

# Register your models here.
admin.site.register(PersonaNatural)
admin.site.register(TipoHobby)
admin.site.register(Hobby)
