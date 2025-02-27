import ImplementError from "@/application/errors/ImplementError"

class Viewer {
  options;

  refresh() {

  }
  render() {
    throw new ImplementError("render", "Viewer");
  }
}

export default Viewer;
