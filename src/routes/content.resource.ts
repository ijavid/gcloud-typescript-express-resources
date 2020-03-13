import {Resource, ResourceBase, Route} from "../server/resource";
import {Request, Response} from "express";

@Resource('/content')
export default class ContentResource extends ResourceBase {



    @Route('', 'PUT')
    createContent(req: Request, res: Response): Promise<any> {
        return Promise.resolve('createContent');
    }

    @Route('/upload', 'POST')
    uploadContentBinary(req: Request, res: Response): Promise<any> {
        return Promise.resolve('upload');
    }

    @Route('/download/:path', 'GET')
    downloadContentBinary(req: Request, res: Response): Promise<any> {
        return Promise.resolve('download');
    }

}
