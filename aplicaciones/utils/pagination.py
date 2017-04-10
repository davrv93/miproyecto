"""
@copyright   Copyright (c) 2016  Devhres Team
@author      Angel Sullon (@asullom)
@package     utils

Descripcion: pagination
"""
from django.db.models import F, Count
from django.db.models.functions import Concat
from django.db.models import CharField, Value as V
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
import ast
from itertools import chain
import json
from rest_framework import pagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework import serializers
from django.core.paginator import Paginator, InvalidPage

class DynamicSerializerModel(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)

        super(DynamicSerializerModel, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 5
    count_all = 5
    page_size_query_param = 'page_size'

    def siguente(self):
        if not self.page.has_next():
            return None
        page_number = self.page.next_page_number()
        return page_number

    def anterior(self):
        if not self.page.has_previous():
            return None
        page_number = self.page.previous_page_number()
        return page_number

    def plus(self):
        if not self.page.has_next():
            return None
        page = self.page.next_page_number() - 1
        return page

    def range(self):
        total = self.page.paginator.count
        start = self.page.start_index()
        end = self.page.end_index()
        rangep = '({0} - {1})/{2}'.format(start, end, total)
        return rangep

    def paginate_queryset(self, queryset, request, view=None):
        page_size = self.get_page_size(request)
        if not page_size:
            return None

        if page_size == -1:
            page_size = self.count_all

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages

        if int(page_number) < 0:
            page_number = 1

        try:
            if int(paginator.num_pages) < int(page_number):
                page_number = paginator.num_pages
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=six.text_type(exc)
            )
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            self.display_page_controls = True

        self.request = request
        return list(self.page)

    def get_paginated_response(self, data):
        return Response({
            'options': {
                'count': self.page.paginator.count,
                'countAll': self.count_all,
                'pages': self.page.paginator.num_pages,

                'page': self.page.number,
                'next': self.siguente(),
                'previous': self.anterior(),
                'range': self.range(),
                'page_size': self.page_size,
                'per': self.page_size,
            },
            'results': data
        })


class LocalPagination():
    pagination_class = StandardResultsSetPagination
    page = StandardResultsSetPagination

    def get_queryset(self):
        queryset = self.queryset
        orderBy = self.request.query_params.getlist('orderBy', '')
        exclude = self.request.query_params.get('exclude', '')
        queryFilter = self.request.query_params.get('queryFilter', '{}')
        query = self.request.query_params.get('query', '')
        defer = self.request.query_params.get('defer', '')
        queryExtra = self.request.query_params.get('queryExtra', '{}')
        page_size = self.request.query_params.get('page_size', 5)
        fields = self.request.query_params.get('fields', None)
        sort = self.request.query_params.get('sort', None)
        all = self.request.query_params.get('all', None)
        pag = self.request.query_params.get('page', None)
        if (self.request.query_params.get('page', None) is None):
            pag = 1

        self.page.count_all = self.queryset.count()
        self.page.page_size = int(page_size)
        
        if exclude is not '':
            queryset = queryset.exclude(
                **json.loads(exclude)).order_by(*orderBy).distinct()
                
        if queryExtra is not '' and queryExtra is not '{}':
            queryset = queryset.annotate(**self.qu(self)).filter(**json.loads(
                queryExtra)).distinct()

        if query is not '':
            queryset = queryset.annotate(**self.qu(self)).filter(reduce(OR,
                                                                        [Q(x) for x in ast.literal_eval(query)])).distinct()

        if queryFilter is not '' and query is '':
            queryset = queryset.annotate(**self.qu(self)).filter(**json.loads(
                queryFilter)).distinct()

        queryset = queryset.order_by(*orderBy).distinct()
        return queryset

    def get_related(self):

        """
        Funcion para identificar la relacion de objetos
        """
        results = []
        for field in self.queryset.latest('pk')._meta.fields:
            if field.get_internal_type() == "ForeignKey":
                results.append(dict(
                    type="ForeignKey",
                    field=field.name,
                    related_name=field.rel.related_name,
                    model=field.rel.to,
                    model_name=field.rel.to._meta.object_name))

            elif field.get_internal_type() == "OneToOneField":
                results.append(dict(
                    type="OneToOneField",
                    field=field.name,
                    related_name=field.rel.related_name,
                    model=field.rel.to,
                    model_name=field.rel.to._meta.object_name))
        return results


    def distinct(self, lista):
        """
        Funcion para realizar un distinct de objectos en una lista list() 
        """
        unique_list = [e for i, e in enumerate(lista) if lista.index(e) == i]
        return unique_list


    def make_query(self, input_hierarchys=None):
        modelo = self.queryset.latest('pk')._meta.object_name
        """
        Funcion para construir la consulta ORM para Django
        """
        query = []
        for sett in self.get_related():
            objects = []
            for obj in input_hierarchys:
                if obj._meta.object_name == sett['model_name']:
                    objects.append(str(obj.id))
                    kwargs_filter = {'{0}__{1}'.format(sett['field'], 'in'): objects}
                    query.append(kwargs_filter)
        query_filter = str(dict(chain.from_iterable(d.items() for d in query))) 
        return query_filter


 


        

    def query(self, default_fields=None, default_ordered=None, serialized=None, static=None):

        """
        Filtro base permiso user. 
        """
        queryset = self.queryset
        orderBy = self.request.query_params.getlist('orderBy', '')
        values = self.request.query_params.getlist('values', '')
        exclude = self.request.query_params.get('exclude', '')
        limit = self.request.query_params.get('limit', '0')
        search = self.request.query_params.get('filter', '')
        filt = self.request.query_params.get('search', '')
        qr = self.request.query_params.get('query', '')
        paginate = self.request.query_params.get('paginate', "")



        if qr is not '':
            filt = qr
        if len(values) <= 0:
            values = default_fields
        if len(orderBy) <= 0:
            orderBy = default_ordered

        if search is not'':
            queryset = self.queryset.annotate(
                **self.qu(self)).filter(**json.loads(search)).order_by(*orderBy).distinct()

        if filt is not '':
            queryset = queryset.annotate(**self.qu(self)).filter(reduce(
                OR, [Q(x) for x in ast.literal_eval(filt).items()])).order_by(*orderBy).distinct()

        if filt is '' and search is '':
            queryset = self.queryset.annotate(
                **self.qu(self)).order_by(*orderBy).distinct()
#
        if exclude is not '':
            queryset = queryset.exclude(
                **json.loads(exclude)).order_by(*orderBy).distinct()

        if int(limit) > 0:
            queryset = queryset[:int(limit)]

        if paginate == "true":
            query_page = self.paginate_queryset(
                queryset)  # mandar a pagination
            if serialized is not None:
                serializer = serialized(
                    query_page, fields=tuple(values), many=True)
                if static == True:
                    return serializer.data
                else:
                    return self.get_paginated_response(serializer.data)
            else:
                if static == True:
                    return self.paginate_queryset(queryset.values(*values))
                else:
                    x = self.paginate_queryset(queryset.values(*values))
                    return self.get_paginated_response(x)

        else:
            if serialized is not None:
                serializer = serialized(
                    queryset, fields=tuple(values), many=True)
                if static == True:
                    return serializer.data
                else:
                    return Response(serializer.data)

            else:
                if static == True:
                    return queryset.values(*values)
                else:
                    return Response(queryset.values(*values))

    def get_data(self, default_fields, default_ordered):
        orderBy = self.request.query_params.getlist('orderBy', '')
        values = self.request.query_params.getlist('values', '')
        exclude = self.request.query_params.get('exclude', '')
        limit = self.request.query_params.get('limit', '0')
        search = self.request.query_params.get('filter', '')
        filt = self.request.query_params.get('search', '')
        qr = self.request.query_params.get('query', '')
        if qr is not '':
            filt = qr
        if len(values) <= 0:
            values = default_fields
        if len(orderBy) <= 0:
            orderBy = default_ordered
        if filt is '' and search is not'':
            queryset = self.queryset.filter(
                **json.loads(search)).order_by(*orderBy).distinct()
        if filt is not '' and search is '':
            queryset = self.queryset.filter(reduce(
                OR, [Q(x) for x in ast.literal_eval(filt).items()])).order_by(*orderBy).distinct()
        if filt is '' and search is '':
            queryset = self.queryset.order_by(*orderBy).distinct()

        if exclude is not '':
            queryset = queryset.exclude(**json.loads(exclude))

        if int(limit) > 0:
            queryset = queryset[:int(limit)]
        return self.get_serializer(queryset, fields=tuple(values), many=True).data

    def change_state(self, label):
        if 'bulk_id' in self.request.data and 'bulk_state' in self.request.data:
            kwargs = {'{0}'.format(label): self.request.data['bulk_state']}
            promise = self.queryset.filter(id__in=self.request.data[
                                           'bulk_id']).update(**kwargs)
            if promise == 1:
                raise APIException(
                    str(promise) + ' registro cambió de estado.')
            else:
                raise APIException(
                    str(promise) + ' registros cambiaron de estado.')

    def qu(self, *args, **kwargs):
        cr = self.request.query_params.get('concat', '{}')
        a = self.request.query_params.get('alias', '{}')

        class kj(dict):

            def __init__(self):
                self = dict()

            def add(self, key, value):
                self[key] = value
        jk = kj()
        for x, y in json.loads(cr).items():
            if len(y) > 1:
                k = []
                for i in y:
                    if 'V(' in i:
                        k.append(V(i[3:len(i) - 2]))
                    else:
                        k.append(i)
                o = Concat(*k)
                jk.add(x, o)
            else:
                pass
        for x, y in json.loads(a).items():
            if x:
                o = F(y)
                jk.add(x, o)
            else:
                pass
        return jk
