import Entity from "@/Engine/Entity";
import Vector2 from "@/Engine/Lib/Vector2";

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
