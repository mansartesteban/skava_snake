import ImplementError from "@/Application/Errors/ImplementError";
import Command from "./Command";

class CommandToggle extends Command {
  executed = false;

  execute() {
    throw new ImplementError("execute", "CommandToggle");
  }

  release() {
    throw new ImplementError("release", "CommandToggle");
  }
}

export default CommandToggle;
