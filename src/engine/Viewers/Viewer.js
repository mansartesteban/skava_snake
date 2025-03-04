import ImplementError from "@/Application/errors/ImplementError"

class Viewer {
  options;

  refresh() {

  }
  render() {
    throw new ImplementError("render", "Viewer");
  }
}

export default Viewer;
