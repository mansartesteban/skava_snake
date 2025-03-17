// Engine imports
import { Entity, Vector2 } from "skava-engine/Core";

class Food extends Entity {
  position = new Vector2();

  setup() {}
  loop() {
    this.transform.position = this.position
      .clone()
      .multiply(this.scene.worldManager.map.tileSize);
  }
}

export default Food;
