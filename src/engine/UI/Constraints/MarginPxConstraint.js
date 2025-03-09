import UIConstraint from "../Core/UIConstraint";

class MarginPxConstraint extends UIConstraint {
  execute(component, property) {
    if (property === "margin") {
      if (this.value) {
        let value = this.value;

        if (!Array.isArray(value)) {
          value = [value, value, value, value];
        } else if (value.length === 1) {
          value = [value[0], value[0], value[0], value[0]];
        } else if (value.length === 2) {
          value = [value[0], value[1], value[0], value[1]];
        } else if (value.length === 3) {
          value = [value[0], value[1], value[1], value[2]];
        }

        component.transform.position.x += value[3];
        component.transform.size.x -= value[1] + value[3];
        component.transform.position.y += value[0];
        component.transform.size.y -= value[0] + value[2];
      }
    } else if (property === "padding") {
    }
  }
}

export default MarginPxConstraint;
