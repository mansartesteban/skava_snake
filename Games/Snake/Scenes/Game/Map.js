import RGB from "@/Engine/Lib/RGB";
import Vector2 from "@/Engine/Lib/Vector2";
import RoundSquare from "@/Engine/Shapes/RoundSquare";
import Square from "@/Engine/Shapes/Square";

class Map {
  options = {
    size: 0,
    subdivisions: 0,
    borderSize: 8,
  }; 

  constructor(options) {
    this.options = { ...this.options, ...options };
  }

  get tileSize() {
    return this.options.size / this.options.subdivisions;
  }

  get xMax() {
    return this.options.size / 2;
  }

  get xMin() {
    return -this.options.size / 2;
  }

  get yMax() {
    return this.options.size / 2;
  }

  get yMin() {
    return -this.options.size / 2;
  }

  tiles = [];

  createTiles() {
    this.tiles.push(
      new RoundSquare(
        new Vector2(
          this.xMin - this.options.borderSize,
          this.yMin - this.options.borderSize
        ),
        new Vector2(
          this.options.size + this.options.borderSize * 2,
          this.options.size + this.options.borderSize * 2
        ),
        [20],
        new RGB(0x00, 0xa9, 0x52)
      )
    );
    this.tiles.push(
      new RoundSquare(
        new Vector2(this.xMin, this.yMin),
        new Vector2(this.options.size, this.options.size),
        [16],
        new RGB(0x00, 0xcc, 0x66)
      )
    );
    for (
      let i = -this.options.subdivisions / 2;
      i < this.options.subdivisions / 2;
      i++
    ) {
      for (
        let j = -this.options.subdivisions / 2;
        j < this.options.subdivisions / 2;
        j++
      ) {
        if ((i + j) % 2) {
          let rounded = [0];
          if (
            i === -this.options.subdivisions / 2 &&
            j === this.options.subdivisions / 2 - 1
          ) {
            rounded = [0, 0, 0, 16];
          } else if (
            j === -this.options.subdivisions / 2 &&
            i === this.options.subdivisions / 2 - 1
          ) {
            rounded = [0, 16, 0, 0];
          }
          this.tiles.push(
            new RoundSquare(
              new Vector2(i, j).multiply(this.tileSize),
              new Vector2(this.tileSize, this.tileSize),
              rounded,
              new RGB(0x00, 0xe6, 0x73)
            )
          );
        }
      }
    }
  }

  draw(ctx) {
    for (let tile of this.tiles) {
      tile.draw(ctx);
    }
  }
}

export default Map;
