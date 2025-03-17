// Engine imports
import { Vector2 } from "skava-engine/Core";
import { CommandOnce } from "skava-engine/Core/Commands";

// Project imports
import SnakePhysics from "../Snake/SnakePhysics";

class MoveLeft extends CommandOnce {
  key = "KeyA";
  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute(deltaTime) {
    this.entity.getComponent(SnakePhysics).changeDirection(new Vector2(-1, 0));
  }
}

export default MoveLeft;
