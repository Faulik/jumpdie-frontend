import gameService from '../../services/gameService/game.service';

export default class GameController {
  constructor($timeout, $scope, gameService) {

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