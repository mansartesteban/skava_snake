import ImplementError from "@errors/ImplementError";
import UIConstraintBlock from "./UIConstraintBlock";
import UIStyle from "./UIStyle";

class UIRenderer {
  uiComponent;

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

  getExposedPropertiesWithValues(instance) {
    let proto = Object.getPrototypeOf(instance);
    let descriptors = Object.getOwnPropertyDescriptors(proto);
    let getters = Object.keys(descriptors).filter(
      (key) => typeof descriptors[key].get === "function"
    );

    return getters.reduce((acc, key) => {
      acc[key] = instance[key]; // Accède au getter
      return acc;
    }, {});
  }

  initializeStyle(thisStyle, style) {
    let styleValues = this.getExposedPropertiesWithValues(style);
    Object.keys(styleValues).forEach((prop) => {
      if (prop !== "inherit") {
        thisStyle[prop] = thisStyle[prop] || styleValues[prop];
      }
    });
  }

  calculateConstraint() {
    let constraints = this.uiComponent.getComponent(UIConstraintBlock);

    let widthConstraint = constraints.widthConstraint;
    if (widthConstraint) {
      widthConstraint.execute(
        this.uiComponent.parent.transform,
        this.uiComponent.transform,
        "size",
        "x"
      );
    }

    let heightConstraint = constraints.heightConstraint;
    if (heightConstraint) {
      heightConstraint.execute(
        this.uiComponent.parent.transform,
        this.uiComponent.transform,
        "size",
        "y"
      );
    }

    let xConstraint = constraints.xConstraint;
    if (xConstraint) {
      xConstraint.execute(
        this.uiComponent.parent.transform,
        this.uiComponent.transform,
        "position",
        "x"
      );
    }

    let yConstraint = constraints.yConstraint;
    if (yConstraint) {
      yConstraint.execute(
        this.uiComponent.parent.transform,
        this.uiComponent.transform,
        "position",
        "y"
      );
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
