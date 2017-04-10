ngDevhres.directive('coreDragdrop', function($filter)
{
	var $translate = $filter('translate');
    return{
        restrict: 'E',
        template: '<div class="row">'+
                    '<script type="text/ng-template" id="drop_and_drop">'+
                    '<div ui-tree-handle>'+
                      '<div class="md-drag-grop-quiroz">'+
                        '<a class="md-raised" ng-if="node.nodes && node.nodes.length > 0" nodrag ng-click="toggle(this)">'+
                          '<ng-md-icon icon="arrow_drop_down" aria-label="title" data-nodrag></ng-md-icon></a>'+
                            '<ng-md-icon ng-show="node.icon" icon="{{node.icon}}" size="22"></ng-md-icon> {{node.title}} '+
                            '<ng-md-icon icon="close" ng-hide="node.state" size="10" style="color:red;">'+
                            '<md-tooltip md-autohide>Inactivo</md-tooltip></ng-md-icon>'+
                             '<span flex></span>'+
                             '<md-menu md-position-mode="target-right target" data-nodrag id="dragdrop-ops1">'+
                                '<md-button class="md-icon-button" ng-click="$mdOpenMenu($event)" aria-label="edit">'+
                                    '<ng-md-icon icon="more_vert"></ng-md-icon>'+
                                '</md-button>'+
                                '<md-menu-content width="2">'+
                                    '<md-menu-item>'+
                                        '<md-button ng-click="verInfo({obj: node})" aria-label="edit">'+
                                            '<ng-md-icon icon="visibility"></ng-md-icon>  Información'+
                                        '</md-button>'+
                                    '</md-menu-item>'+
                                    '<md-menu-item>'+
                                        '<md-button ng-click="editar({obj: node})" aria-label="edit">'+
                                          '<ng-md-icon icon="edit"></ng-md-icon> Editar'+
                                        '</md-button>'+
                                    '</md-menu-item>'+
                                    '<md-menu-item>'+
                                        '<md-button ng-click="eliminar({obj: node})" aria-label="edit">'+
                                          '<ng-md-icon icon="delete"></ng-md-icon> Eliminar'+
                                        '</md-button>'+
                                    '</md-menu-item>'+
                                '</md-menu-content>'+
                            '</md-menu>'+
                             '<md-button class="md-icon-button" ng-click="verInfo({obj: node})" data-nodrag id="dragdrop-ops2" aria-label="edit">'+
                                '<ng-md-icon icon="visibility" size="22"></ng-md-icon>'+
                                '<md-tooltip md-autohide>'+$translate('btn.ver')+'</md-tooltip>'+
                             '</md-button>'+
                             '<md-button class="md-icon-button" ng-click="editar({obj: node})" data-nodrag id="dragdrop-ops2" aria-label="edit">'+
                                '<ng-md-icon icon="edit" size="22"></ng-md-icon>'+
                                '<md-tooltip md-autohide>'+$translate('btn.ediat')+'</md-tooltip>'+
                             '</md-button>'+
                             '<md-button class="md-icon-button" ng-click="eliminar({obj: node})" data-nodrag id="dragdrop-ops2" aria-label="edit">'+
                               '<ng-md-icon icon="close" size="22"></ng-md-icon>'+
                               '<md-tooltip md-autohide>'+$translate('btn.eliminar')+'</md-tooltip>'+
                             '</md-button>'+
                             '</div>'+
                    '</div>'+
                  '<ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">'+
                    '<li ng-repeat="node in node.nodes" ui-tree-node ng-include="\'drop_and_drop\'">'+
                    '</li>'+
                  '</ol>'+
                '</script>'+
                '<div ui-tree id="tree-root">'+
                  '<ol ui-tree-nodes ng-model="data">'+
                    '<li ng-repeat="node in data" ui-tree-node ng-include="\'drop_and_drop\'"></li>'+
                  '</ol>'+
                '</div>'+
                '<br>',

        scope: {
            data: "=",
            editar:'&',
            eliminar: '&',
            verInfo: '&',
            },
           link: function(scope){
             /* $scope.remove = function(scope) {
                scope.remove();
              };

              $scope.toggle = function(scope) {
                scope.toggle();
              };

                $scope.moveLastToTheBeginning = function () {
                  var a = scope.data.pop();
                  scope.data.splice(0,0, a);
                };

                $scope.newSubItem = function(scope) {
                  var nodeData = scope.$modelValue;
                  nodeData.nodes.push({
                    id: nodeData.id * 10 + nodeData.nodes.length,
                    title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                    nodes: []
                  });
                };

                $scope.collapseAll = function() {
                  scope.$broadcast('collapseAll');
                };

                $scope.expandAll = function() {
                  scope.$broadcast('expandAll');
                };*/
           }
        }
});

ngDevhres.directive('coreDragdropView', function()
{
    return{
        restrict: 'E',
        template: '<div class="row" data-nodrag>'+
                    '<script type="text/ng-template" id="drop_and_drop_view">'+
                    '<div class="tree-sview">'+
                      '<div class="md-drag-grop-quiroz" data-nodrag>'+
                        '<a class="md-raised" ng-if="node.nodes && node.nodes.length > 0" nodrag ng-click="toggle(this)">'+
                          '<ng-md-icon icon="arrow_drop_down" aria-label="title" data-nodrag></ng-md-icon></a>'+
                            '{{node.title}} '+
                            '<ng-md-icon icon="close" ng-hide="node.state" size="10" style="color:red;">'+
                            '<md-tooltip md-autohide>Inactivo</md-tooltip></ng-md-icon>'+
                             '</div>'+
                    '</div>'+
                  '<ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}" data-nodrag>'+
                    '<li ng-repeat="node in node.nodes" ui-tree-node ng-include="\'drop_and_drop_view\'">'+
                    '</li>'+
                  '</ol>'+
                '</script>'+
                '<div ui-tree id="tree-root" data-nodrag>'+
                  '<ol ui-tree-nodes ng-model="data" data-nodrag>'+
                    '<li ng-repeat="node in data" ui-tree-node ng-include="\'drop_and_drop_view\'"></li>'+
                  '</ol>'+
                '</div>'+
                '<br>',

        scope: {
            data: "="
          },
           link: function(scope){
           }
        }
});