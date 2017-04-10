
app.factory("API_PERSONA", function($resource, config_persona){
    var url = config_persona.configUrl;
    return {
       
        PersonaNatural: $resource(url + 'persona_natural/:id/:microrecurso/', { 'id': '@id', 'microrecurso': '@microrecurso' },
            {   
                    'list': { method: 'GET', isArray: true},
                    "save": { method: 'POST' },
                    "update": { method: 'PUT' },
                    'get': { method: 'GET', isArray:true},
                    'post': { method: 'GET'},
					'destroy': { method: 'POST'}
        }) ,
        Hobby: $resource(url + 'hobby/:id/:microrecurso/', { 'id': '@id', 'microrecurso': '@microrecurso' },
            {   
                    'list': { method: 'GET', isArray: true},
                    "save": { method: 'POST' },
                    "update": { method: 'PUT' },
                    'get': { method: 'GET', isArray:false},
                    'post': { method: 'GET'},
                    'destroy': { method: 'POST'}
        })  
        
    };
});
