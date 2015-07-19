import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {BrowserLocation} from 'angular2/src/router/browser_location';

import {Home} from './home/home';
import {Game} from './game/game';

import {appDirectives} from '../directives/directives';

@Component({
  selector: 'app'
})
@View({
  directives: [RouterOutlet, RouterLink, coreDirectives, appDirectives],
  template: `
    <h1>GAME OF BALL</h1>

    <ul class="nav">
        <li><a router-link="home">Home</a></li>
        <li><a router-link="game">Game</a></li>
    </ul>
    <main>
        <router-outlet></router-outlet>
    </main>
    `
})
@RouteConfig([
  {path: '/home', as: 'home', component: Home},
  {path: '/', as: 'game', component: Game}
])

export class App {
  name:string;

  constructor(router:Router, browserLocation:BrowserLocation) {
    this.name = 'THE GAME';

    let uri = browserLocation.path();
    router.navigate(uri);
  }
}