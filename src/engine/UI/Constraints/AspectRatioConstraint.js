import UIConstraint from "../Core/UIConstraint";

class AspectRatioConstraint extends UIConstraint {
    execute(parentTransform, thisTransform, property, axe) {
        let crossAxis = axe === "x" ? "y" : "x"
        thisTransform[property][axe] = parentTransform[property][crossAxis] * this.value
    }
}

export default AspectRatioConstraint;
