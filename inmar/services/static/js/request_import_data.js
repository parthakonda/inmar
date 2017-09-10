
baseApp.controller('RequestImportDataController',['$scope','$location','$http','$timeout', '$rootScope', 'Location', 'Notify', 'Loading',
function($scope, $location, $http, $timeout, $rootScope, Location, Notify, Loading){
    $scope.upload_file = null;
    $scope.initiate_upload = function() {
        Loading.start();
        var files = $("#upload_file").prop("files");
        $(files).each(function (index) {
            var file = this;
            var form_data = new FormData();
            form_data.append("file", file);
            form_data.append("csrfmiddlewaretoken", '' + $('#csrf_token').val() + '')

            $.ajax({
                url: "/stock/task/",
                type: 'POST',
                cache: false,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                data: form_data,
                success: function (data) {
                    Notify.success("File Uploaded Successfully");
                    Loading.stop();
                },
                error: function (data, errorThrown) {
                    Notify.error("Something went wrong");
                    Loading.stop();                    
                },
            })
        });
    };
}])