import Render2DComponent from "@/engine/components/Render2dComponent";
import Vector2 from "@/engine/lib/Vector2";
import Circle from "@/engine/shapes/Circle";
import Square from "@/engine/shapes/Square";

class FoodRender extends Render2DComponent {
  draw;

  constructor(...options) {
    super(...options);

    this.options.size -= 1;
    this.draw = new Circle(
      new Vector2(),
      10,
      this.options.color
    );

  }

  render(viewer) {
    this.draw.position.copy(this.entity.transform.position);
    this.draw.draw(viewer);
  }
}

export default FoodRender;
