import RGB from "../Lib/RGB"
import Vector2 from "../Lib/Vector2"

const defaultsAttributes = {
  strokeStyle: "#000",
  lineWidth: "1",
  fillStyle: "#000",
};
const defaultsMethods = {
  setLineDash: [],
};

class Draw {
  static draw(viewer, callback) {
    let ctx = viewer.ctx;
    ctx.beginPath();
    let toReset = callback();
    ctx.closePath();

    if (toReset) {
      Draw.reset(ctx, toReset);
    }
  }

  static strokeRect(
    ctx,
    x,
    y,
    w,
    h,
    c = RGB.Green
  ) {
    let p = new Vector2(x, y);
    let thickness = 1;
    ctx.fillStyle = c._toString || "#ff0000";
    ctx.fillRect(p.x, p.y, w, h);
    ctx.fillStyle = "#000000";
    ctx.fillRect(
      p.x + thickness,
      p.y + thickness,
      w - thickness * 2,
      h - thickness * 2
    );
  }

  static reset(ctx, properties = []) {
    if (properties.length === 0) {
      properties = Object.keys(defaultsAttributes).concat(
        Object.keys(defaultsMethods)
      );
    }

    properties.forEach((property) => {
      if (Object.keys(defaultsAttributes).indexOf(property) !== -1) {
        switch (property) {
          case "fillStyle":
            ctx.fillStyle = defaultsAttributes.fillStyle;
            break;
          case "lineWidth":
            ctx.lineWidth = defaultsAttributes.lineWidth;
            break;
          case "strokeStyle":
            ctx.strokeStyle = defaultsAttributes.strokeStyle;
            break;
        }
      } else if (Object.keys(defaultsMethods).indexOf(property) !== -1) {
        switch (property) {
          case "setLineDash":
            ctx.setLineDash(defaultsMethods.setLineDash);
            break;
        }
      }
    });
  }
}
export default Draw;
