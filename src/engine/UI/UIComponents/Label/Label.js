import UIComponent from "../../Core/UIComponent"
import LabelRenderer from "./LabelRenderer"

class Label extends UIComponent {

    text;

    
    setup() {
        super.setup()
        this.addRenderer(new LabelRenderer())
    }
    
    setText(text) {
        this.text = text;
    }
}

export default Label;