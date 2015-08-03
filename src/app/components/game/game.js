import {Component, View} from 'angular2/angular2';
import {Base} from './modules/game';

const styles = require('./game.css');
const template = require('./game.html');

@Component({
  selector: 'game'
})
@View({
  directives: [],
  template: `${template}`
})

export class Game {
  constructor() {
    var base = new Base();
  }
}