ngDevhres.directive('coreVisible', function () {
    return {
      restrict: 'EA',
      scope: { 
        showCol: '=mdElements',
        title: '@mdTitle',
        name: '@mdName',
        styleBut: '@mdStyle'
      },
      controllerAs: 'self',
      template: [
        '<md-menu md-position-mode="target-right target">',
			  '<md-button class="{{styleBut}}" ng-click="$mdOpenMenu()">{{name}}<ng-md-icon icon="keyboard_arrow_down"  aria-label="{{name}}"></ng-md-icon></md-button>',
			   '<md-menu-content style="padding: 10px; min-height: 100px;"  width="4">',
                 'Columnas',
			     '<md-menu-divider></md-menu-divider>',
			     '<md-checkbox  md-prevent-menu-close  class="md-primary" ng-model="x.state" ng-repeat="x in showCol" ng-init="x.state=x.state" aria-label="x.view"> {{x.view|translate}} </md-checkbox>' ,
			   '</md-menu-content>',
	     '</md-menu>'
      ].join('')
    };

});