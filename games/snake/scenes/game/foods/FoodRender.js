import Render2DComponent from "@/Engine/Components/Render2dComponent";
import Vector2 from "@/Engine/Lib/Vector2";
import Img from "@/Engine/Shapes/Img";

class FoodRender extends Render2DComponent {
  draw;

  constructor(...options) {
    super(...options);

    // this.options.size -= 1;
    // this.draw = new Circle(
    //   new Vector2(),
    //   10,
    //   this.options.color
    // );

    // this.width = 100
    // this.height = 100

    this.draw = new Img("/fruit-basic.png");
  }

  setup() {}

  render(viewer) {
    // this.draw.position.copy(this.entity.transform.position);
    let transform = this.entity.transform;
    this.entity.transform.size = new Vector2(
      this.entity.scene.map.tileSize,
      this.entity.scene.map.tileSize
    );
    transform.scale = new Vector2(
      1 / (this.draw.img.width / this.entity.scene.map.tileSize) / 1.5,
      1 / (this.draw.img.height / this.entity.scene.map.tileSize) / 1.5
    );
    // console.log("render pomme", transform);
    this.draw.draw(viewer, transform);
  }
}

export default FoodRender;
