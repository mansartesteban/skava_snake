import CommandHold from "./commands/CommandHold";
import CommandMouseMove from "./commands/CommandMouseMove";
import CommandOnce from "./commands/CommandOnce";
import CommandToggle from "./commands/CommandToggle";

class Controls {
  stack = [];
  commands = [];
  onceCommandsExecuted = [];

  pointerLock = null;

  constructor() {
    window.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));

    // document.onpointerlockchange = (event) => {
    //   this.pointerLock = document.pointerLockElement;
    // };

    // document.body.addEventListener("click", async (e) => {
    //   e.stopPropagation();
    //   if (e.which !== 3) {
    //     await document.body.requestPointerLock({
    //       unadjustedMovement: true,
    //     });
    //   }
    // });
  }

  onMouseMove(e) {
    if (this.pointerLock) {
      let mouseMoveCommands = this.commands.filter(
        (command) => command.handler instanceof CommandMouseMove
      );

      mouseMoveCommands.forEach((command) => {
        command.handler.execute(e);
      });
    }
  }

  onKeyUp(e) {
    if (this.stack.includes(e.code)) {
      let foundIndex = this.stack.findIndex((s) => s === e.code);
      if (foundIndex > -1) {
        this.stack.splice(foundIndex, 1);
      }
    }

    let toggleCommands = this.commands.filter(
      (command) =>
        command.handler instanceof CommandToggle &&
        e.code === command.key &&
        command.handler.executed
    );
    toggleCommands.forEach((command) => {
      command.handler.executed = false;
      command.handler.release();
    });

    let onceCommands = this.commands.filter(
      (command) =>
        command.handler instanceof CommandOnce &&
        e.code === command.key &&
        command.handler.executed
    );
    onceCommands.forEach((command) => {
      command.handler.executed = false;
    });
  }

  onKeyDown(e) {
    if (!this.stack.includes(e.code)) {
      this.stack.push(e.code);
    }

    let toggleCommands = this.commands.filter(
      (command) =>
        command.handler instanceof CommandToggle &&
        e.code === command.key &&
        !command.handler.executed
    );
    toggleCommands.forEach((command) => {
      command.handler.executed = true;
      command.handler.execute();
    });

    let onceCommands = this.commands.filter(
      (command) =>
        command.handler instanceof CommandOnce &&
        e.code === command.key &&
        !command.handler.executed
    );
    onceCommands.forEach((command) => {
      command.handler.executed = true;
      command.handler.execute();
    });
  }

  registerCommand(key, handler) {
    let command = {
      key,
      handler,
    };
    if (this.commands.some((command) => command.key === key)) {
      console.warn(`Command conflict detected on key : ${key}`);
    }
    this.commands.push(command);
  }

  update(deltaTime) {
    let holdCommands = this.commands.filter(
      (command) =>
        command.handler instanceof CommandHold &&
        this.stack.includes(command.key)
    );

    holdCommands.forEach((command) => {
      command.handler.execute(deltaTime);
    });
  }
}

export default Controls;
