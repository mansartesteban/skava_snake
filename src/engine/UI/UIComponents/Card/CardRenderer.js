import RGB from "@/Engine/Lib/RGB"
import Vector2 from "@/Engine/Lib/Vector2"
import RoundSquare from "@/Engine/Shapes/RoundSquare"
import UIRenderer from "../../Core/UIRenderer"

class CardRenderer extends UIRenderer {

    shape = new RoundSquare(new Vector2(-150, -300), new Vector2(300, 600), [16], RGB.Grey)

    render(viewer) {
        this.shape.draw(viewer)
    }
}

export default CardRenderer