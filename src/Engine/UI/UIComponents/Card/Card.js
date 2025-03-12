import UIComponent from "../../Core/UIComponent";
import UIStyle from "../../Core/UIStyle";
import Div from "../Div/Div";
import RGB from "@/Engine/Lib/RGB";
import DebugDivRenderer from "../DebugDiv/DebugDivRenderer";
import DivRenderer from "../Div/DivRenderer";

class Card extends UIComponent {
  setup() {
    super.setup();

    let uiStyle = this.getComponent(UIStyle);
    if (!uiStyle) {
      uiStyle = new UIStyle();
      this.addComponent(uiStyle);
    }

    uiStyle.setStyle(
      {
        color: new RGB(255, 255, 255, 1),
        borderRadius: 32,
      },
      true
    );

    let cardHeader = new Div(
      new UIStyle({
        height: 64,
        borderRadius: [32, 32, 0, 0],
        color: new RGB(220, 220, 220),
      })
    );
    let cardBody = new Div(
      new UIStyle({
        borderRadius: [8],
        margin: [32],
        color: new RGB(255, 255, 255, 1),
        align: "center",
      })
    );

    this.addChild(cardHeader);
    this.addChild(cardBody);
    this.setDefaultSlot(cardBody); // TODO
    this.setSlot("header", cardHeader); // TODO
    this.addRenderer(new DivRenderer());
  }
}

export default Card;
