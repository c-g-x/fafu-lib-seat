import axios, {AxiosProxyConfig} from "axios";

const PROXY: AxiosProxyConfig = {
    host: '127.0.0.1',
    port: 8889,
}

    export const URL: string = 'http://libic.fafu.edu.cn';
export const URLP: string = 'http://libic.fafu.edu.cn/ClientWeb/pro/ajax';

// config the proxy of fiddler(otherwise cannot watch the request)
axios.defaults.proxy = PROXY;
axios.defaults.headers = {
    'Content-type': 'application/json; charset=UTF-8',
    'User-Agent': 'Mozilla/5.0 (Linux; U; Android 4.1.2; zh-cn; GT-I9300 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 MicroMessenger/5.2.380',
};

export interface CommonResult {
    ret: number,
    act: string,
    msg: string,
    data: any,
    ext: any,
}

export default axios;
