// Engine imports
import { CommandOnce } from "skava-engine/Core/Commands";

class Stop extends CommandOnce {
  key = "KeyE";

  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute(deltaTime) {
    // this.entity.getComponent(SnakePhysics).setNextPosition(new Vector2(0, 0));
    this.entity.speed = this.entity.speed === 0 ? 1 : 0;
    this.entity.scene.gameOver();
  }
}

export default Stop;
