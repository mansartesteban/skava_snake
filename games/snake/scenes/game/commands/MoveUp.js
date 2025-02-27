import ControlCommand from "@/engine/ControlCommand"
import Vector2 from "@/engine/lib/Vector2"

class MoveUp extends ControlCommand {

    execute(deltaTime) {
        this.entity.move(new Vector2(0, -this.entity.speed * deltaTime));
    }

}

export default MoveUp