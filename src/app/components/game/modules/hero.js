import {Collision} from './collision';
import {Base} from './game';

export class Ball extends PIXI.Sprite {
  public name:string;
  public velocity:{x:number,y:number};
  public onGround:boolean = false;
  public doubleJump:boolean = false;

  constructor(texture:PIXI.Texture) {
    super(texture);
    this.texture = texture;
    this.name = 'Hero';
    this.velocity = {x: 5, y: 15};
  }

  tick(base):void {
    var collideables = base.getCollideables();

    this.calculateMov(base.hero,collideables);

  }

  calculateMov(hero, collideables){

    hero.velocity.y += 1;
    var moveBy ={x:0, y:hero.velocity.y};
    Collision.calculateCollision(hero, 'y', collideables, moveBy);

    moveBy = {x:hero.velocity.x,y:0};
    Collision.calculateCollision(hero,'x',collideables,moveBy);

  }
  reset():void {
    this.y = 300;
    this.velocity.y = -5;
  }

  jump():void {
    if (this.onGround) {
      this.velocity.y = -17;
      this.onGround = false;
      this.doubleJump = true;
    } else if (this.doubleJump) {
      this.velocity.y = -17;
      this.doubleJump = false;
    }
  }
}