import {Device, DeviceBookQueryString, DeviceState} from "../interface/device";
import {FULL_DATE_22, FULL_DATE_7, FullFormatDate} from "../utils/date-utils";
import {AxiosResponse} from "axios";
import axios, {CommonResult, URLP} from "../config/lib-axios";
import * as qs from "qs";

export class DeviceHelper {
    public static getDeviceState(device: Device): DeviceState {
        if (device.ts.length !== 0) {
            return DeviceState.USING;
        }
        if (!device || device.state === 'close') {
            return DeviceState.CLOSED;
        }
        return DeviceState.OPEN;
    }
}

export async function bookDevice(cookie: string, queryString: DeviceBookQueryString): Promise<CommonResult> {
    const nowFullDate: FullFormatDate = FullFormatDate.now();
    const expectedFullDate: FullFormatDate = new FullFormatDate(nowFullDate.date, {hour: nowFullDate.time.hour + 8});
    const realStartDate: FullFormatDate = nowFullDate.compareTo(FULL_DATE_7) < 0 ? FULL_DATE_7 : nowFullDate;
    const realEndDate: FullFormatDate = expectedFullDate.compareTo(FULL_DATE_22) > 0 ? FULL_DATE_22 : expectedFullDate;

    queryString.start = queryString.start || realStartDate.toString({isKeepTwoDigit: true});
    queryString.end = queryString.end || realEndDate.toString({isKeepTwoDigit: true});
    const response: AxiosResponse<CommonResult> = await axios.get(`${URLP}/reserve.aspx?${qs.stringify(queryString)}`, {
        headers: {
            'Cookie': cookie,
        }
    });
    const result = response.data;
    console.log(result);
    return result;
}
