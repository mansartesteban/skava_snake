import ImplementError from "@/Application/errors/ImplementError";
import Command from "./Command";

class CommandOnce extends Command {
  executed = false;

  execute() {
    throw new ImplementError("execute", "CommandOnce");
  }
}

export default CommandOnce;
