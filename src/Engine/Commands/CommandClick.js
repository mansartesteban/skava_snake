import ImplementError from "@/Application/Errors/ImplementError";
import Command from "./Command";

class CommandClick extends Command {
  execute(...parameters) {
    throw new ImplementError("execute", "CommandClick");
  }
}

export default CommandClick;
