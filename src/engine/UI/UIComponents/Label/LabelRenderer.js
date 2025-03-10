import RGB from "@/Engine/Lib/RGB";
import RoundSquare from "@/Engine/Shapes/RoundSquare";
import UIRenderer from "../../Core/UIRenderer";
import UIStyle from "../../Core/UIStyle"
import Text from "@/Engine/Shapes/Text"

class LabelRenderer extends UIRenderer {
  shape;
  style;

  setup() {
    super.setup()
    this.style = this.uiComponent.getComponent(UIStyle)
    this.shape = new Text(
      this.uiComponent.text,
      this.uiComponent.transform.position,
      this.style.color,
      this.style.fontSize
    );
  }

  render(viewer) {
    this.shape.position = this.uiComponent.transform.position
    this.shape.size = this.uiComponent.transform.size

    this.shape.draw(viewer);
  }
}

export default LabelRenderer;
