import ImplementError from "@/Application/errors/ImplementError"

class Command {
    key;
    
    execute() {
        throw new ImplementError("execute", "Command")
    }
}

export default Command;