import UIComponent from "../../Core/UIComponent";
import DivRenderer from "./DivRenderer";

class Div extends UIComponent {
  setup() {
    super.setup();
    this.addRenderer(new DivRenderer());
  }
}

export default Div;
