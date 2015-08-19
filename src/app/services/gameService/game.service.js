import {Base} from './base'

class gameService {
  constructor() {
    this.base = new Base();
  }

  addCanvas(element) {

    const [height, width] = this.getSize(element);

    const options = {
      width: width,
      height: height
    };
    this.base.use(element, options);

    this.element = element;
    this.canvas = element.getElementsByTagName('canvas')[0];
    this.canvas.tabIndex = 0;
    this.canvas.onkeydown = this.base.handleKeyDown.bind(this.base);

    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
  }

  removeCanvas() {
    this.base.stop();
    this.base.remove();
  }

  resizeCanvas() {
    [this.canvas.height, this.canvas.width] = this.getSize(this.element);
  }

  _stopGame() {

  }

  _resumeGame() {

  }

  getSize(element) {
    // TODO fix this bug with pixels below canvas
    let height = element.offsetHeight - 5,
      width = height / 3 * 4;

    if (width > element.offsetWidth) {
      width = element.offsetWidth;
      height = width/ 4 * 3;
    }

    return [height, width];
  }
}

export default angular.module('app.game-service', [])
  .service('gameService', gameService)
  .name;