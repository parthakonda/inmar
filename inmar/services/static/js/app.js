// App initialization
var baseApp = angular.module('baseApp', ['services', 'BroadcastBox']);

// Config
baseApp.config(['$interpolateProvider','$httpProvider', '$compileProvider',
    function($interpolateProvider,$httpProvider,$compileProvider) {
        $compileProvider.debugInfoEnabled(false); 
        $httpProvider.useApplyAsync(true);
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose'; 
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';  
        // $httpProvider.interceptors.push('httpInterceptor');           
}]);




////////////////////// Controllers
// Parent Controller
baseApp.controller('baseController',['$scope','$location','$http','$timeout', '$rootScope',
    function($scope, $location, $http, $timeout, $rootScope){


}])
baseApp.factory('Loading', function(){

    return {
        start: function(){
            $('body').addClass('loading');
        },
        stop: function(){
            $('body').removeClass('loading');            
        }
    }
});
baseApp.factory('Notify', function ($rootScope) {
    return {
        'success': function (message) {
            new Noty({
                type: 'success',
                layout: 'topRight',
                theme: 'mint',
                text: message,
                timeout: 3000,
                progressBar: true,
                closeWith: ['click', 'button'],
                animation: {
                    open: 'noty_effects_open',
                    close: 'noty_effects_close'  
                },
                id: false,
                force: false,
                killer: false,
                queue: 'global',
                container: false,
                buttons: [],
                sounds: {
                    sources: [],
                    volume: 1,
                    conditions: []
                },
                titleCount: {
                    conditions: []
                },
                modal: false
            }).show();
            $('.invalid.ng-invalid').removeClass('invalid').removeClass('ng-invalid');
        },
        'error': function (message) {
            console.log("type:" + typeof message);
            if (typeof message == 'object') {
                var req_fields = [];
                for (var key in message.data) {
                    if (typeof message.data === 'object') {
                        if (message.data.hasOwnProperty(key) && key != "at_row") {
                            
                            new Noty({
                                type: 'error',
                                layout: 'topRight',
                                theme: 'mint',
                                text: key.capitalize() + ": " + message.data[key][0].capitalize(),
                                timeout: 3000,
                                progressBar: true,
                                closeWith: ['click', 'button'],
                                animation: {
                                    open: 'noty_effects_open',
                                    close: 'noty_effects_close'
                                },
                                id: false,
                                force: false,
                                killer: false,
                                queue: 'global',
                                container: false,
                                buttons: [],
                                sounds: {
                                    sources: [],
                                    volume: 1,
                                    conditions: []
                                },
                                titleCount: {
                                    conditions: []
                                },
                                modal: false
                            }).show()
                            if (message.data.hasOwnProperty('at_row')){
                                $('#' + key + "_" + message.data['at_row'][0]).addClass('ng-invalid').addClass('invalid');
                            }
                        } 
                    } else {
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            theme: 'mint',
                            text: message.data,
                            timeout: 3000,
                            progressBar: true,
                            closeWith: ['click', 'button'],
                            animation: {
                                open: 'noty_effects_open',
                                close: 'noty_effects_close'
                            },
                            id: false,
                            force: false,
                            killer: false,
                            queue: 'global',
                            container: false,
                            buttons: [],
                            sounds: {
                                sources: [],
                                volume: 1,
                                conditions: []
                            },
                            titleCount: {
                                conditions: []
                            },
                            modal: false
                        }).show()
                        return false;
                    }
                }
                console.log($rootScope);
                $rootScope.server_err_fields = req_fields;
                $rootScope.$broadcast('serveErr');
            }
            else {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    theme: 'mint',
                    text: message,
                    timeout: 3000,
                    progressBar: true,
                    closeWith: ['click', 'button'],
                    animation: {
                        open: 'noty_effects_open',
                        close: 'noty_effects_close'
                    },
                    id: false,
                    force: false,
                    killer: false,
                    queue: 'global',
                    container: false,
                    buttons: [],
                    sounds: {
                        sources: [],
                        volume: 1,
                        conditions: []
                    },
                    titleCount: {
                        conditions: []
                    },
                    modal: false
                }).show()
                return false;
            }
        },
        'warning': function (message) {
            new Noty({
                type: 'warning',
                layout: 'topRight',
                theme: 'mint',
                text: message,
                timeout: 3000,
                progressBar: true,
                closeWith: ['click', 'button'],
                animation: {
                    open: 'noty_effects_open',
                    close: 'noty_effects_close'
                },
                id: false,
                force: false,
                killer: false,
                queue: 'global',
                container: false,
                buttons: [],
                sounds: {
                    sources: [],
                    volume: 1,
                    conditions: []
                },
                titleCount: {
                    conditions: []
                },
                modal: false
            }).show()
        },
        'poly': function (obj) {
            //Fired when showing notifications and also highlighting that error field
            //where obj is an array of objects {'key':'value'} where key is the ngModel name and value is the notification message
            if (Array.isArray(obj) == true) {
                for (var i = 0; i < obj.length; i++) {
                    var elename = Object.keys(obj[i])[0];
                    var notimsg = obj[i][elename];
                    var k = angular.element("[ng-model='" + elename + "']");
                    k.addClass('updated');
                    noty({
                        text: notimsg,
                        type: 'error',
                        layout: 'topRight',
                        theme: 'defaultTheme',
                        dismissQueue: false,
                        timeout: '3000',
                    });
                }
            }
        }
    }
})
// Child Controller
baseApp.controller('SearchController',['$scope','$location','$http','$timeout', '$rootScope', 'Location',
function($scope, $location, $http, $timeout, $rootScope, Location){

    Location.list().then(function(response){
        console.log(response);
    }, function(response){

    })
    
}])


