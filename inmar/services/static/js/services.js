
var servicesApp = angular.module('services', []);
servicesApp.factory('Location', ['$http', function ($http) {
    var _export = {
        list: function(params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        retrieve: function(pk, params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/' + pk + '/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        create: function() {

        },
        update: function() {

        },
        destroy: function() {

        }
    }

    return {
        list: _export.list,
        retrieve: _export.retrieve,
        create: _export.create,
        update: _export.update,
        destroy: _export.destroy
    }
}]); // Location Api


servicesApp.factory('Department', ['$http', function ($http) {
    var _export = {
        list: function(params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        retrieve: function(pk, params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/' + pk + '/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        create: function() {

        },
        update: function() {

        },
        destroy: function() {

        }
    }

    return {
        list: _export.list,
        retrieve: _export.retrieve,
        create: _export.create,
        update: _export.update,
        destroy: _export.destroy
    }
}]); // Departments Api

servicesApp.factory('Category', ['$http', function ($http) {
    var _export = {
        list: function(params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        retrieve: function(pk, params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/' + pk + '/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        create: function() {

        },
        update: function() {

        },
        destroy: function() {

        }
    }

    return {
        list: _export.list,
        retrieve: _export.retrieve,
        create: _export.create,
        update: _export.update,
        destroy: _export.destroy
    }
}]); // Category Api

servicesApp.factory('Subcategory', ['$http', function ($http) {
    var _export = {
        list: function(params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        retrieve: function(pk, params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/' + pk + '/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        create: function() {

        },
        update: function() {

        },
        destroy: function() {

        }
    }

    return {
        list: _export.list,
        retrieve: _export.retrieve,
        create: _export.create,
        update: _export.update,
        destroy: _export.destroy
    }
}]); // Subcategory Api

servicesApp.factory('SKU', ['$http', function ($http) {
    var _export = {
        list: function(params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        retrieve: function(pk, params) {
            return $http({
                method:'GET',
                url:'/api/v1/location/' + pk + '/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        create: function() {

        },
        update: function() {

        },
        destroy: function() {

        }
    }

    return {
        list: _export.list,
        retrieve: _export.retrieve,
        create: _export.create,
        update: _export.update,
        destroy: _export.destroy
    }
}]); // Sku Api

servicesApp.factory('User', ['$http', function ($http) {
    var _export = {
        list: function(params) {
            return $http({
                method:'GET',
                url:'/api/v1/user/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        retrieve: function(pk, params) {
            return $http({
                method:'GET',
                url:'/api/v1/user/' + pk + '/',
                params: params,
                header: {
                    'Content-Type': 'application/json',
                }
            });
        },
        create: function(payload) {
            payload['csrfmiddlewaretoken'] = $('#csrf_token').val();
            return $http({
                method:'POST',
                url:'/api/v1/user/',
                data: payload,
                header: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': $('#csrf_token').val()
                }
            });
        }
    }

    return {
        list: _export.list,
        retrieve: _export.retrieve,
        create: _export.create,
        update: _export.update,
        destroy: _export.destroy
    }
}]); // User Api

servicesApp.factory('Notify', function ($rootScope) {
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
}); // Notify

servicesApp.factory('Loading', function(){
    
    return {
        start: function(){
            $('body').addClass('loading');
        },
        stop: function(){
            $('body').removeClass('loading');            
        }
    }
});

