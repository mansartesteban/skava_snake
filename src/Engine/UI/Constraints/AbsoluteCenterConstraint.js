import UIConstraint from "../Core/UIConstraint";

class AbsoluteCenterConstraint extends UIConstraint {
  execute(component, property, axe) {
    let rootComponentTransform = component.root.transform;

    component.transform[property][axe] =
      rootComponentTransform.position[axe] + rootComponentTransform.size[axe] / 2 - component.transform.size[axe] / 2;
  }
}

export default AbsoluteCenterConstraint;
 