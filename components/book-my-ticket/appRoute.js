import mainTemplate from './index.html';
import stepOneTemplate from './step-one.html';
import stepTwoTemplate from './step-two.html';
import stepThreeTemplate from './step-three.html';
import mainController from './main-controller.js';

require('./main.css');
//var nodemailer = require('nodemailer');


export default function appRoutes($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.when('/', '/bookMyTicket');
    $urlRouterProvider.otherwise('/bookMyTicket/stepOne');

    $stateProvider
        .state('app', {
            abstract: true,
            url: '',
            template: '<ui-view></ui-view>',
            controller: mainController
        })
        .state('app.book-my-ticket', {
            url: '/bookMyTicket',
            template: mainTemplate,
            controller: mainController
        })
        .state('app.book-my-ticket.step-one', {
            url: '/stepOne',
            template: stepOneTemplate
        })
        .state('app.book-my-ticket.step-two', {
            url: '/stepTwo',
            template: stepTwoTemplate
        })
        .state('app.book-my-ticket.step-three', {
            url: '/stepThree',
            template: stepThreeTemplate
        });

}