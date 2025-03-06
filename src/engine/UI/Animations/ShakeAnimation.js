import UIAnimation from "../Core/UIAnimation"

class ShakeAnimation extends UIAnimation {
    loop(deltaTime, currentTime) {
        this.entity.transform.rotation.setAngle(Math.sin(currentTime / 50) / 10, true)
    }
}
export default ShakeAnimation