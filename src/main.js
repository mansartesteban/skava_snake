// Engine imports
import { Application } from "skava-engine/Core";

// Project imports
import Snake from "./index";

Application.start().then(() => Application.loadProject(Snake));
