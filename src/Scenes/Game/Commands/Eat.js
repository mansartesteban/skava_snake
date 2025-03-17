// Engine imports
import { CommandOnce } from "skava-engine/Core/Commands";

class Eat extends CommandOnce {
  key = "Space";

  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute() {
    this.entity.food += 1;
  }
}

export default Eat;
