//import {Collision} from './collision';
//import {Ball} from './hero';
import Assets from './assets'

import PIXI from 'pixi.js/bin/pixi'
import Matter from 'matter-js/build/matter'

const Bodies = Matter.Bodies,
  Body = Matter.Body,
  Runner = Matter.Runner,
  Vector = Matter.Vector;

const assetsLib = [
  {name: 'HERO_IMAGE', url: 'assets/hero.png'},
  {name: 'PLATFORM_IMAGE', url: 'assets/platform.png'}
];
const keyCodes = {
  'w': 87,
  's': 83,
  'a': 65,
  'd': 68,
  'space': 32
};

export class Base {
  constructor() {
    this.players = [];

    this.assets = new Assets();

    this.height = 600;
    this.width = 800;

  }

  use(element, options) {
    const newEngine = Matter.Engine.create({
      render: {
        element: element,
        options: options
      }
    });

    if (this.engine) {
      this.engine = Matter.Engine.merge(newEngine, this.engine)
    } else {
      this.engine = newEngine
    }

    this.assets.add(assetsLib).then(() => this.start(),
                                    (error) => console.error(error));
  }

  initPlayer() {
    this.addPlayer(200, 200);
    this.player = this.players[0];
  }

  start() {
    this.initPlayer();

    const platformTexture = this.assets.getTexture('PLATFORM_IMAGE');
    this.addPlatform(50 - platformTexture.width / 2, this.height);

    let c;
    const l = this.width / platformTexture.width * 1.5;
    let atX = 0;
    let atY = this.height / 1.25;

    for (c = 1; c < l; c++) {
      atX = (c - 0.5) * platformTexture.width * 2 + (Math.random() * platformTexture.width - platformTexture.width / 2);
      atY = atY + Math.random() * this.height - 150;

      this.addPlatform(atX, atY);
    }

    Matter.Engine.run(this.engine);
    Matter.Events.on(this.engine, 'tick', this.tick.bind(this));
  }

  stop() {
    Runner.stop(this.engine);
  }

  tick() {
  }

  handleKeyDown($event) {
    // keyCode don't work on ff
    switch ($event.keyCode || $event.charCode) {
      case keyCodes['space']:
      case keyCodes['w']:
      case keyCodes['w'] + 32:  // uppercase
        this.players[0].force = Vector.create(0, -0.05);
        break;
      case keyCodes['s']:
      case keyCodes['s'] + 32:  // uppercase
        this.players[0].force = Vector.create(0, 0.05);
        break;
      case keyCodes['a']:
      case keyCodes['a'] + 32:  // uppercase
        this.players[0].force = Vector.create(-0.05, 0);
        break;
      case keyCodes['d']:
      case keyCodes['d'] + 32:  // uppercase
        this.players[0].force = Vector.create(0.05, 0);
        break;
    }
  }

  handleKeyUp() {
  }

  addPlatform(x, y) {
    x = Math.round(x);
    y = Math.round(y);
    const platformTexture = this.assets.getTexture('PLATFORM_IMAGE');
    const platform = new Matter.Bodies.rectangle(x, y, platformTexture.width,
                                                 platformTexture.height, {
        isStatic: true,
        render: {
          sprite: {
            texture: this.assets.get('PLATFORM_IMAGE').url
          }
        }
      });

    platform.position.x = x;
    platform.position.y = y;

    this.lastPlatform = platform;
    Matter.World.add(this.engine.world, platform);
  }

  movePlatformToEnd(platform) {
    platform.position.x =
      this.lastPlatform.x + platform.width * 2 + Math.random() * platform.width * 2 - platform.width;
    platform.position.y = this.lastPlatform.y + Math.random() * 300 - 150;
    this.lastPlatform = platform;
  }

  addPlayer(x, y) {
    let hero = new Matter.Bodies.rectangle(x, y, 30, 30, {
      render: {
        sprite: {
          texture: this.assets.get('HERO_IMAGE').url
        }
      }
    });

    this.players.push(hero);

    Matter.World.add(this.engine.world, hero);
  }

}