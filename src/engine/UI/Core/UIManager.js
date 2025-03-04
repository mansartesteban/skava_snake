import Controls from "@/Engine/Controls"
import OnClick from "../Events/OnClick"
import UIComponent from "./UIComponent"

class UIManager {

    #elements = []
controls;


constructor(controls) {
    this.controls = new Controls()
    this.controls.registerCommand(new OnClick(this.#elements))
}
get elements() {
    return this.#elements
}

    add(element) {
        if (element instanceof UIComponent) {
            element.uiManager = this
            this.#elements.unshift(element)
        }
    }

}

export default UIManager