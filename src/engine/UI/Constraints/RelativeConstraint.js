import UIConstraint from "../Core/UIConstraint";

class RelativeConstraint extends UIConstraint {
  execute(parentTransform, thisTransform, property, axe) {
    if (property === "size") {
        thisTransform[property][axe] = parentTransform[property][axe] * this.value; 
    } else if (property === "position") {
        thisTransform[property][axe] = parentTransform[property][axe] + parentTransform.size[axe] * this.value
    }
  }
}

export default RelativeConstraint;
