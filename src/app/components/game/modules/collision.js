import {Hero} from './hero';


export class Collision {
  constructor() {
  }

  static calculateCollision(obj, direction, collideables, moveBy) {
    moveBy = moveBy || {x: 0, y: 0};
    if (direction != 'x' && direction != 'y') {
      direction = 'x';
    }

    var measure = direction == 'x' ? 'width' : 'height',
      oppositeDirection = direction == 'x' ? 'y' : 'x',
      oppositeMeasure = direction == 'x' ? 'height' : 'width',

      bounds = obj.getBounds(obj),
      cbounds,
      collision:createjs.Rectangle = null,
      cc = 0;

    bounds.x = obj.localToGlobal(0, 0).x+moveBy.x;
    bounds.y = obj.localToGlobal(0, 0).y+moveBy.y;
    cc = 0;

    while (!collision && cc < collideables.length) {
      cbounds = collideables[cc].getBounds();
      cbounds.x = collideables[cc].localToGlobal(0, 0).x;
      cbounds.y = collideables[cc].localToGlobal(0, 0).y;
      if (collideables[cc].isVisible()) {
        collision = bounds.intersection(cbounds);
      }
      if (!collision && collideables[cc].isVisible) {
        //if b.x < c.x and b.x+mb.x > c.x
        var wentThroughForwards = ( bounds[direction] < cbounds[direction] && bounds[direction] + moveBy[direction] > cbounds[direction] ),
        //if b.x > c.x and b.x+mb.x < c.x
          wentThroughBackwards = ( bounds[direction] > cbounds[direction] && bounds[direction] + moveBy[direction] < cbounds[direction] ),
        //if not b.y+b.h < c.y and b.y > c.y+ch
          withinOppositeBounds = !(bounds[oppositeDirection] + bounds[oppositeMeasure] < cbounds[oppositeDirection])
            && !(bounds[oppositeDirection] > cbounds[oppositeDirection] + cbounds[oppositeMeasure]);

        if ((wentThroughForwards || wentThroughBackwards) && withinOppositeBounds) {
          moveBy[direction] = cbounds[direction] - bounds[direction];
        } else {
          cc++;
        }
      }

      if (collision) {
        var sign = Math.abs(moveBy[direction]) / moveBy[direction];
        moveBy[direction] -= collision[measure] * sign;

        if (obj.velocity.y > 0) {
          obj.onGround = true;
          obj.doubleJump = false;
          obj.velocity.y = 0;
          moveBy.y = 0;
        }
        obj[direction] += moveBy[direction] - collision[measure];
      } else {
        obj[direction]+=moveBy[direction];

        if (obj.onGround) {
          obj.onGround = false;
          obj.doubleJump = true;
        }
      }
      }
    }
}