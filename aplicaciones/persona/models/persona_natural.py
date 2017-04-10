from uuid import uuid4

from django.db import models
from django.db.models.deletion import ProtectedError
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
from datetime import datetime, timedelta


class PersonaNatural(models.Model):
    # FIELDS O CAMPOS
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    # models. <<<< determina el tipo de campo que voy a crear
    # unique es un constraints o restricción
    # max_length es el máximo de caracteres
    # blank es para determinar si soporta  vacío
    # null es para determinar si soporta nulos
    # default es para determinar un valor por defecto
    nombre = models.CharField(unique=True, max_length=30,
                              blank=False, null=False)
    apellido = models.CharField(unique=True, max_length=30,
                              blank=False, null=False)

    # Atributos del Modelo
    # verbose_name es el nombre con que se muestra en el ADMIN
    # verbose_name_plural es el nombre con que se muestra en el ADMIN
    # db_table es el nombre de la tabla en base de datos
    # permissions son los 2 permisos básicos de todo modelo
    class Meta:
        verbose_name = capfirst(_('PersonaNatural'))
        db_table = 'persona_persona_natural'
        verbose_name_plural = capfirst(_('PersonaNatural'))
        default_permissions = ()
        permissions = (
            ('add_personanatural',
             'Puede agregar PersonaNatural'),
            ('change_personanatural',
             'Puede actualizar PersonaNatural'),
            ('delete_personanatural',
             'Puede eliminar PersonaNatural'),
            ('list_personanatural',
             'Puede listar PersonaNatural'),
            ('get_personanatural',
             'Puede obtener PersonaNatural'),
            ('listform_personanatural', 
              'Puede listar PersonaNatural en Formularios'),

        )

    # DEF
    # Equivale a ....
    # public int sumar(a,b)
    # {
    #     x=a+b
    #     return x
    # }
    # def es para declarar mis funciones

    # que retorna un nombre o descripción a ser utilizada
    def __str__(self):
        return self.nombre

    #
    def delete(self, *args, **kwargs):
        try:
            super(PersonaNatural, self).delete(*args, **kwargs)
        except ProtectedError as e:
            return self.nombre
