app.controller("HobbyCtrl", function($scope, $mdDialog, msg, API_PERSONA, $rootScope) {


    //Variable donde se guardarán los valoes de cada una de las columnas del modelo a la hora de realizar una inserción
    $scope.items = {};
    //Variable donde se guardarán los valoes de cada una de las columnas del modelo a la hora de realizar un get.
    $scope.dataHobby = [];
    //Array que contiene los ids para la eliminación múltiple
    $scope.selectedItems = [];
    
    //Array que almacena parametros para filtrar u ordenar la data, en este caso, al ser el reporte inicial va vacío
    $scope.params = {
        queryFilter: '',
        query:'',
        orderBy: [],
    };

    $scope.onList = function(query){
        //variable para animación de cargando
        $rootScope.Indeterminado = true;

        //Invocación al servicio configurado en el archivo api.js de services de Persona
        //Realiza la petición list para mostrar el array retornante en la vista
        API_PERSONA.Hobby.list($scope.params).$promise.then(function (r) {       
                //Asignación de la data según el retorno de la consulta
                $scope.dataHobby = r;
                //variable para animación de cargando, se detiene la animación
                $rootScope.Indeterminado = false;

                //Funciones para el eliminado múltiple
                $scope.toggle = function (lista, lst)
                    {
                        var idx = lst.indexOf(lista.id);
                        if (idx > -1) lst.splice(idx, 1);
                            else lst.push(lista.id);
                    };

                    $scope.exists = function (lista, lst)
                    {
                        $scope.ver=true;
                        return lst.indexOf(lista.id) > -1;
                    };
                    $scope.isIndeterminate = function()
                    {
                        return ($scope.selectedItems.length !== 0 && $scope.selectedItems.length !== $scope.dataHobby.length);
                    };
                    $scope.isChecked = function()
                    {
                        return $scope.selectedItems.length === $scope.dataHobby.length;
                    };
                    
                    $scope.toggleAll = function()
                    {
                        if ($scope.selectedItems.length === $scope.dataHobby.length)
                        {
                            $scope.selectedItems = [];
                            
                        } else if ($scope.selectedItems.length === 0 || $scope.selectedItems.length > 0)
                        {
                            $scope.items = [];
                            angular.forEach($scope.dataHobby.length, function(value, key) {
                             $scope.items.push(value.id)
                            }, console.log);
                            $scope.selectedItems = $scope.items.slice(0);
                        }

                    };

            }, function(err){
            }
        );
    };

    //Invocación al listado inicial
    $scope.onList();

    //Array que sirve para ocultar o mostrar las columnas en la vista, notese que el type debe ser igual al nombre
    // de la columna, y el index es igual al asignado al td md-cell en el index.html en el atributo ng-show
    $scope.showColumn = [
        { index: 0, state: true, view: 'Checkbox', type: ''},
        { index: 1, state: true, view: 'N°',        type: 'contador'},
        { index: 2, state: true, view: 'Nombre',   type: 'nombre'},
        { index: 3, state: true, view: 'Tipo de hobby',   type: 'tipo_hobby'},
        { index: 4, state: true,  view: 'Opciones', type: 'opciones'}

    ];

    //Función que permite aperturar un nuevo dialog o modal, es el que abre el formulario para agregar o editar registro
    $scope.new_edit = function(event, obj){
        $rootScope.Indeterminado = true;
        $scope.selectedItems = [];
        //Es importante asignar el controller que utilizará y el archivo html
        $mdDialog.show({

              controller: "formHobby",
              templateUrl: 'applications/persona/views/hobby/form.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose:false,
              locals: { obj: obj}
            }).then(function(result) {
                  $scope.refresh();
                }, function() {
             });
   };

   //Función que invoca a la lista, el refresh se realiza generalmente luego de una inserción, actualización o eliminación
    $scope.refresh = function (){
        $scope.onList(angular.extend({}, $scope.qryPag, $scope.params));
    };
    
    //Función que abre un cuadro de diálogo para eliminar
    $scope.confirmDelete = function(event, obj) {
        var confirm = $mdDialog.confirm()
            .title('Eliminación')
            .textContent('¿Está seguro que desea eliminar el registro?')
            .ariaLabel('Lucky day')
            .targetEvent(event)
            .ok('SI')
            .cancel('NO');
        $mdDialog.show(confirm).then(function() {

            $scope.destroyMany(obj);               
            $mdDialog.hide();

        }, function() {
            msg.cancel();
        });
    };

  //Función que elimina
    $scope.destroyMany = function (obj) {
        if (obj) {
            $scope.selectedItems = [obj.id]
        }
        //Se invoca al microrecurso del ViewSet de Hobby con url_path='destroy'
        API_PERSONA.Hobby.destroy({ microrecurso: 'destroy',bulk_id : $scope.selectedItems}).$promise.then(function(success) {
           $scope.refresh();
            msg.yesDelete();
            $scope.selectedItems = [];
        },function(error) {
            $scope.refresh();          
            $scope.selectedItems = [];
            msg.noDelete('No se puede eliminar a: '+error.data.detail+', porque esta siendo utilizado.');
        });
    };

});

app.controller("formHobby", function($scope, obj, API_PERSONA, $mdDialog, msg, $rootScope, $timeout) {
    //Es el controlador que se declaró en la función $scope.new_edit

    $scope.items = {};
    $scope.showErr = true;
    $scope.items.estado = '1';
    $rootScope.Indeterminado = false;

    if(obj){
        var id =obj;
        $scope.showErr = false;
        if(angular.isObject(obj)) id = obj['id']
        API_PERSONA.Hobby.get({ id: id }).$promise.then(function(success) {
            $scope.items = success;
            $scope.showErr = true;
        });
    };

    $scope.hide = function() {
        msg.cancel();
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        msg.cancel();
        $mdDialog.cancel();
    };

    $scope.limpiar = function(){
        angular.forEach($scope.items, function(val, key) {
            if ((key!="estado")) {
                $timeout(function(){
                    $scope.myform.$setPristine();
                    $scope.myform.$setUntouched();
                    $scope.items[key] = null;
                    var item = document.forms['myform'][key];
                    if (item != undefined) { item.value = ""; }
                });
            };

            if (key=="estado"){
                $scope.items.estado = '1';   
            };
        });        
    };

    
    $scope.errores = [];
    //Función que permite guardar el registro
    $scope.save = function() {
        $scope.errores = [];
        //Si al formulario llegó un ID desde el reporte, es decir si se hiso clic en el botón editar
        if ($scope.items.id) {
            //Entonces ejecutar el servicio Hobby y el método PUT (update) asignando el id a actualizar
            // y el $scope.items que equivale a los valores de las columnas
            API_PERSONA.Hobby.update({ id: $scope.items.id }, $scope.items).$promise.then(function(r){
                msg.yesUpdate();
                $mdDialog.hide(r);
            }, function(err) {
                msg.noUpdate();
                $scope.errores = err.data;
            });
        } else {
            //Entonces ejecutar el servicio Hobby y el método POST (save) asignando $scope.items que equivale a los valores de las columnas
            //del registro a insertar
            API_PERSONA.Hobby.save($scope.items).$promise.then(function(r) {
               msg.yesInsert();
               $mdDialog.hide(r);
            }, function(err) {
                msg.noInsert();
                $scope.errores = err.data;
            });
        }
    };

});