
var formatDateTimeRegex = /(\d{4}[\-]((0[1-9]|1[0-2]))[\-]((0[1-9]|1[0-9]|2[0-9]|3[0-1]))(([t-tT-T]|\s)((0[0-9]|1[0-9]|2[0-3]))[\:]((0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]))[\:]((0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]))([.][a-zA-Z0-9]*)?)?)$/


app.value('formatDateTime', formatDateTimeRegex);

app.run(function ($rootScope, $state, $stateParams, $window, localStorageService, $translate, utils, $http) {
        $translate.use('ES');

});
app.config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});


app.config(['$mdIconProvider', function ($mdIconProvider) {
        $mdIconProvider.defaultIconSet('static/styles/core-icons.svg', 24);
    }]);



app.config(function ($httpProvider) {
    
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        });


app.config(function ($httpProvider) {
  $httpProvider.useApplyAsync(true);
});

app.config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light', // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.definePalette('erp-color', {
        '50': 'e8d0dd',
        '100': 'ddb9cc',
        '200': 'd2a1bb',
        '300': 'c78aaa',
        '400': 'bb7399',
        '500': 'b05b88',
        '600': 'a54477',
        '700': '9a2d66',
        '800': '8f1656', // cambia el toolbar main
        '900': '80134d', // La parte superior del menú
        'A100': 'F1B3EC',
        'A200': 'E572DD',
        'A400': '9D1D93',
        'A700': '4F0F4A',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': undefined
    });
    
    $mdThemingProvider.definePalette('theme-cu', {
        '50': 'C5DBEB',
        '100': 'B3D0E5',
        '200': '9FC5DF',
        '300': '8CB9D8',
        '400': '79ADD1',
        '500': '3F86BA',
        '600': '5396C5',
        '700': '408ABE',
        '800': '3F86BA', // cambia el toolbar main
        '900': '3A7CAA', // La parte superior del menú
        'A100': '346F98',
        'A200': '2D6185',
        'A400': '265372',
        'A700': '20445E',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': undefined
    });

    $mdThemingProvider.theme('default').primaryPalette('erp-color', {'default': '900'});

    $mdThemingProvider.theme('docs-dark').primaryPalette('blue').dark();
});

app.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('Indigo')
            .primaryPalette('indigo');

    $mdThemingProvider.theme('Green')
            .primaryPalette('green');

    $mdThemingProvider.theme('altTheme')
            .primaryPalette('purple');

    $mdThemingProvider.theme('Red')
            .primaryPalette('red');

    $mdThemingProvider.theme('DeepPurple')
            .primaryPalette('deep-purple');

    $mdThemingProvider.theme('Indigo')
            .primaryPalette('indigo');

    $mdThemingProvider.theme('altTheme')
            .primaryPalette('purple');

    $mdThemingProvider.theme('Blue')
            .primaryPalette('blue');

    $mdThemingProvider.theme('LightBlue')
            .primaryPalette('light-blue');

    $mdThemingProvider.theme('Cyan')
            .primaryPalette('cyan');

    $mdThemingProvider.theme('Teal')
            .primaryPalette('teal');

    $mdThemingProvider.theme('LightGreen')
            .primaryPalette('light-green');

    $mdThemingProvider.theme('Lime')
            .primaryPalette('lime');

    $mdThemingProvider.theme('Yellow')
            .primaryPalette('yellow');

    $mdThemingProvider.theme('Amber')
            .primaryPalette('amber');

    $mdThemingProvider.theme('Orange')
            .primaryPalette('orange');

    $mdThemingProvider.theme('DeepOrange')
            .primaryPalette('deep-orange');

    $mdThemingProvider.theme('Brown')
            .primaryPalette('brown');

    $mdThemingProvider.theme('Grey')
            .primaryPalette('grey');

    $mdThemingProvider.theme('BlueGrey')
            .primaryPalette('blue-grey');
    
    $mdThemingProvider.theme('themeCU')
            .primaryPalette('theme-cu');

    $mdThemingProvider.setDefaultTheme('default');
    $mdThemingProvider.alwaysWatchTheme(true);

});

