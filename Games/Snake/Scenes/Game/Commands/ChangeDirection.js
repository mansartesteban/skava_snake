import Vector2 from "@/Engine/Lib/Vector2";
import SnakePhysics from "../Snake/SnakePhysics";
import CommandSwipe from "@/Engine/Commands/CommandSwipe";

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
