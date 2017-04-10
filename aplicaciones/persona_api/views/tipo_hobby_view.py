from django.db.models.deletion import ProtectedError
from rest_framework import serializers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import list_route
from rest_framework.exceptions import ParseError
from aplicaciones.persona.models.tipo_hobby import TipoHobby


class TipoHobbySerializer(serializers.ModelSerializer):

    class Meta:
        model = TipoHobby


class TipoHobbyViewSet(viewsets.ModelViewSet):
    queryset = TipoHobby.objects.all()
    serializer_class = TipoHobbySerializer

    def update(self, request, pk=None):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)

        except TipoHobby.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def perform_destroy(self, instance):
       return instance.delete()

    @list_route(url_path='destroy', methods=['post'])
    def destroy_multiple(self, request):
        results = self.get_queryset().filter(id__in=request.data['bulk_id'])
        promise_list = []
        for i in results:
            promise = self.perform_destroy(i)
            if promise is not None:
                promise_list.append(str(promise))
        if len(promise_list) == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ParseError(', '.join(list(promise_list)))