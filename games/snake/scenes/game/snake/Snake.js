import Entity from "@/engine/Entity";
import SnakePhysics from "./SnakePhysics";
import Vector2 from "@/engine/lib/Vector2";
import RGB from "@/engine/lib/RGB";

class Snake extends Entity {
  speed = 0;
  food = 0;
  initialLength = 3;

  positions = []
  direction = new Vector2();

  options = {
    size: new Vector2(1, 1),
    color: RGB.Red,
  };

  setup() {
    this.addComponent(new SnakePhysics());
    for (let i = 0 ; i < this.initialLength ; i++) {

      let position = {
        nextPosition: new Vector2(),
        direction: new Vector2(1, 0),
        position: null,
        lastPosition: null,
        hasCrossedScreen: false
      }
      position.position = new Vector2(
        -this.scene.worldManager.map.options.subdivisions / 2  - i + 4,
        0
      )
      if (i > 0) {
        position.nextPosition = this.positions[i - 1].position
      } else {
        position.nextPosition = position.position.clone().add(position.direction)
      }
      position.lastPosition = position.position.clone().sub(new Vector2(1, 0));
      this.positions.push(position);
    }

  }

  loop() {
    let foodHandler = this.scene.worldManager.get("food-handler");

    if (foodHandler.isOnFood(this.positions[0].position)) {
      console.log("fooooood")
      this.food++;
      foodHandler.regenerate();
    }


    while (this.positions.length < this.food + this.initialLength) {
      let last = this.positions[this.positions.length -1]
      this.positions.push({
        nextPosition: last.nextPosition,
        direction: last.direction,
        position: last.position,
        lastPosition: last.position
      });
    }
  }
}

export default Snake;
