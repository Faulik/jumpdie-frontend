//import {Collision} from './collision';
//import {Ball} from './hero';
import Assets from './assets'

import PIXI from 'pixi.js/bin/pixi'
import Matter from 'matter-js/build/matter'

const Bodies = Matter.Bodies,
  Body = Matter.Body,
  Runner = Matter.Runner;

const assetsLib = [
  {name: 'HERO_IMAGE', url: 'assets/hero.png'},
  {name: 'PLATFORM_IMAGE', url: 'assets/platform.png'}
];

export class Base {
  constructor() {
    this.players = [];

    this.assets = new Assets();

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

    this.assets.add(assetsLib).then(() => this.start(), (error) => console.error(error));

    Matter.Engine.run(this.engine);
  }

  start() {
    this.addPlayer(200, 200);

    this.addPlatform(50 - this.assets.get('PLATFORM_IMAGE').texture.width / 2,
                     this.height / 1.25);
    var c, l = this.width / this.assets.get('PLATFORM_IMAGE').texture.width * 1.5,
      atX = 0,
      atY = this.height / 1.25;

    for (c = 1; c < l; c++) {
      atX =
        (c - 0.5) * this.assets.get('PLATFORM_IMAGE').texture.width * 2 + (Math.random() * this.assets.get('PLATFORM_IMAGE').texture.width - this.assets.get('PLATFORM_IMAGE').texture.width / 2);
      atY = atY + Math.random() * 300 - 150;

      this.addPlatform(atX, atY);
    }

    Matter.Engine.run(this.engine);
    Matter.Events.on(this.engine, 'tick', this.tick.bind(this));
  }

  stop() {
    Runner.stop(this.engine);
  }

  tick() {
    //this.players[0].force = ({x:1,y:0});
  }

  handleKeyDown() {
  }

  handleKeyUp() {
  }


  addPlatform(x, y) {
    x = Math.round(x);
    y = Math.round(y);
    var platformTAsset = this.assets.get('PLATFORM_IMAGE'),
      platform = new Matter.Bodies.rectangle(x, y, platformTAsset.texture.width,
                                             platformTAsset.height,
        {isStatic: true, render: {sprite: {texture: 'assets/platform.png'}}});

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
    var heroTexture = this.assets.get('HERO_IMAGE').texture,
      hero = new Matter.Bodies.rectangle(x, y, 30, 30,
        {render: {sprite: {texture: 'assets/hero.png'}}});
    Matter.World.add(this.engine.world, hero);

    this.players.push(hero);
  }

}