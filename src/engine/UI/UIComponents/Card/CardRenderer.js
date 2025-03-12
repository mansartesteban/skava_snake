import RoundSquare from "@/Engine/Shapes/RoundSquare";
import UIRenderer from "../../Core/UIRenderer";

class CardRenderer extends UIRenderer {
  shape = new RoundSquare();

  render(viewer) {
    this.shape.position.sub(viewer.origin);
    this.shape.draw(viewer);
  }
}

export default CardRenderer;
