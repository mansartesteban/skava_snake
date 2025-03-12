import TransformComponent from "../Components/TransformComponent";
import RGB from "../Lib/RGB";

class Img {
  #path;
  img;
  imgLoaded;

  constructor(path) {
    this.#path = path;
    this.img = new Image();
    this.imgLoaded = false;

    this.#loadImage();
  }

  #loadImage() {
    this.img.onload = () => {
      this.imgLoaded = true;
    };
    this.img.src = this.#path;
  }

  draw(viewer, transform = new TransformComponent()) {
    let ctx = viewer.ctx;
    let position = transform.position;
    let scale = transform.scale;
    let size = transform.size;
    let rotation = transform.rotation;
    if (this.imgLoaded) {
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(-rotation.angle);
      ctx.translate(-position.x, -position.y);
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = new RGB(0, 0, 0, 0.25)._toString;
      ctx.shadowBlur = 4;
      // ctx.drawImage(
      //   this.img,
      //   position.x,
      //   position.y,
      //   size.x,
      //   size.y,
      //   position.x - (size.x * scale.x) / 2,
      //   position.y - (size.y * scale.y) / 2,
      //   this.img.width * scale.x,
      //   this.img.height * scale.y
      // );
      ctx.drawImage(this.img, position.x, position.y, size.x, size.y);
      ctx.restore();
    }
  }
}

export default Img;
