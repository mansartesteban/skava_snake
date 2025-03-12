import ImplementError from "@/Application/Errors/ImplementError";

class Viewer {
  options;

  refresh() {}
  render() {
    throw new ImplementError("render", "Viewer");
  }
}

export default Viewer;
