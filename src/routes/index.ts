import {RouteDef} from "../server/resource";
import DeviceEntryPoint from "./device.resource";

// single handler
export const singleRouteDefs: Array<RouteDef> = [
    {
        method: 'get',
        path: '/heartbeat',
        handler: (req, res) => {
            return Promise.resolve('ok');
        }
    }
];

// decorator based handlers
export const resources = [
    DeviceEntryPoint
];
