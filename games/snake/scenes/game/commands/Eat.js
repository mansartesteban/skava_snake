import CommandOnce from "@/engine/commands/CommandOnce"

class Eat extends CommandOnce {
  execute() {
    this.entity.food += 1
  }
}

export default Eat;
