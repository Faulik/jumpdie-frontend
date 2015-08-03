import uirouter from 'angular-ui-router';

import HomeController from './home.controller';
import randomNames from '../../services/randomNames.service';

import './home.css';
import template from './home.html';

function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: template,
      controller: 'HomeController',
      controllerAs: 'home'
    });
}

export default angular.module('app.home', [uirouter, randomNames])
  .config(routes)
  .controller('HomeController', HomeController)
  .name;