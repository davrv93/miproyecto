from uuid import uuid4

from django.db import models
from django.db.models.deletion import ProtectedError
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
from datetime import datetime, timedelta

from aplicaciones.persona.models.tipo_hobby import TipoHobby

class Hobby(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    nombre = models.CharField(unique=True, max_length=30,
                              blank=False, null=False)
    tipo_hobby = models.CharField(max_length=30,
                              blank=False, null=False)


    class Meta:
        verbose_name = capfirst(_('Hobby'))
        db_table = 'persona_hobby'
        verbose_name_plural = capfirst(_('Hobby'))
        default_permissions = ()
        permissions = (
            ('add_hobby',
             'Puede agregar Hobby'),
            ('change_hobby',
             'Puede actualizar Hobby'),
            ('delete_hobby',
             'Puede eliminar Hobby'),
            ('list_hobby',
             'Puede listar Hobby'),
            ('get_hobby',
             'Puede obtener Hobby'),
            ('listform_hobby', 
              'Puede listar Hobby en Formularios'),

        )

   
    def __str__(self):
        return self.nombre

    def delete(self, *args, **kwargs):
        try:
            super(Hobby, self).delete(*args, **kwargs)
        except ProtectedError as e:
            return self.nombre
