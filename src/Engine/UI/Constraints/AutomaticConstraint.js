import UIConstraint from "../Core/UIConstraint";

class AbsolutePercentConstraint extends UIConstraint {
  execute(component, property, axe) {
    let rootComponentTransform = component.root.transform;

    if (property === "size") {
      // TODO ?
    } else if (property === "position") {
        
    } else if (["margin", "padding"].includes(property)) {
        // TODO ?
    }
  }
}

export default AbsolutePercentConstraint;
