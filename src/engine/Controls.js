import CommandClick from "./Commands/CommandClick";
import CommandHold from "./Commands/CommandHold";
import CommandMouseMove from "./Commands/CommandMouseMove";
import CommandOnce from "./Commands/CommandOnce";
import CommandSwipe from "./Commands/CommandSwipe";
import CommandToggle from "./Commands/CommandToggle";
import Vector2 from "./Lib/Vector2";

class Controls {
  stack = [];
  commands = [];
  onceCommandsExecuted = [];

  pointerLock = null;

  mouse = new Vector2();
  touch = new Vector2();

  constructor(pointerLock = false) {
    window.addEventListener("keyup", this.#onKeyUp.bind(this));
    window.addEventListener("keydown", this.#onKeyDown.bind(this));
    window.addEventListener("mousemove", this.#onMouseMove.bind(this));
    window.addEventListener("click", this.#onClick.bind(this));
    window.addEventListener("touchstart", this.#onTouchStart.bind(this));
    window.addEventListener("touchend", this.#onTouchEnd.bind(this));

    if (pointerLock) {
      document.onpointerlockchange = () => {
        this.pointerLock = document.pointerLockElement;
      };

      document.body.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (e.which !== 3) {
          await document.body.requestPointerLock({
            unadjustedMovement: true,
          });
        }
      });
    }
  }

  #onClick(e) {
    e.preventDefault();
    let onClickCommands = this.commands.filter(
      (command) => command instanceof CommandClick
    );
    onClickCommands.forEach((command) => {
      command.execute({ mouse: this.mouse });
    });
  }

  #onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    if (this.pointerLock) {
      let mouseMoveCommands = this.commands.filter(
        (command) => command instanceof CommandMouseMove
      );

      mouseMoveCommands.forEach((command) => {
        command.execute(e);
      });
    }
  }

  #onKeyUp(e) {
    if (this.stack.includes(e.code)) {
      let foundIndex = this.stack.findIndex((s) => s === e.code);
      if (foundIndex > -1) {
        this.stack.splice(foundIndex, 1);
      }
    }

    let toggleCommands = this.commands.filter(
      (command) =>
        command instanceof CommandToggle &&
        e.code === command.key &&
        command.executed
    );
    toggleCommands.forEach((command) => {
      command.executed = false;
      command.release();
    });

    let onceCommands = this.commands.filter(
      (command) =>
        command instanceof CommandOnce &&
        e.code === command.key &&
        command.executed
    );
    onceCommands.forEach((command) => {
      command.executed = false;
    });
  }

  #onKeyDown(e) {
    if (!this.stack.includes(e.code)) {
      this.stack.push(e.code);
    }

    let toggleCommands = this.commands.filter(
      (command) =>
        command instanceof CommandToggle &&
        e.code === command.key &&
        !command.executed
    );
    toggleCommands.forEach((command) => {
      command.executed = true;
      command.execute();
    });

    let onceCommands = this.commands.filter(
      (command) =>
        command instanceof CommandOnce &&
        e.code === command.key &&
        !command.executed
    );
    onceCommands.forEach((command) => {
      command.executed = true;
      command.execute();
    });
  }

  #onTouchStart(e) {
    this.touch.x = e.changedTouches[0].screenX;
    this.touch.y = e.changedTouches[0].screenY;
  }

  #onTouchEnd(e) {
    if (
      this.touch.x !== e.changedTouches[0].screenX &&
      this.touch.y !== e.changedTouches[0].screenY
    ) {
      let angle = new Vector2(
        e.changedTouches[0].screenX,
        e.changedTouches[0].screenY
      ).sub(this.touch).rotation.angle;

      if (angle >= -Math.PI / 4 && angle <= Math.PI / 4)
        this.#onSwipe(new Vector2(1, 0));
      else if (angle > Math.PI / 4 && angle < (3 * Math.PI) / 4)
        this.#onSwipe(new Vector2(0, 1));
      else if (angle >= (3 * Math.PI) / 4 || angle <= (-3 * Math.PI) / 4)
        this.#onSwipe(new Vector2(-1, 0));
      else this.#onSwipe(new Vector2(0, -1));
    }
  }

  #onSwipe(direction) {
    let swipeCommands = this.commands.filter(
      (command) => command instanceof CommandSwipe
    );
    swipeCommands;
    swipeCommands.forEach((swipeCommand) => {
      swipeCommand.execute(direction);
    });
  }

  registerCommand(command) {
    if (
      this.commands.some(
        (existingCommand) => existingCommand.key === command.key
      )
    ) {
      console.warn(`Command conflict detected on key : ${command.key}`);
    }
    this.commands.push(command);
    return command;
  }

  unregisterCommand(command) {
    let foundIndex = this.commands.findIndex((cmd) => cmd === command);
    if (foundIndex > -1) {
      this.commands.splice(foundIndex, 1);
    }
  }

  update(deltaTime) {
    let holdCommands = this.commands.filter(
      (command) =>
        command instanceof CommandHold && this.stack.includes(command.key)
    );

    holdCommands.forEach((command) => {
      command.execute(deltaTime);
    });
  }
}

export default Controls;
