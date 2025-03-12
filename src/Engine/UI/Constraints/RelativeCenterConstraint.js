import UIConstraint from "../Core/UIConstraint";

class RelativeCenterConstraint extends UIConstraint {
  execute(component, property, axe) {
    let parentTransform = component.parent.transform;
    component.transform[property][axe] =
      parentTransform.position[axe] +
      parentTransform.size[axe] / 2 -
      component.transform.size[axe] / 2;
  }
}

export default RelativeCenterConstraint;
