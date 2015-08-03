import {Component, View} from "angular2/angular2";

const styles = require('./chat.css');
const template = require('./chat.html');

@Component({
	selector: 'chat'
})
@View({
	directives: [],
	template: '${template}'
})

export class Chat {
	constructor(){
		
	}
}