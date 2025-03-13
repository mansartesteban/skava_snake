import Entity from "@/Engine/Entity";
import JoystickRenderer from "./JoystickRenderer";
import Vector2 from "@/Engine/Lib/Vector2";

class Joystick extends Entity {
  direction = new Vector2();
  directionStrenght = 0;

  getOrientation() {
    if (this.direction.length > 0) {
      if (
        this.direction.rotation.angle >= -Math.PI / 4 &&
        this.direction.rotation.angle <= Math.PI / 4
      )
        return new Vector2(1, 0);
      else if (
        this.direction.rotation.angle > Math.PI / 4 &&
        this.direction.rotation.angle < (3 * Math.PI) / 4
      )
        return new Vector2(0, 1);
      else if (
        this.direction.rotation.angle >= (3 * Math.PI) / 4 ||
        this.direction.rotation.angle <= (-3 * Math.PI) / 4
      ) {
        return new Vector2(-1, 0);
      } else {
        return new Vector2(0, -1);
      }
    }
    return new Vector2();
  }

  setup() {
    this.addComponent(new JoystickRenderer());
  }

  loop(deltaTime, currentTime) {}
}

export default Joystick;
