import Vector2 from "@/engine/lib/Vector2";
import SnakePhysics from "../snake/SnakePhysics";
import CommandOnce from "@/engine/commands/CommandOnce";

class Stop extends CommandOnce {
  execute(deltaTime) {
    // this.entity.getComponent(SnakePhysics).setNextPosition(new Vector2(0, 0));
    this.entity.speed = this.entity.speed === 0 ? 1 : 0
  }
}

export default Stop;
