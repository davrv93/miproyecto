/**
 * Util functions for AngularJS
 * @version v0.0.1 (15.02.2016)
 * asullom (c) 2016 Devhres Team
 * License: MIT
 */

var utilitys = angular.module("utilitys", []);

utilitys.service("msg", function(toastr,  $filter) {
            return {
                yesDelete :function(msg){
                    toastr.success('Acción ejecutada correctamente.',    'Eliminación exitosa!!');
                },
                yesUpdate :function(msg){
                    toastr.success('Acción ejecutada correctamente.',    'Actualización exitosa!!');
                },
                yesInsert :function(msg){
                    toastr.success('Acción ejecutada correctamente.',   'Se registró correctamente!!');
                },
                yesList :function(msg){
                    toastr.success('Acción ejecutada correctamente.',  'Listado con exito!!');
                },
                noDelete :function(msg){
                    toastr.error('La acción eliminar no fue ejecutada.',    'Importante!!');
                }, 
                noUpdate :function(msg){
                    toastr.error('La acción actualizar no fue ejecutada.',    'Importante!!');
                },
                noInsert :function(msg){       
                    toastr.error('La acción agregar no fue ejecutada.',    'Importante!!');
                },
                noList :function(msg){
                    toastr.error('La acción listar no fue ejecutada.',    'Importante!!');
                },
                noRecovery :function(msg){
                    toastr.error('Se produjo un errror al intentar recuperar la informacion para editar, es posible que no exista este registro.',    'Importante!!');
                }, 
                cancel :function(msg){
                    toastr.info('Se ha cancelado la operación.',   'Cancelado!!');
                },               
            };
});
