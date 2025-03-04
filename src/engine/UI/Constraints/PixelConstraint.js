import UIConstraint from "../Core/UIConstraint";
import FillConstraint from "./FillConstraint";

class PixelConstraint extends UIConstraint {
  execute(parentTransform, thisTransform, property, axe) {
    if (property === "position") {
      thisTransform[property][axe] = parentTransform[property][axe] 
      if (this.options?.opposite) {
        thisTransform[property][axe] += parentTransform.size.x - thisTransform.size.x - this.value
    } else {
        thisTransform[property][axe] += this.value;
      }
      if (
        axe === "x" &&
        this.constraintManager.widthConstraint instanceof FillConstraint
      ) {
        thisTransform.size.x = parentTransform.size.x - this.value * 2;
      }
      if (
        axe === "y" &&
        this.constraintManager.heightConstraint instanceof FillConstraint
      ) {
        thisTransform.size.y = parentTransform.size.y - this.value * 2;
      }
    } else if (property === "size") {
      thisTransform[property][axe] = this.value;
    }
  }
}

export default PixelConstraint;
