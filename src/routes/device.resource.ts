import {Resource, ResourceBase, Route} from "../server/resource";
import {Request, Response} from "express";

export interface DeviceInfo {
    id: string;
    uuid: string;
    profile: string; // first release: retail / posm
}

@Resource('/device')
export default class DeviceEntryPoint extends ResourceBase {

    private devices: DeviceInfo[] = [];

    @Route('/register', 'POST')
    registerDevice(req: Request): Promise<any> {
        const device = req.body as DeviceInfo;
        this.devices.push(device);
        return Promise.resolve({message: 'registered', device, devices: this.devices});
    }

    @Route('/activity', 'POST')
    reportActivity(req: Request): Promise<any> {
        return Promise.resolve(req.body);
    }

    @Route('/check', 'GET')
    checkForNewContent(req: Request): Promise<any> {
        return Promise.resolve({
            latest: '2020-03-12'
        });
    }

    @Route('/content', 'GET')
    getLatestContentList(req: Request): Promise<any> {
        return Promise.resolve({
                "items": [
                    {
                        "id": "1",
                        "icon": "icon.png",
                        "label": "IQOS 3 Bemutató",
                        "type": "video",
                        "src": "sample.mp4"
                    },
                    {
                        "id": "2",
                        "icon": "icon.png",
                        "label": "IQOS HeatControl™",
                        "type": "image",
                        "src": "sample.jpg"
                    },
                    {
                        "id": "3",
                        "icon": "icon.png",
                        "label": "Mi az IQOS?",
                        "type": "pdf",
                        "src": "sample-4.pdf"
                    },
                    {
                        "id": "4",
                        "icon": "icon.png",
                        "label": "Összehasonlítás",
                        "type": "pdf",
                        "src": "sample.pdf"
                    },
                    {
                        "id": "5",
                        "icon": "icon.png",
                        "label": "IQOS 2.4 PLUS Kiegészítők",
                        "type": "pdf",
                        "src": "sample-1.pdf"
                    },
                    {
                        "id": "6",
                        "icon": "icon.png",
                        "label": "IQOS 3 Kiegészítők",
                        "type": "pdf",
                        "src": "sample-2.pdf"
                    },
                    {
                        "id": "7",
                        "icon": "icon.png",
                        "label": "Kiegészítők",
                        "type": "pdf",
                        "src": "sample-3.pdf"
                    },
                    {
                        "id": "8",
                        "icon": "icon.png",
                        "label": "IQOS HU",
                        "type": "link",
                        "src": "https://iqoshupos.monolith.co.il/"
                    },
                    {
                        "id": "9",
                        "icon": "icon.png",
                        "label": "PMI OPEN",
                        "type": "link",
                        "src": "https://www.pmiopen.hu"
                    },
                    {
                        "id": "10",
                        "icon": "icon.png",
                        "label": "IQOS",
                        "type": "link",
                        "src": "https://www.iqos.com"
                    }
                ]
            }
        );
    }

    @Route('/download/:path', 'GET')
    downloadContentItem(req: Request, res: Response): Promise<any> {
        // test binary send
        res.json({
            params: req.params,
            data: 'binary'
        });
        return Promise.resolve('');
    }

}
