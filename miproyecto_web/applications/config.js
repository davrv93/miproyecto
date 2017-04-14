var app = angular.module("app", [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngAria',
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons',
    'LocalStorageModule',
    'toastr',
    'utilitys',
    'ngMessages',
    'ui.tree',
    'angularModalService',
    'angular.filter',

]);


app.config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.config(function ($httpProvider) {

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

app.config(function ($httpProvider) {
  $httpProvider.useApplyAsync(true);
});

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('purple');
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
    
    $mdThemingProvider.setDefaultTheme('default');
    $mdThemingProvider.alwaysWatchTheme(true);

});

