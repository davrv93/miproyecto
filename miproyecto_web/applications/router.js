app.run(['$rootScope', '$state', function($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params)

    }


});
}]);

app
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/apps");


    $stateProvider    
    .state("apps", {
        url: "/apps",
        data: { page: 'Apps page' },
        views: {
            '': {
                //templateUrl: "applications/persona/views/persona/index.html"
                templateUrl: "applications/persona/views/hobby/index.html"
            },
        }
    })
});