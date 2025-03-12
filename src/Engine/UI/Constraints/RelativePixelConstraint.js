import UIConstraint from "../Core/UIConstraint";

class RelativePixelConstraint extends UIConstraint {
  execute(component, property, axe) {
    let parentTransform = component.parent.transform;

    if (property === "size") {
      component.transform[property][axe] =
        parentTransform.size[axe] + this.value;
    } else if (property === "position") {
      component.transform[property][axe] =
        parentTransform.position[axe] + this.value;
    } else if (["margin", "padding"].includes(property)) {
      component.transform[property][axe] = this.value;
    }
  }
}

export default RelativePixelConstraint;
