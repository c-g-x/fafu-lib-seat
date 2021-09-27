import {Device} from "./device";

export const ROOM_ID: string = '100520524';

/**
 * 图书馆每层楼都有房间
 */
export interface Room {
    /**
     * 返回值 (return)
     */
    ret: number; // such as 1

    /**
     * 操作命令 (action)
     */
    act: string;

    msg: string; // such as "ok"
    ext: any;    // maybe is null
    data: Device[];
}

/**
 * 查询房间的参数
 */
export interface RoomQueryString {
    byType: string;
    classkind: number;
    display: string;
    md: string;
    room_id: string;
    purpose: any;
    selectOpenAty: any;
    cld_name: string;
    date: string;
    fr_start: string;
    fr_end: string;
    act: string;
    '_': number;
}
