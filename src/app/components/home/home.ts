import {Component, View} from "angular2/angular2";

let styles = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  directives: [],
  template: `${template}`
})

export class Home {
  constructor() {

  }
}