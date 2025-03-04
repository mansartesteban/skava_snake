import ButtonRenderer from "./ButtonRenderer"
import UIComponent from "../../Core/UIComponent"

class Button extends UIComponent {
    setup() {
        this.addRenderer(new ButtonRenderer())
    }
}

export default Button;