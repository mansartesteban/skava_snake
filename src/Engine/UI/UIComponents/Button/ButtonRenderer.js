import RGB from "@/Engine/Lib/RGB";
import RoundSquare from "@/Engine/Shapes/RoundSquare";
import UIRenderer from "../../Core/UIRenderer";
import UIStyle from "../../Core/UIStyle";
import Img from "@/Engine/Shapes/Img";

class ButtonRenderer extends UIRenderer {
  shape;
  style;

  setup() {
    super.setup();
    this.style = this.uiComponent.getComponent(UIStyle);
    this.shape = new RoundSquare(
      this.uiComponent.transform.position,
      this.uiComponent.transform.size,
      this.style.borderRadius,
      this.style.color
    );

    this.shape = new Img("/button.png");
  }

  render(viewer) {
    this.shape.position = this.uiComponent.transform.position;
    this.shape.size = this.uiComponent.transform.size;

    this.shape.color = this.style.color;

    this.shape.draw(viewer, this.uiComponent.transform);
  }
}

export default ButtonRenderer;
