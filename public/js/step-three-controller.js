angular.module('myApp')
    .controller('StepThreeCtrl', function ($scope, $rootScope, $window, $http) {
        console.log('3 ctrl', $scope.user);

        $scope.onSubmit = function(user){
            console.log('user info', $scope.user);

            $http.post('/sendmail', user)
                .then(function(res){
                    console.log('res', res);

                }, function(err){
                    console.log('err', err);
                });
        };
    });