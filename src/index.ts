import {singleRouteDefs, resources} from "./routes";

// express based routing
import Server from "./server/server";
const server = new Server('/api');
server.registerRoutes(resources, singleRouteDefs);

// export
export const api = server.app;
