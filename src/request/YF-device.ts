import {bookDevice} from "./device";
import {YF_KIND_ID} from "../interface/device";

export async function bookYFDevice(cookie: string, queryData: {
    dev_id: string,
    lab_id: string,
    expectedStartTime?: string,
    expectedEndTime?: string,
}) {
    const QUERY_STRING: any = {
        'room_id': null,
        'kind_id': YF_KIND_ID,
        'type': 'dev',
        'prop': null,
        'test_id': null,
        'resv_id': null,
        'term': null,
        'min_user': null,
        'max_user': null,
        'mb_list': null,
        'classkind': 8,
        'start': queryData.expectedStartTime,
        'end': queryData.expectedEndTime,
        'memo': null,
        'act': 'set_resv',
        '_nocache': new Date().getTime(),
        'dev_id': queryData.dev_id,
        'lab_id': queryData.lab_id,
    };
    return bookDevice(cookie, QUERY_STRING);
}
