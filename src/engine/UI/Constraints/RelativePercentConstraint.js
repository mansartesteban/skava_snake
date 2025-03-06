import UIConstraint from "../Core/UIConstraint";

class RelativePercentConstraint extends UIConstraint {
  execute(component, property, axe) {
    let parentTransform = component.parent.transform;

    if (property === "size") {
      component.transform[property][axe] =
        parentTransform.size[axe] * this.value;

        component.datas.nextFreePosition[axe] = parentTransform.size[axe] * this.value
      } else if (property === "position") {
        component.transform[property][axe] =
        parentTransform.position[axe] + parentTransform.size[axe] * this.value;

        component.datas.nextFreePosition[axe] = parentTransform.position[axe] + parentTransform.size[axe] * this.value
    } else if (["margin", "padding"].includes(property)) {
      component.transform[property][axe] = this.value;
    }
  }
}

export default RelativePercentConstraint;
