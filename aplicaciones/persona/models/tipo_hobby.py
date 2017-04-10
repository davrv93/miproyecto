from uuid import uuid4

from django.db import models
from django.db.models.deletion import ProtectedError
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
from datetime import datetime, timedelta


class TipoHobby(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    nombre = models.CharField(unique=True, max_length=30,
                              blank=False, null=False)
    estado = models.CharField(max_length=1,
                              blank=False, null=False, default='1')

    class Meta:
        verbose_name = capfirst(_('TipoHobby'))
        db_table = 'persona_tipo_hobby'
        verbose_name_plural = capfirst(_('TipoHobby'))
        default_permissions = ()
        permissions = (
            ('add_hobby',
             'Puede agregar TipoHobby'),
            ('change_hobby',
             'Puede actualizar TipoHobby'),
            ('delete_hobby',
             'Puede eliminar TipoHobby'),
            ('list_hobby',
             'Puede listar TipoHobby'),
            ('get_hobby',
             'Puede obtener TipoHobby'),
            ('listform_hobby', 
              'Puede listar TipoHobby en Formularios'),

        )
    def __str__(self):
        return self.nombre

    #
    def delete(self, *args, **kwargs):
        try:
            super(TipoHobby, self).delete(*args, **kwargs)
        except ProtectedError as e:
            return self.nombre
