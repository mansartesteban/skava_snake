import UIConstraint from "../Core/UIConstraint";

class AbsolutePixelConstraint extends UIConstraint {
  execute(component, property, axe) {
    let rootComponentTransform = component.root.transform;

    if (property === "size") {
      component.transform[property][axe] =
        rootComponentTransform.position[axe] + this.value;
    } else if (property === "position") {
      component.transform[property][axe] =
        rootComponentTransform.position[axe] + this.value;
    } else if (["margin", "padding"].includes(property)) {
      component.transform[property][axe] = this.value;
    }
  }
}

export default AbsolutePixelConstraint;
