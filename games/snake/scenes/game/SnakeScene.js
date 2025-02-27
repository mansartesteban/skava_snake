import Scene from "@/engine/Scene"
import Snake from "./Snake"
import SnakeRender from "./SnakeRender"
import Controls from "@/engine/Controls"
import MoveUp from "./commands/MoveUp"
import MoveDown from "./commands/MoveDown"
import MoveLeft from "./commands/MoveLeft"
import MoveRight from "./commands/MoveRight"

class SnakeScene extends Scene {

    snake

    setup() {
        this.snake = new Snake(new SnakeRender())
        this.add(this.snake)


        this.controls = new Controls()
        this.controls.registerCommand("KeyW", new MoveUp(this.snake), Controls.COMMAND_TYPE.HOLD)
        this.controls.registerCommand("KeyA", new MoveLeft(this.snake), Controls.COMMAND_TYPE.HOLD)
        this.controls.registerCommand("KeyS", new MoveDown(this.snake), Controls.COMMAND_TYPE.HOLD)
        this.controls.registerCommand("KeyD", new MoveRight(this.snake), Controls.COMMAND_TYPE.HOLD)
    }
    
    loop(delaTime) {
        this.controls.update(delaTime)
        // console.log("loop scene", this.snake)
    }
}

export default SnakeScene