import UIComponent from "../../Core/UIComponent";
import DebugDivRenderer from "./DebugDivRenderer";

class DebugDiv extends UIComponent {
  setup() {
    super.setup();
    this.addRenderer(new DebugDivRenderer());
  }
}

export default DebugDiv;
