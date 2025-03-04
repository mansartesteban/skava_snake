import CommandClick from "./Commands/CommandClick";
import CommandHold from "./Commands/CommandHold";
import CommandMouseMove from "./Commands/CommandMouseMove";
import CommandOnce from "./Commands/CommandOnce";
import CommandToggle from "./Commands/CommandToggle";
import Vector2 from "./Lib/Vector2";
import OnClick from "./UI/Events/OnClick";

class Controls {
  stack = [];
  commands = [];
  onceCommandsExecuted = [];

  pointerLock = null;

  mouse = new Vector2();

  constructor(pointerLock = false) {
    window.addEventListener("keyup", this.#onKeyUp.bind(this));
    window.addEventListener("keydown", this.#onKeyDown.bind(this));
    window.addEventListener("mousemove", this.#onMouseMove.bind(this));
    window.addEventListener("click", this.#onClick.bind(this));

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

  registerCommand(command) {
    if (
      this.commands.some(
        (existingCommand) => existingCommand.key === command.key
      )
    ) {
      console.warn(`Command conflict detected on key : ${command.key}`);
    }
    this.commands.push(command);
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
