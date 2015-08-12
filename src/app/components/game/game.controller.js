import gameService from '../../services/gameService/game.service';

export default class GameController {
  constructor(gameService, $timeout) {

    const element = document.getElementById('game-canvas-wrap');
    this.gameService = gameService;
    $timeout(() => this.gameService.addCanvas(element),
      500
    );

  }

  stop() {
    this.gameService.removeCanvas();
  }
}