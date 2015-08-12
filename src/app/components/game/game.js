import uirouter from 'angular-ui-router'

import GameController from './game.controller'
import gameService from '../../services/gameService/game.service'

import {ChatRouteState} from '../chat/chat'

import './game.css';
import templateLayout from './game.html';

function routes($stateProvider) {
  $stateProvider
    .state('game', {
      template: templateLayout,
      abstract: true
    })
    .state('game.main', {
      url: '/game',
      views: {
        'sidebar': ChatRouteState,
        'main':{
          template: '<div class="flex" id="game-canvas-wrap"></div>',
          controller: GameController,
          controllerAs: 'game',
          onExit: () => {this.stop()}
        }
      }
    }
  )
}

export  default angular.module('app.game', [uirouter, gameService])
  .config(routes)
  .name;