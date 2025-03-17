// Engine imports
import { CommandTouchMaintain } from "skava-engine/Core/Commands";
import { clamp } from "skava-engine/Utils/Numeric";
import { Vector2 } from "skava-engine/Core";

class JoystickCommand extends CommandTouchMaintain {
  constructor(joystick) {
    super();
    this.joystick = joystick;
  }

  release() {
    this.joystick.direction = new Vector2();
    this.joystick.isUsed = false;
  }

  execute(datas) {
    let diff = datas.touch.clone().sub(datas.touchStart);

    this.joystick.direction = diff.normalized;

    this.joystick.directionStrenght = clamp(diff.length ** 0.8, 0, 40);
    this.joystick.isUsed = true;
  }
}

export default JoystickCommand;
