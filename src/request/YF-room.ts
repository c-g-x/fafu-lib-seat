import {FormatDate} from "../utils/date-utils";
import {Room, ROOM_ID, RoomQueryString} from "../interface/room";
import {Device, DeviceState} from "../interface/device";
import {getOpenDevices, getRoom} from "./room";

/** 获取逸夫的房间 */
export async function getYFRoom(): Promise<Room> {
    const NOW_DATE: FormatDate = FormatDate.today();
    const YFQueryString: RoomQueryString = {
        byType: 'devcls',
        classkind: 8,
        display: 'fp',
        md: 'd',
        room_id: ROOM_ID,
        purpose: null,
        selectOpenAty: null,
        cld_name: 'default',
        date: NOW_DATE.toString(),
        fr_start: '7:00',
        fr_end: '22:00',
        act: 'get_rsv_sta',
        '_': new Date().getTime(),
    }
    const room: Room = await getRoom(YFQueryString);

    return room;
}

/** 获取逸夫空座位列表 */
export async function getYFOpenDevices(): Promise<Device[]> {
    return getOpenDevices(await getYFRoom(), DeviceState.OPEN);
}
