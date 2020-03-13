import express, {Express, Handler, NextFunction, Request, Response} from 'express';
import { resolve } from 'path';
import * as bodyParser from "body-parser";
import {ResourceBase, RouteDef} from "./resource";

export default class Server {

    public app: Express;

    constructor(private routeNamespace = '/api') {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public registerRoutes(resources: (typeof ResourceBase)[] = [], routes: RouteDef[] = []) {
        console.log(`Registering methods of single handlers`);
        routes.forEach((route: RouteDef) => this.registerRoute(route));
        resources.forEach((clazz: any) => {
            console.log(`Registering methods for '${clazz._name}'`);
            const instance = new clazz() as ResourceBase;
            instance.getRoutes().forEach((route) => {
                this.registerRoute(route);
            });
        });
    }

    private registerRoute(route: RouteDef)  {
        const path = this.routeNamespace + route.path;
        console.log(`Registering route ${route.method.toUpperCase()}\t${path}\t'${route.handler.name}'`);
        this.app.use(path, (req, res, done) => {
            // console.log('checking', path, req.path, req.url);
            if (req.method.toLowerCase() === route.method.toLowerCase() &&
                req.path === '/' || req.path === '') {
                const handler = this.routeWrapper(route.handler);
                return handler(req, res, done);
            }

            return done();
        });
    }

    private routeWrapper(handler: Handler): Handler {
        return (req: Request, res: Response, next: NextFunction) => {
            const errHandler = (err: Error) => {
                console.error(err);
                res.status(500);
                res.end(err.message);
            };
            try {
                handler(req, res, next).then((result: any) => {
                    if (!res.writableEnded) {
                        res.json(result);
                    }
                }).catch(errHandler)
            } catch (e) {
                errHandler(e);
            }
        }
    };

    public registerStaticRoute(fsPath = '../../public') {
        const path = resolve(__dirname);
        console.log(`Registering static server on '${path}'`);
        this.app.use(express.static(path));
    }

    // public compileWebpack() {
    //     console.log(`Webpack compile...`);
    //     webpack(webpackConfig).run((err: Error, stats: Stats) => {
    //         if(err) {
    //             console.error(`Webpack compile ERROR`);
    //             console.error(err);
    //         } else {
    //             console.log(`Webpack compiled Successfully`);
    //             // console.log((stats.endTime - stats.startTime) + 'ms');
    //         }
    //     })
    // }

}


