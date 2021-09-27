import {User} from "../interface/user";
import * as qs from "qs";
import axios, {URL} from "../config/lib-axios";
import {AxiosResponse} from "axios";

export async function getCookie(): Promise<string> {
    const response = await axios.get(`${URL}/clientweb/m/ic2/Default.aspx`);

    const cookies: string[] = response.headers['set-cookie'];
    const SESSION_PATTERN: RegExp = /^(ASP\.NET_SessionId=.*?);.*/;
    const D_ID_PATTERN: RegExp = /^(_d_id.*?);.*/;

    // 后续请求需要 sessionId 和 dId 保持同一个会话状态
    let sessionId = "";
    let dId = "";
    for (const cookie of cookies) {
        sessionId = cookie.match(SESSION_PATTERN)?.[1] || sessionId;
        dId = cookie.match(D_ID_PATTERN)?.[1] || dId;
    }

    return `${sessionId}; ${dId}`;
}

export async function login(user: User) {
    const COOKIE: string = await getCookie();
    const QUERY_STRING: string = qs.stringify({
        act: 'login',
        id: user.id,
        pwd: user.password,
        role: 512,
        aliuserid: '',
        schoolcode: '',
        xuserid: '',
        _nocache: Date.now(),
    });

    const response: AxiosResponse = await axios.get(`${URL}/ClientWeb/pro/ajax/login.aspx?${QUERY_STRING}`, {
        headers: {
            'Cookie': COOKIE,
        },
    });

    console.log(`登录成功：${response.config.url}`);

    return COOKIE;
}
