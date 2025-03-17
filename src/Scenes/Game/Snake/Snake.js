// Engine imports
import { Entity, Vector2, RGB } from "skava-engine/Core";

// Project imports
import SnakePhysics from "./SnakePhysics";
import SnakeRender from "./SnakeRender";
import EyeRender from "./EyeRender";

class Snake extends Entity {
  speed = 0;
  food = 0;
  initialLength = 3;

  positions = [];
  direction = new Vector2();

  options = {
    size: 1,
    color: RGB.Red,
    position: new Vector2(),
  };

  setup() {
    for (let i = 0; i < this.initialLength; i++) {
      let position = {
        nextPosition: new Vector2(),
        direction: new Vector2(1, 0),
        position: null,
        lastPosition: null,
        hasCrossedScreen: false,
      };
      if (i > 0) {
        position.position = new Vector2(
          this.options.position.x - i,
          this.options.position.y
        );
        position.nextPosition = this.positions[i - 1].position;
      } else {
        position.position = this.options.position.clone();
        position.nextPosition = position.position
          .clone()
          .add(position.direction);
      }
      position.lastPosition = position.position.clone().sub(new Vector2(1, 0));
      this.positions.push(position);
    }
    this.addComponent(new SnakeRender());
    this.addComponent(new SnakePhysics());
    this.addComponent(new EyeRender());
  }

  loop() {
    let foodHandler = this.scene.worldManager.get("food-handler");

    if (foodHandler.isOnFood(this.positions[0].position)) {
      this.food++;
      foodHandler.regenerate();
    }
  }
}

export default Snake;
