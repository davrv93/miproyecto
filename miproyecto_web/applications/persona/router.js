app

//==================================
// config routers
//==================================
    .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider


    .state("app.persona.persona_natural", {
        url: "/persona_natural",
        data: { section: '', page: 'Persona natural' },
        templateUrl: "applications/persona/views/persona/index.html"
    })

 
});
