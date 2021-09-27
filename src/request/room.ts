import * as qs from "qs";
import {AxiosResponse} from "axios";
import axios, {URLP} from "../config/lib-axios";
import {Device, DeviceState} from "../interface/device";
import * as _ from "lodash";
import {Room, RoomQueryString} from "../interface/room";
import {DeviceHelper} from "./device";

/** 获取房间 */
export async function getRoom(roomQueryString: RoomQueryString): Promise<Room> {
    if (!roomQueryString) {
        throw new Error('RoomQueryString 不能为 null');
    }
    const QUERY_STRING: string = qs.stringify(roomQueryString);
    const response: AxiosResponse<Room> = await axios.get(`${URLP}/device.aspx?${QUERY_STRING}`);

    return response.data;
}

/** 获取指定状态的座位列表 */
export async function getOpenDevices(room: Room, state: DeviceState): Promise<Device[]> {
    return _.filter(room.data, (device: Device) => {
        return DeviceHelper.getDeviceState(device) === state;
    });
}
