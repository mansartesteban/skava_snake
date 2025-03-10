import CardRenderer from "./CardRenderer";
import UIComponent from "../../Core/UIComponent";
import UIStyle from "../../Core/UIStyle";
import Div from "../Div/Div";
import RGB from "@/Engine/Lib/RGB";
import DivRenderer from "../Div/DivRenderer";
import Label from "../Label/Label";
import Button from "../Button/Button";

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
        color: new RGB(0, 255, 255, 255),
        width: "100%",
        // height: 40,
        margin: 20,
        borderRadius: 24,
      },
      true
    );

    let cardHeader = new Div(
      new UIStyle({
        width: "100%",
        height: 64,
        borderRadius: [24, 24, 0, 0],
        color: RGB.Fuchsia,
      })
    );
    let cardBody = new Div(
      new UIStyle({
        color: RGB.Blue,
        width: "100%",
        borderRadius: [8],
        margin: [24],
      })
    );

    this.addChild(cardHeader);
    this.addChild(cardBody);
    this.setDefaultSlot(cardBody); // TODO
    this.addRenderer(new DivRenderer());
  }
}

export default Card;
