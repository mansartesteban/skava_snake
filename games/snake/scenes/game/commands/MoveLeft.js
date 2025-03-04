import Vector2 from "@/Engine/Lib/Vector2";
import SnakePhysics from "../Snake/SnakePhysics";
import CommandOnce from "@/Engine/Commands/CommandOnce";

class MoveLeft extends CommandOnce {
  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute(deltaTime) {
    this.entity.getComponent(SnakePhysics).changeDirection(new Vector2(-1, 0));
  }
}

export default MoveLeft;
