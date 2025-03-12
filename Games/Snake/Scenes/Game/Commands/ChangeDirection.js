import SnakePhysics from "../Snake/SnakePhysics";
import CommandSwipe from "@/Engine/Commands/CommandSwipe";

class ChangeDirection extends CommandSwipe {
  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute(direction) {
    this.entity.getComponent(SnakePhysics).changeDirection(direction);
  }
}

export default ChangeDirection;
