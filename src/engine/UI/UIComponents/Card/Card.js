import CardRenderer from "./CardRenderer"
import UIComponent from "../../Core/UIComponent"

class Card extends UIComponent {
    setup() {
        this.addRenderer(new CardRenderer())
    }
}

export default Card;