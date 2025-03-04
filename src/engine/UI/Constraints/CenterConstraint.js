import UIConstraint from "../Core/UIConstraint";

class CenterConstraint extends UIConstraint {
  execute(parentTransform, thisTransform, property, axe) {
    thisTransform[property][axe] =
      parentTransform[property][axe] +
      parentTransform.size[axe] / 2 -
      thisTransform.size[axe] / 2;
  }
}

export default CenterConstraint;
