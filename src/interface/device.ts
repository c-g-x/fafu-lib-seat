import {OccupyData} from "./occupy-data";

export const YF_KIND_ID: string = '100455327';

export interface Device {
    id: string;             // combind by `${devId}_${labId}`
    title: string;          // 设备标题 | eg: YF-101
    name: string;           // the same as ${title}
    devId: string;          // 设备 Id
    devName: string;        // 设备名称 | eg: YF-101
    clsKind: string;        // 通常是 8
    kindId: string;         // 100455327
    kindName: string;       // 逸夫馆
    classId: string;        // 100455326
    className: string;      // 逸夫馆
    labName: string;        // 逸夫馆
    labId: string;          // 100519472
    roomName: string;       // 房间名称 | eg: 逸夫馆一楼
    roomId: number;         // 100520524
    buildingId: number;     // 建筑物 Id | eg: 0
    buildingName: string;   // 建筑物名称
    campus: string;         // 校区
    islong: boolean;
    allowLong: boolean;
    iskind: boolean;
    ischeck: boolean;
    devsta: number;         // 0
    runsta: number;         // 6
    state: "close" | null | string;
    freeSta: number;        // -1
    ruleId: number;         // 100455328
    rule: string;           // &nbsp;
    prop: number;           // 33554433,
    limit: number;          // 0
    earliest: number;       // 180,
    latest: number;         // 0,
    max: number;            // 480,
    min: number;            // 60,
    cancel: number;         // 31,
    maxUser: number;        // 1,
    minUser: number;        // 1,
    ext: string;            // "839,472,65,25",
    open: [
        "07:00",
        "22:00",
    ],
    openStart: string;      // "07:00"
    openEnd: string;        // "22:00"
    clsDate: any;           // null
    ts: OccupyData[];
    cls: any;
    ops: OccupyData[];
}

export enum DeviceState {
    OPEN = 'open', CLOSED = 'closed', USING = 'using'
}

export interface DeviceBookQueryString {
    'dev_id': string,
    'lab_id': string,
    'room_id': any,
    'kind_id': string,
    'type': string,
    'prop': any,
    'test_id': any,
    'resv_id': any,
    'term': any,
    'min_user': any,
    'max_user': any,
    'mb_list': any,
    'classkind': number,
    'start': string,
    'end': string,
    'memo': any,
    'act': string,
    '_nocache': string,
}
