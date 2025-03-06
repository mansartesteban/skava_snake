import ImplementError from "@errors/ImplementError";
import UIConstraintBlock from "./UIConstraintBlock";
import UIStyle from "./UIStyle";
import UIConstraintHandler from "./UIConstraintLayout";
import { getProperties } from "@/Engine/Lib/Objet"

class UIRenderer {
  uiComponent;
  datas

  setup() {
    let style = this.uiComponent.root.getComponent(UIStyle);
    if (style && style.inherit) {
      let thisStyle = this.uiComponent.getComponent(UIStyle);
      if (!thisStyle) {
        thisStyle = style;
        this.uiComponent.addComponent(thisStyle);
      }
      this.initializeStyle(thisStyle, style);
    }
  }



  initializeStyle(thisStyle, style) {
    let styleValues = getProperties(style);
    Object.keys(styleValues).forEach((prop) => {
      if (prop !== "inherit") {
        thisStyle[prop] = thisStyle[prop] || styleValues[prop];
      }
    });
  }

  calculateConstraint() {
    let constraints = this.uiComponent.getComponent(UIConstraintHandler);

    if (constraints) {
      let widthConstraint = constraints.widthConstraint;
      if (widthConstraint) {
        if (
          widthConstraint.options?.refresh === undefined ||
          widthConstraint.options?.refresh === true ||
          !widthConstraint.setup
        ) {
          widthConstraint.execute(this.uiComponent, "size", "x");
          widthConstraint.setup = true;
        }
      }

      let heightConstraint = constraints.heightConstraint;
      if (heightConstraint) {
        if (
          heightConstraint.options?.refresh === undefined ||
          heightConstraint.options?.refresh === true ||
          !heightConstraint.setup
        ) {
          heightConstraint.execute(this.uiComponent, "size", "y");
          heightConstraint.setup = true;
        }
      }

      let xConstraint = constraints.xConstraint;
      if (xConstraint) {
        if (
          xConstraint.options?.refresh === undefined ||
          xConstraint.options?.refresh === true ||
          !xConstraint.setup
        ) {
          xConstraint.execute(this.uiComponent, "position", "x");
          xConstraint.setup = true;
        }
      }

      let yConstraint = constraints.yConstraint;
      if (yConstraint) {
        if (
          yConstraint.options?.refresh === undefined ||
          yConstraint.options?.refresh === true ||
          !yConstraint.setup
        ) {
          yConstraint.execute(this.uiComponent, "position", "y");
          yConstraint.setup = true;
        }
      }

      // let paddingConstraint = constraints.paddingConstraint;
      // if (paddingConstraint) {
      //   if (
      //     paddingConstraint.options?.refresh === undefined ||
      //     paddingConstraint.options?.refresh === true ||
      //     !paddingConstraint.setup
      //   ) {
      //     paddingConstraint.execute(this.uiComponent, "padding");
      //     paddingConstraint.setup = true;
      //   }
      // }

      let marginConstraint = constraints.marginConstraint;
      if (marginConstraint) {
        if (
          marginConstraint.options?.refresh === undefined ||
          marginConstraint.options?.refresh === true ||
          !marginConstraint.setup
        ) {
          marginConstraint.execute(this.uiComponent, "margin");
          marginConstraint.setup = true;
        }
      }
    }
    
  }

  loop() {
    this.calculateConstraint();
  }

  render() {
    throw new ImplementError("render", "UIRenderer");
  }
}

export default UIRenderer;
