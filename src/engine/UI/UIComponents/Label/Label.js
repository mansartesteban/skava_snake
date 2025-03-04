import UIComponent from "../../Core/UIComponent"
import LabelRenderer from "./LabelRenderer"

class Label extends UIComponent {

    text;

    setText(text) {
        this.text = text;
    }

    setup() {
        this.addRenderer(new LabelRenderer())
    }
}

export default Label;