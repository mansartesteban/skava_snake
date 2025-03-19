// Engine imports
import { Application } from "skava-engine/Core";
import "skava-engine/style.css";

// Project imports
import Snake from "./index";

Application.start().then(() => Application.loadProject(Snake));
