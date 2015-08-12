import '../../public/lib/main.css'

import angular from 'angular';
import uirouter from 'angular-ui-router';

import home from './components/home/home';
import chat from './components/chat/chat';
import game from './components/game/game';

//import {appDirectives} from '../directives/directives';

import routing from './app.config.js';

angular
  .module("app", [
    uirouter,
    home,
    chat,
    game
  ])
  .config(routing);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app'], {
    strictDi: false
  });
});

export function getModule() {
  return angular.module("app");
}



