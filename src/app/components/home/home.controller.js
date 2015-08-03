export default class HomeController {
  constructor(randomNames) {
    this.title = 'Jumpdie';
    this.name = randomNames.getName();
  }
}