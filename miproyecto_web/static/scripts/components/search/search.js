
ngDevhres.directive('coreSearch', function() {
 
    function compile(elem) {
        elem.addClass('md-search');
    }
 
    function Controller($scope, $attrs) {
      $scope.dataFilter = "";
      var self = this;
      self.readonly = true;
      self.selectedItem = null;
      self.searchText = null;
      self.querySearch = querySearch;
      self.parametros = loadFilters();
      self.selectedParameters = [];
      self.autocompleteDemoRequireMatch = true;
      self.transformChip = transformChip;
      self.filters = loadGroup();
      self.query = "";

      function transformChip(chip) {
        if (angular.isObject(chip)) {
          return chip;
        }
        return { name: chip, type: 'nombres' } 
      };
   

      function querySearch (query) {
        var items = [];
        var results = query ? self.parametros.filter(createFilterFor(query)) : [];
          angular.forEach(results, function(value, key) {
            items.push({type: value.type, name: query, view: value.view, lookup: value.lookup});
      });
        return items;
      };


      function createFilterFor(query) {
        return function filterFn(parametable) {
          return parametable;
        };
      };


     function loadQuery(){
        var data = [];
        angular.forEach(self.selectedParameters, function(value, key) {
          var j = '__icontains'
          if(value['lookup']&& value['lookup']!='') j = '__'+value['lookup'];
           data.push('"'+value.type+j+'": "'+value.name+'"');
        });

        return data?'{'+$scope.replace(data)+'}':'';
     };

     function loadFiels(){
        var data = [];
        angular.forEach($scope.dataFilters, function(value, key) {
          var j = '__icontains'
          if(value['lookup']&& value['lookup']!='') j = '__'+value['lookup'];
           data.push("('"+value.type+''+j+"' , '"+self.query+"')");
        });

        return self.query!=''?'['+$scope.replace(data)+']':'';
     };


 
    $scope.replace = function(text){
      return text.toString().replace('""','"');
    }

     $scope.listGroup = function(){
       self.selectedParameters.push({type:self.dataFilter.type,name:self.dataFilter.name,view:''});
       $scope.searchQuery();
     };

     $scope.searchQuery = function(){
      
      if($scope.searchAdvanced){
        self.query="";
        if(angular.isFunction($scope.onSearch)) {
                $scope.onSearch(loadQuery(),'');
        }
      }else{
        if(angular.isFunction($scope.onSearch)) {
                $scope.onSearch('',loadFiels());
        }

      }

     };

    self.reset = function(){
      self.selectedParameters = [];
      self.query="";
      $scope.searchQuery();
       
    }


    function loadGroup(){
      return $scope.dataGroups;
      };
      

      function loadFilters() {
         return $scope.dataFilters;
      };


    }

  Controller.$inject = ['$scope', '$attrs'];

  return {
      restrict: 'EA',
      scope: {
        dataFilters: '=mdDataFilter',
        dataGroups: '=mdDataGroup',
        nameQuery: '@mdQuery',
        total: '@mdTotal',
        step:'=mdLimitStep',
        page: '=mdPage',
        limit: '=mdLimit', 
        onSearch: '=?mdOnSearch',  
        options: '=mdRowsPage', 
        mdLayoutAlign: '@',
        searchAdvanced:'=mdSearchAdvanced',
        mds: '=mdSwitch',
        mdGroup:'=mdGroup',
        pageSelect: '=mdSelectShow',
      },
      compile: compile,
      controller: Controller,
      controllerAs: 'self',
      template: [

            '<div layout="row" flex-xs="100">',
            '<md-chips flex-gt-xs="95" ng-model="self.selectedParameters" md-autocomplete-snap',
                      'md-transform-chip="self.transformChip($chip)"',
                      'md-enable-chip-edit="true"',
                      'md-require-match="self.autocompleteDemoRequireMatch" md-on-add="searchQuery()" md-on-remove="searchQuery()" ng-if="searchAdvanced!==false" >',
                '<md-autocomplete ',
                  'md-selected-item="self.selectedItem"',
                  'md-search-text="self.searchText"',
                 ' md-items="item in self.querySearch(self.searchText)"',
                  'md-item-text="item.name"',
                  'placeholder="Buscador avanzado">',
                '<span md-highlight-text="self.searchText"  flex> {{item.view|translate}} {{"table_head.para"|translate}}: {{item.name}} </span>',
                '</md-autocomplete>',
              '<md-chip-template>',
                '<span>',
                  '<strong>{{$chip.view|translate}} </strong>',
                  '<em>({{$chip.name}})</em>',
                  '<em style="display:none;">({{$chip.type}})</em>', 
                '</span>',
              '</md-chip-template>',
            '</md-chips>',
            '<md-chips flex-gt-xs="95" ng-model="self.selectedParameters" ng-if="searchAdvanced!==true" md-autocomplete-snap>',
              '<input ng-model="self.query" ng-keyup="searchQuery()" placeholder="Buscador simple">',
            '</md-chips>',            
            '<md-input-container ng-if="mdGroup">',
                    '<label>Agrupar</label>',
                    '<md-select  ng-model="self.dataFilter" data-ng-change="listGroup()" aria-label="Agrupar">',
                        '<md-option ng-value="fb" ng-repeat="fb in self.filters">{{fb.view}}</md-option>',
                    '</md-select>',
            '</md-input-container>',
            '<md-input-container class="md-block" flex-gt-sm>',
            '<md-switch class="md-primary"   aria-label="Switch No Ink" ng-model="searchAdvanced" ng-init="searchAdvanced" ng-click="self.reset()" id="efbtn">',
            '</md-switch>',
            '</md-input-container>',
            '</div>'

      ].join('')
    };

});