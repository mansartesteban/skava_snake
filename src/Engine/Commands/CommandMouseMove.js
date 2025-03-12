import ImplementError from "@/Application/Errors/ImplementError";
import Command from "./Command";

class CommandMouseMove extends Command {
  execute(...parameters) {
    throw new ImplementError("execute", "CommandMouseMove");
  }
}

export default CommandMouseMove;
