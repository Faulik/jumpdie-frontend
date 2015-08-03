import angular from 'angular';
import uirouter from 'angular-ui-router';

import home from './components/home/home';
//import {Game} from './components/game/game';
//import {Chat} from './components/chat/chat';

//import {appDirectives} from '../directives/directives';

import routing from './app.config.js';

angular
  .module("Angapp", [uirouter, home])
  .config(routing);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['Angapp'], {
    strictDi: false
  });
});

export function getModule() {
  return angular.module("Angapp");
}


//
//@Component({
//  selector: 'app'
//})
//@View({
//  directives: [RouterOutlet, RouterLink, coreDirectives, appDirectives],
//  template: `
//  <h1>GAME OF BALL</h1>
//
//  <ul class="nav">
//      <li><a router-link="home">Home</a></li>
//      <li><a router-link="game">Game</a></li>
//  </ul>
//  <main>
//      <router-outlet></router-outlet>
//  </main>
//  `
//})
//@RouteConfig([
//  {path: '/home', as: 'home', component: Home},
//  {path: '/', as: 'game', component: Game}
//])
//
//export class App {
//  name:string;
//
//  constructor(router:Router, Location:Location) {
//    this.name = 'THE GAME';
//
//    //let uri = Location.path();
//    router.navigate('/');
//  }
//}



