import {Collision} from './collision';
import {Ball} from './hero';


let PIXI = require('pixi.js'),
  Matter = require('matter-js/'),
  Bodies = Matter.Bodies,
  Body = Matter.Body;

let assetsLib = [
  {name: 'HERO_IMAGE', url: 'assets/hero.png'},
  {name: 'PLATFORM_IMAGE', url: 'assets/platform.png'}
];

export class Base {
  public renderer:PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  public engine;
  public world= Matter.World;

  public players:Array<any>=[];

  public assets:Array<any>;
  public lastPlatform;

  public width:number;
  public height:number;

  constructor() {
    var canvas = <HTMLCanvasElement> document.getElementById("GameCanvasWrap");

    this.width = canvas.width;
    this.height = canvas.height;

    this.engine = Matter.Engine.create(canvas);

    this.preload();
  }

  private start():void {




    this.addPlayer(200,200);

    //raf(this.tick.bind(this));


    this.addPlatform(50 - this.assets['PLATFORM_IMAGE'].texture.width / 2, this.height / 1.25);
    var c, l = this.width / this.assets['PLATFORM_IMAGE'].texture.width * 1.5,
      atX = 0,
      atY = this.height / 1.25;

    for (c = 1; c < l; c++) {
      atX =
        (c - 0.5) * this.assets['PLATFORM_IMAGE'].texture.width * 2 + (Math.random() * this.assets['PLATFORM_IMAGE'].texture.width - this.assets['PLATFORM_IMAGE'].texture.width / 2);
      atY = atY + Math.random() * 300 - 150;

      this.addPlatform(atX, atY);
    }

    console.log(this.engine);
    Matter.Engine.run(this.engine);
    console.log(this.engine);
    Matter.Events.on(this.engine,'tick', this.tick.bind(this));
  }

  private preload():void {

    PIXI.loader.add(assetsLib).load(this.onLoadAssets.bind(this));

  }

  private onLoadAssets(loader:PIXI.loaders.Loader, resources:Array<PIXI.loaders.Resource>) {
    this.assets = resources;
    this.start();
  }

  tick():void {
    //this.players[0].force = ({x:1,y:0});
  }

  handleKeyDown() {
  }

  handleKeyUp() {
  }


  addPlatform(x:number, y:number) {
    x = Math.round(x);
    y = Math.round(y);
    var platformTAsset = this.assets['PLATFORM_IMAGE'],
      platform = new Matter.Bodies.rectangle(x, y, platformTAsset.texture.width,platformTAsset.height,{isStatic:true,render:{sprite:{texture:'assets/platform.png'}}});

    platform.position.x = x;
    platform.position.y = y;

    this.lastPlatform = platform;
    Matter.World.add(this.engine.world,platform);
  }

  movePlatformToEnd(platform:PIXI.Sprite) {
    platform.position.x =
      this.lastPlatform.x + platform.width * 2 + Math.random() * platform.width * 2 - platform.width;
    platform.position.y = this.lastPlatform.y + Math.random() * 300 - 150;
    this.lastPlatform = platform;
  }

  addPlayer(x:number, y:number) {
    var heroTexture = this.assets['HERO_IMAGE'].texture,
      hero = new Matter.Bodies.rectangle(x, y, 30,30,{render:{sprite:{texture:'assets/hero.png'}}});
    Matter.World.add(this.engine.world,hero);

    this.players.push(hero);
  }

}