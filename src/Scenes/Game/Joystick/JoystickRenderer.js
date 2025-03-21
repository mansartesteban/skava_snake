// Engine imports
import { Render2DComponent } from "skava-engine/Core/Components";
import { RGB, Vector2 } from "skava-engine/Core";
import { Circle } from "skava-engine/Core/Shapes";

class JoystickRenderer extends Render2DComponent {
  centerPosition = new Vector2();

  setup() {
    this.centerPosition = new Vector2(
      (this.entity.scene.viewer.size.x / 2) * 0.75,
      (this.entity.scene.viewer.size.y / 2) * 0.75
    );
    this.circle1 = new Circle(
      this.centerPosition,
      60,
      new RGB(255, 255, 255, 0.5)
    );
    this.circle2 = new Circle(
      this.centerPosition,
      32,
      new RGB(255, 255, 255, 0.5)
    );
  }

  render(viewer) {
    this.circle2.position = this.centerPosition
      .clone()
      .add(
        this.entity.direction.clone().multiply(this.entity.directionStrenght)
      );
    this.circle1.draw(viewer);
    this.circle2.draw(viewer);
  }
}

export default JoystickRenderer;
