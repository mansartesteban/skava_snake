import Vector2 from "@/engine/lib/Vector2";
import SnakePhysics from "../snake/SnakePhysics";
import CommandOnce from "@/engine/commands/CommandOnce";

class MoveDown extends CommandOnce {
  execute(deltaTime) {
    this.entity.getComponent(SnakePhysics).changeDirection(new Vector2(0, 1));
  }
}

export default MoveDown;
