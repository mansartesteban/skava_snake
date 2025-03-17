// Engine imports
import { Vector2 } from "skava-engine/Core";
import { CommandSwipe } from "skava-engine/Core/Commands";

// Project imports
import SnakePhysics from "../Snake/SnakePhysics";

class MoveUpSwipe extends CommandSwipe {
  key = "KeyW";
  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute(deltaTime) {
    this.entity.getComponent(SnakePhysics).changeDirection(new Vector2(0, -1));
  }
}

export default MoveUpSwipe;
