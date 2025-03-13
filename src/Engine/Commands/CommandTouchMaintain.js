import ImplementError from "@/Application/Errors/ImplementError";
import Command from "./Command";

class CommandTouchMaintain extends Command {
  started = false;

  release(...parameters) {
    throw new ImplementError("release", "CommandTouchMaintain");
  }

  execute(...parameters) {
    throw new ImplementError("execute", "CommandTouchMaintain");
  }
}

export default CommandTouchMaintain;
