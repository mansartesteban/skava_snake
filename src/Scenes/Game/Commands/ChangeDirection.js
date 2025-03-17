// Engine imports
import { Vector2 } from "skava-engine/Core";
import { CommandSwipe } from "skava-engine/Core/Commands";

// Project imports
import SnakePhysics from "../Snake/SnakePhysics";

class ChangeDirection extends CommandSwipe {
  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute({ touch, touchStart }) {
    let angle = touch.sub(touchStart).rotation.angle;

    let direction = new Vector2();

    // TODO Move from here

    this.entity.getComponent(SnakePhysics).changeDirection(direction);
  }
}

export default ChangeDirection;
