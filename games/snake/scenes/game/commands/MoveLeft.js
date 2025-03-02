import Vector2 from "@/engine/lib/Vector2";
import SnakePhysics from "../snake/SnakePhysics";
import CommandOnce from "@/engine/commands/CommandOnce";

class MoveLeft extends CommandOnce {
  execute(deltaTime) {
    this.entity.getComponent(SnakePhysics).changeDirection(new Vector2(-1, 0));
  }
}

export default MoveLeft;
