
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