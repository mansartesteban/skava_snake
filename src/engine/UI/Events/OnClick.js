import CommandClick from "@/Engine/Commands/CommandClick";

class OnClick extends CommandClick {
  constructor(elements) {
    super();
    this.elements = elements;
  }

  execute({ mouse }) {
    mouse = mouse.clone();
    let triggeredElement = this.elements.find((element) => {
      return (
        element.transform.position.x + element.scene.viewer.origin.x <=
          mouse.x &&
        element.transform.position.x +
          element.scene.viewer.origin.x +
          element.transform.size.x >=
          mouse.x &&
        element.transform.position.y + element.scene.viewer.origin.y <=
          mouse.y &&
        element.transform.position.y +
          element.scene.viewer.origin.y +
          element.transform.size.y >=
          mouse.y &&
        element.reactToEvents
      );
    });

    if (triggeredElement) {
      triggeredElement.trigger("click", { mouse, element: triggeredElement });
    }
  }
}

export default OnClick;
