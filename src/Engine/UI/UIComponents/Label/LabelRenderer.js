import UIRenderer from "../../Core/UIRenderer";
import UIStyle from "../../Core/UIStyle";
import Text from "@/Engine/Shapes/Text";

class LabelRenderer extends UIRenderer {
  shape;
  style;

  setup() {
    super.setup();

    this.style = this.uiComponent.getComponent(UIStyle);
    this.shape = new Text(
      this.uiComponent.text,
      this.uiComponent.transform.position,
      this.style.color,
      this.style.fontSize
    );
    let f = new FontFace("BraahOne", "url(/BraahOne-Regular.ttf)");

    f.load().then((font) => {
      document.fonts.add(font);
    });
  }

  render(viewer) {
    this.shape.position = this.uiComponent.transform.position;
    this.shape.size = this.uiComponent.transform.size;
    this.shape.position.x += this.shape.size.x / 2;
    this.shape.position.y += this.shape.size.y / 2;
    this.shape.draw(viewer);
  }
}

export default LabelRenderer;
