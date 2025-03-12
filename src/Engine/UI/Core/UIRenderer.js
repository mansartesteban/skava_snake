import ImplementError from "@/Application/Errors/ImplementError";

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
