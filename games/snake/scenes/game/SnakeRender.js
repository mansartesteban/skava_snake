import Render2DComponent from "@/engine/components/Render2dComponent"
import RGB from "@/engine/lib/RGB"
import Vector2 from "@/engine/lib/Vector2"
import Circle from "@/engine/shapes/Circle"

class SnakeRender extends Render2DComponent {

    draw;

    constructor() {
        super()
        this.draw = new Circle(new Vector2(), 20, RGB.Red)
    }

    render(viewer) {
        this.draw.position = this.entity.transform.position
        this.draw.draw(viewer)
    }
}

export default SnakeRender;