// Login App
// Author : Partha

AuthApp = angular.module('Authentication', ['ngCookies']);
AuthApp.config(['$interpolateProvider','$httpProvider', '$compileProvider',
    function($interpolateProvider,$httpProvider,$compileProvider) {
        $compileProvider.debugInfoEnabled(false); 
        $httpProvider.useApplyAsync(true);
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose'; 
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';       
}]);
AuthApp.run(['$http','$cookies',
    function($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

AuthApp.factory('Notify', function ($rootScope) {
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
AuthApp.factory('AuthAPI', function ($http) {
    
    var userLogin = function(creds){
        // For sending ajax to login the user
        // @{username:'', password:''} => creds

        return $http({ 
            method: "POST", 
            url: '/auth/login/',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param(creds)
        });
    };

    var userRegister = function(UserData){
        // For registering the user 
        // {'username':'', first_name:'', email:'', password:''} => UserData

        return $http({ 
            method: "POST", 
            url: '/auth/register/',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param(UserData)
        });
    };

    // Exposing the funcationality
    return {
        'userLogin': userLogin,
        'userRegister': userRegister, 
    }
});

AuthApp.factory('Loading', function(){
    return {
        start: function(){
            $('body').addClass('loading');
        },
        stop: function(){
            $('body').removeClass('loading');            
        }
    }
});

// Controllers
AuthApp.controller('LoginRegisterController',['$scope','$rootScope','$http', '$sce', '$compile', '$q', 'AuthAPI', 'Notify', 'Loading',
    function($scope,$rootScope, $http, $sce, $compile, $q, AuthAPI, Notify, Loading){
        
        // Initializing the Login and Register data holder
        $scope.login = {};
        $scope.register = {};

        // User Actions
        $scope.userLogin = function() {
            // Login the user
            // @$scope.login
            Loading.start();
            AuthAPI.userLogin($scope.login).then(function(data){
                // onSuccess
                data = data.data;
                if (data.status == "success"){
                    window.location.href = "/";
                } else {
                    Notify.error(data.message);
                }
                Loading.stop();        
            }, function(data){
                // onFailure
                Loading.stop();        
                Notify.error("Something went wrong");          
            });
        };

        $scope.userRegister = function() {
            // Register the user
            // @$scope.register
            if ($scope.register.password == $scope.register.confirm_password){         
                AuthAPI.userRegister($scope.register).then(function(data){
                    // onSuccess
                    data = data.data;
                    if (data.status == "success"){
                        alert("Please Login to Continue");
                        $('#login-form-link').trigger('click');
                        $scope.register = {};
                    } else {
                        alert(data.message);
                    }
                }, function(data){
                    // onFailure
                    alert("Something went wrong");
                });
            } else {
                alert("Password and Confirm Password must be same");
            }
        };
}]);


// Login Panel 
// Ref: https://bootsnipp.com/snippets/featured/login-and-register-tabbed-form
$(document).ready(function(){
    $(function() {
        $('#login-form-link').click(function(e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').click(function(e) {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

    });
});