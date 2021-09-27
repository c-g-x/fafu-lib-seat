import _ from "lodash";
import {Device} from "./device";
import {OccupyData} from "./occupy-data";

export interface User {
    id: string,
    password: string,
}

export interface ExpectedDevice {
    title: string,
    devId?: string,
    labId?: string,
}

export function showDevices(devices: Device[]): any[] {
    return _.map(devices, (device: Device) => {
        return {
            'title': device.title,
            'devId': device.devId,
            'labId': device.labId,
            'ts': !device.ts || _.map(device.ts, (occupy: OccupyData) => {
                return {
                    'start': occupy.start,
                    'end': occupy.end,
                    'state': occupy.state,
                    'owner': occupy.owner,
                }
            }),
        };
    });
}
