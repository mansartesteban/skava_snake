import ImplementError from "@/Application/Errors/ImplementError";

class Command {
  key;

  execute() {
    throw new ImplementError("execute", "Command");
  }
}

export default Command;
