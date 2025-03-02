import ImplementError from "@errors/ImplementError";
import Command from "./Command";

class CommandHold extends Command {
  execute() {
    throw new ImplementError("execute", "CommandHold");
  }
}

export default CommandHold;
