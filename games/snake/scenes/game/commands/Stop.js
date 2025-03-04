import Vector2 from "@/Engine/Lib/Vector2";
import SnakePhysics from "../Snake/SnakePhysics";
import CommandOnce from "@/Engine/Commands/CommandOnce";

class Stop extends CommandOnce {
  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute(deltaTime) {
    // this.entity.getComponent(SnakePhysics).setNextPosition(new Vector2(0, 0));
    this.entity.speed = this.entity.speed === 0 ? 1 : 0;
  }
}

export default Stop;
