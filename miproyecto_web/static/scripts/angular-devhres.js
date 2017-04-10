/**
 * Util functions for AngularJS
 * @version v0.0.1 (15.02.2016)
 * asullom (c) 2016 Devhres Team
 * License: MIT
 */

var ngDevhres = angular.module("ngDevhres", []);


ngDevhres

    .directive('uiNav', ['$timeout', function($timeout) {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {
            el.find('a').bind('click', function(e) {
                var li = angular.element(this).parent();
                var active = li.parent()[0].querySelectorAll('.active');
                li.toggleClass('active');
                angular.element(active).removeClass('active');
                //angular.element(active).removeClass('toggled');
            });
        }
    };
}])
    ngDevhres.directive('mdBlur', function($timeout) {
    var directive = {
      restrict: 'A',
      link: function(scope, el, attributes){
        $timeout(function(){
          angular.element(el[0].querySelector("input.md-input")).bind("blur", function(){
            $timeout(function() {
               scope.$eval(attributes.mdBlur);
            }, 250);
          });
        },0);
      }
    };
    return directive;
  })


// =========================================================================
// SUBMENU TOGGLE
// =========================================================================
.directive('toggleSubmenu', function($timeout) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            /*element.click(function(){
                element.parent().toggleClass('toggled');
                element.parent().find('ul').stop(true, false).slideToggle(200);
            })*/

            element.bind("click", function(e) {

                element.parent().toggleClass('toggled');
                //element.parent().find('ul').stop(true, false).slideToggle(200);
                //var ul = element.find('ul');

                var li = angular.element(this).parent();
                //var active = li.parent()[0].querySelectorAll('.active');
                li.toggleClass('active');
                //angular.element(active).removeClass('active');
                // angular.element(this).children().toggleClass("md-toggle-icon toggled");
            });
            /*
            element.find('a').bind('click', function(e) {
                console.log("click");
              element.parent().toggleClass('toggled');
                element.parent().find('ul').stop(true, false).slideToggle(200);
            });
            */
        }
    };
});

 

ngDevhres.service("utils", function() {
                

            return {

                getattr: function(x, y, z){
                    var estado = true; 
                    var result = '';
                    if(!angular.isUndefined(x)){
                        if(angular.isObject(x)){
                            if(!angular.isUndefined(x[y])){
                                result = x[y]
                            }else{
                                result =''; 
                            }
                        }else{
                                result = z || ''; 
                        }
                    }
                    return result;
                },
                replace: function(text, pattern, replace){
                    return text.toString().replace(pattern, replace);
                },
                getFileName: function(url){
                    var name = 'non.json';
                    if(url){
                        var nameArray = url.split('/');
                        name = nameArray[nameArray.length - 1];
                    }
                    return name;
                },
                setDate: function(date){
                    if(date){                   
                        return new Date(date);
                    }
                    return '';
                },
                coalesce: function(x, y, z, w, a, b){
                    return (x || y || z || w || a || b || '');
                },
                getWord: function(x, index){
                    if(x){
                       return x.replace('_',' ').split(" ")[index];
                    }
                },

                trim: function(cadena){
                    var expresionRegular = /^\s+|\s+$/g;
                    return cadena.replace(expresionRegular,"");
                },

                isNumber: function(cadena){
                    var patron = /^\d*$/;
                    if(!cadena.search(patron))
                      return true;
                    else
                      return false;
                },

                exists: function(cadena){
                    if(cadena) return true;
                     return false;
                },

                isOnlyText: function(cadena){
                  var patron = /^[a-zA-Z]*$/;
                  // En caso de querer validar cadenas con espacios usar: /^[a-zA-Z\s]*$/
                  if(!cadena.search(patron))
                    return true;
                  else
                    return false;
                },

                isMail: function(correoElectronico){
                    var patron = /^([a-z]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/;
                    if(!correoElectronico.search(patron))
                      return true;
                    else
                      return false;
                },

                toObject: function(data){
                    return angular.fromJson(angular.toJson(data));
                },
				
				arraysEqual: function(a,b){
					if(a.length!=b.length){
						return false;
					}else{
						var n=0
						for(x=0;x<a.length;x++) 
						{
							if (a[x] == b[x])
							{ 
								n++;
							} 
						}
						if(x==n){
							return true;
						}else
						{
							return false;
						}
					}
				}
                 
            };
});

ngDevhres.service("msg", function(toastr, $translate, $filter) {
    var translate = $filter('translate');    
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
                close :function(msg){
                    toastr.info(msg||translate('mensaje_toast.close.mensaje'),    'Cerrado!!');
                },
                info :function(msg, title){
                    toastr.info(msg||translate('mensaje_toast.info.mensaje'),    'Mensaje');
                }, 
                error :function(msg, title){
                    toastr.error(msg||"El mensaje no pudo ser enviado, buelva a intentarlo",    title||'Error al enciar mensaje');
                }, 
                success :function(msg, title){
                    toastr.success(msg||'Correo enviado satisfactoriamente', title||'Correo enviado satisfactoriamente');
                }, 
                /* cuerpo del mensaje de confirmación */
                bodyConfirmUpdate :function(msg){
                   return (msg||translate('mensaje_toast.bodyConfirmUpdate.mensaje'));
                },
                bodyConfirmDelete :function(msg){
                    return (msg||translate('mensaje_toast.bodyConfirmDelete.mensaje'));
                },
                bodyConfirmCancel :function(msg){
                    return (msg||translate('mensaje_toast.bodyConfirmCancel.mensaje'));
                },
                /* Título genérico del mensaje de confirmación */
                titleConfirm :function(msg){
                    return (msg||translate('mensaje_toast.titleConfirm.mensaje'));
                },
                advertencia :function(msg){
                    toastr.error(msg||translate('mensaje_toast.advertencia.mensaje'));
                },               
            };
});
