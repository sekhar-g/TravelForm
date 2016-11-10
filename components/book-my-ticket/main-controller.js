export default function mainController($scope, $http, myService) {
    'ngInject';

    $scope.pass = [];
    var show;

    $scope.addinfo = function (info) {
        $scope.pass.push();
        myService.setData($scope.pass);
        show = myService.getData();
        $scope.frstName = show[0].frstName;
        $scope.mailContent = show;
    };

         // country list
       $scope.countries = ['Alberta', 'British Columbia', 'Ontario', 'California', 'Florida',
        'New York', 'Toronto', 'Hamilton', 'Los Angeles', 'San Francisco'];


    // To validation,contact No field
    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    // To validate date
    $scope.dateValidate = 'Return Date should not be before Departure date';

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    function disabled(data) {
        var date = data.date;
    };

    $scope.sendMail = function () {

        var message = {
            to: show[0].mail, frstName: show[0].frstName, lastname: show[0].lastName,
            phno: show[0].phno, text: 'will depart for', city: show[0].city, text1: 'on',
            ddt: show[0].ddt, text2: 'and return on', rdt: show[0].rdt
        };

        $http.post('http://192.168.10.65:2000/sendMail', message).then(function (reply) {

        });
        //$scope.pass='';
        $scope.messages = 'Your Booking confirmation has been sent to your Email-id!';
    };
}
