app
    .config(["$translateProvider",function($translateProvider){     
         $translateProvider.translations("es",{
            "mensaje_toast":
            {
            "yesDelete":{
                        "titulo":"Eliminación exitosa!!",
                        "mensaje":"Acción ejecutada correctamente."
                        },
            "yesUpdate":{
                        "titulo":"Actualización exitosa!!",
                        "mensaje":"Acción ejecutada correctamente."
                        },
            "yesInsert":{
                        "titulo":"Se registró correctamente!!",
                        "mensaje":"Acción ejecutada correctamente."
                        },
            "yesList":{
                        "titulo":"Listado con exito!!",
                        "mensaje":"Acción ejecutada correctamente."
                        },
            "noDelete":{
                        "titulo":"Importante!!",
                        "mensaje":"La acción eliminar no fue ejecutada."
                        },
            "noUpdate":{
                        "titulo":"Importante!!",
                        "mensaje":"La acción actualizar no fue ejecutada."
                        },
            "noInsert":{
                        "titulo":"Importante!!",
                        "mensaje":"La acción agregar no fue ejecutada."
                        },
            "noList":{
                        "titulo":"Importante!!",
                        "mensaje":"La acción listar no fue ejecutada."
                        },
            "noRecovery":{
                        "titulo":"Importante!!",
                        "mensaje":"Se produjo un errror al intentar recuperar la informacion para editar, es posible que no exista este registro."
                        },
            "cancel":{
                        "titulo":"Cancelado!!",
                        "mensaje":"Se ha cancelado la operación."
                        },
            "close":{
                        "titulo":"Cerrado!!",
                        "mensaje":"Operacion revertida."
                        },
            "info":{
                        "titulo":"",
                        "mensaje":""
                        },
            "bodyConfirmUpdate":{
                        "mensaje":"¿Está seguro de actualizar la información?"
                        },
            "bodyConfirmDelete":{
                        "mensaje":"¿Está seguro de eliminar?"
                        },
            "bodyConfirmCancel":{
                        "mensaje":"¿Desea cancelar la acción?"
                        },
            "titleConfirm":{
                        "mensaje":"Confirmación"
                        },
            "advertencia":{
                        "mensaje":"Error."
                        }


            }
        }),
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useSanitizeValueStrategy('escape');
        
    }]);