import CommandClick from "@/Engine/Commands/CommandClick"

class OnClick extends CommandClick {

    constructor(elements) {
        super();
        this.elements = elements;
      }

    execute({ mouse }) {
        let triggeredElement = this.elements.find(element => {

            return element.transform.position.x <= mouse.x
            &&
            element.transform.position.x + element.transform.size.x >= mouse.x
            &&
            element.transform.position.y <= mouse.y
            &&
            element.transform.position.y + element.transform.size.y >= mouse.y
            
        })

        triggeredElement.trigger("click", { mouse, element: triggeredElement })
    }
}

export default OnClick;