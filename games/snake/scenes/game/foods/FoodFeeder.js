import Vector2 from "@/engine/lib/Vector2";
import Food from "./Food";
import FoodRender from "./FoodRender";
import RGB from "@/engine/lib/RGB";
import { random } from "@/engine/lib/Numeric";

class FoodFeeder {
  position = new Vector2();

  scene;
  activeFood;

  constructor(scene) {
    this.scene = scene;

    this.activeFood = new Food(
      new FoodRender({
        size: this.scene.worldManager.map.tileSize,
        color: RGB.Yellow,
      })
    );
    this.scene.add(this.activeFood);
    this.regenerate();
  }

  regenerate() {
    let xMin = this.scene.map.xMin / this.scene.map.tileSize;
    let xMax = this.scene.map.xMax / this.scene.map.tileSize;
    let yMin = this.scene.map.yMin / this.scene.map.tileSize;
    let yMax = this.scene.map.yMax / this.scene.map.tileSize;

    this.activeFood.position = new Vector2(
      random(
        xMin,
        xMax - 1
      ),
      random(
        yMin,
        yMax - 1
      )
    );
  }

  isOnFood(position) {
    return (
      position.x === this.activeFood.position.x &&
      position.y === this.activeFood.position.y
    );
  }
}

export default FoodFeeder;
