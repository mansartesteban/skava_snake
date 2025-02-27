import ControlCommand from "@/engine/ControlCommand"
import Vector2 from "@/engine/lib/Vector2"

class MoveRight extends ControlCommand {

    execute(deltaTime) {
        this.entity.move(new Vector2(this.entity.speed * deltaTime, 0));
    }

}

export default MoveRight