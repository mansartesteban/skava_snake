import RGB from "@/Engine/Lib/RGB";
import UIComponent from "../../Core/UIComponent";
import UIStyle from "../../Core/UIStyle";
import LabelRenderer from "./LabelRenderer";

class Label extends UIComponent {
  text;

  setup() {
    super.setup();

    this.reactToEvents = false;

    let uiStyle = this.getComponent(UIStyle);
    if (!uiStyle) {
      uiStyle = new UIStyle();
      this.addComponent(uiStyle);
    }

    uiStyle.setStyle(
      {
        height: "100%",
      },
      true
    );

    this.addRenderer(new LabelRenderer());
  }

  setText(text) {
    this.text = text;
  }
}

export default Label;
