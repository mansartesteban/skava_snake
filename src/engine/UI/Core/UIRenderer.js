import ImplementError from "@errors/ImplementError";
import UIConstraintBlock from "./UIConstraintBlock";
import UIStyle from "./UIStyle";
import UIConstraintHandler from "./UIConstraintLayout";
import { getProperties } from "@/Engine/Lib/Objet";

class UIRenderer {
  uiComponent;
  datas;

  setup() {}
  loop() {}

  render() {
    throw new ImplementError("render", "UIRenderer");
  }
}

export default UIRenderer;
