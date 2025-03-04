import UIConstraint from "../Core/UIConstraint";

class FillConstraint extends UIConstraint {
    execute(parentTransform, thisTransform, property, axe) {
        thisTransform[property][axe] = parentTransform[property][axe]
    }
}

export default FillConstraint;
