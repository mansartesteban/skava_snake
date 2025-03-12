import Controls from "@/Engine/Controls";
import OnClick from "../Events/OnClick";
import UIComponent from "./UIComponent";
import MainLayout from "../UIComponents/MainLayout";
import UIStyle from "./UIStyle";
import RGB from "@/Engine/Lib/RGB";

class UIManager {
  #uiComponents = [];
  controls;
  scene;

  mainLayout;

  constructor(scene) {
    this.controls = new Controls();
    this.controls.registerCommand(new OnClick(this.#uiComponents));

    this.scene = scene;

    this.mainLayout = new MainLayout(
      new UIStyle(
        {
          borderRadius: 0,
          margin: 0,
          padding: 0,
          fontSize: 24,
          width: "100%",
          height: "auto",
          align: "left",
          layout: "relative",
          color: RGB.White,
          textColor: RGB.Black,
          // font,
          fontWeight: 500,
          borderWidth: 1,
          borderColor: RGB.Black,
          shadowColor: null,
          shadowBlur: null,
          shadowPosition: null,
          shadowSize: null,
          direction: "vertical",
        },
        true
      )
    );
    this.mainLayout.uiManager = this;
    this.mainLayout.scene = this.scene;
    this.scene.add(this.mainLayout);
  }

  get uiComponents() {
    return this.#uiComponents;
  }

  clean() {
    this.uiComponents.forEach((child) => {
      console.log("clean", this.scene);
      this.scene.remove(child);
    });
  }

  add(uiComponent) {
    if (uiComponent instanceof UIComponent) {
      uiComponent.uiManager = this;

      this.#uiComponents.unshift(uiComponent);
    }
  }
}

export default UIManager;
