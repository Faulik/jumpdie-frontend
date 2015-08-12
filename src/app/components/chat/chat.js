import uirouter from 'angular-ui-router';

import ChatController from './chat.controller';
import chatService from '../../services/chat.service';

import './chat.css';
import template from './chat.html';

function routes($stateProvider) {
  $stateProvider
    .state('chat', {
      url: '/chat',
      template: template,
      controller: ChatController,
      controllerAs: 'chat'
    });
}

export default angular.module('app.chat', [uirouter, chatService])
  .config(routes)
  .name;

export let ChatRouteState = {
  name: 'chat',
  template: template,
  controller: ChatController,
  controllerAs: 'chat'
};