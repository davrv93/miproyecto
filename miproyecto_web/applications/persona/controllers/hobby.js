app.controller("HobbyCtrl", function($scope, $mdDialog, msg, API_PERSONA, $rootScope) {

    $scope.items = {};
    $scope.dataHobby = [];
    $scope.selectedItems = [];
    
    $scope.qryPag = { 
        page_size: 5,
        page:1
    };

    $scope.params = {
        queryFilter: '',
        query:'',
        orderBy: [],
    };

    $scope.onList = function(query){
        $rootScope.Indeterminado = true;
        if(query!=null)
        {
            $scope.params['queryFilter']=query['queryFilter']
        }

        API_PERSONA.Hobby.list($scope.params || $scope.qryPag).$promise.then(function (r) {       
                console.log(r);
                $scope.dataHobby = r;
                $rootScope.Indeterminado = false;
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
                //console.log('Error:'+ err);
            }
        );
    };

    $scope.onList();

    $scope.onPaginate = function(page_size,page) {
       $scope.onList(angular.extend({},$scope.params, {page_size:page_size, page: page}));
    };

    $scope.onSearch = function(x, y) {
        $scope.params.queryFilter= x;
        $scope.params.query= y;   
        $scope.onList(angular.extend({}, $scope.qryPag,  $scope.params));

    };

    $scope.showColumn = [
        { index: 0, state: true, view: 'Checkbox', type: ''},
        { index: 1, state: true, view: 'N°',        type: 'contador'},
        { index: 2, state: true, view: 'Nombre',   type: 'nombre'},
        { index: 3, state: true, view: 'Tipo de hobby',   type: 'tipo_hobby'},
        { index: 4, state: true,  view: 'Opciones', type: 'opciones'}

    ];

    $scope.onReorder = function(x) {
      $scope.params.orderBy= x;  
      $scope.onList(angular.extend({}, $scope.qryPag, $scope.params));

    };

    $scope.queryFilters = [
        {
            'name': '',
            'view': 'Nombre',
            'type': 'nombre'
        },
        {
            'name': '',
            'view': 'Tipo de hobby',
            'type': 'tipo_hobby__nombre'
        },
    ];


    $scope.new_edit = function(event, obj){
        $rootScope.Indeterminado = true;
        $scope.selectedItems = [];

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

    $scope.refresh = function (){
        $scope.onList(angular.extend({}, $scope.qryPag, $scope.params));
    };
    
    $scope.confirmDelete = function(event, obj) {
        var confirm = $mdDialog.confirm()
            .title(msg.titleConfirm())
            .textContent(msg.bodyConfirmDelete())
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

    $scope.confirmActive = function(event, estado) {
       var confirm = $mdDialog.confirm()
           .title(msg.titleConfirm())
           .textContent(msg.bodyConfirmUpdate())
           .ariaLabel('Activar o desactivar Estado civil')
           .targetEvent(event)
           .ok('SI')
           .cancel('NO');
       $mdDialog.show(confirm).then(function() {
            $scope.changeState(estado);                
            $mdDialog.hide();

       }, function() {
           msg.cancel();
       });
   };

    $scope.changeState = function (state) {
        var data = {
            bulk_id : $scope.selectedItems,
            bulk_state : state
        }
        API_PERSONA.Hobby.update({ id: 0 } , data).$promise.then(function(success) {
            $scope.refresh();
        },function(error) {
            msg.yesUpdate(error.data.detail);
            $scope.refresh();
        });
    };

    $scope.destroyMany = function (obj) {
        if (obj) {
            $scope.selectedItems = [obj.id]
        }
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

    $scope.save = function() {
        $scope.errores = [];
        if ($scope.items.id) {
            API_PERSONA.Hobby.update({ id: $scope.items.id }, $scope.items).$promise.then(function(r){
                msg.yesUpdate();
                $mdDialog.hide(r);
            }, function(err) {
                msg.noUpdate();
                $scope.errores = err.data;
            });
        } else {
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