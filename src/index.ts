import {ExpectedDevice, Server, showDevices, User} from "./interface/user";
import Koa from 'koa';
import Router from 'koa-router'
import {getYFRoom} from "./request/YF-room";
import {Room} from "./interface/room";
import _ from "lodash";
import {Device, DeviceState} from "./interface/device";
import {DeviceHelper} from "./request/device";
import {login} from "./request/user";
import {bookYFDevice} from "./request/YF-device";
import {CommonResult} from "./config/lib-axios";
import * as config from '../app-config.json';

const users: User[] = config.users;
const server: Server = config.server;
const expectedDevices: ExpectedDevice[] = config.expectedDevices;

const user: User = users[0];

const app: Koa = new Koa();
const router: Router = new Router();

let mapDeviceState: Map<string, DeviceState> = new Map([
    ['open', DeviceState.OPEN],
    ['closed', DeviceState.CLOSED],
    ['using', DeviceState.USING],
]);

router.get(['/yf/devices/:status', '/yf/devices'], async (ctx) => {
    const room: Room = await getYFRoom();

    if (ctx.params.status) {
        const status: DeviceState = mapDeviceState.get(ctx.params.status) || DeviceState.OPEN;
        room.data = _.filter(room.data, (device: Device) => {
            return DeviceHelper.getDeviceState(device) === status;
        });
    }

    let displays: any[] = showDevices(room.data);
    ctx.response.body = JSON.stringify(displays);
});

// 获取所有期望的设备
router.get('/expect/yf/devices', async (ctx) => {
    const room: Room = await getYFRoom();

    room.data = _.filter(room.data, (device: Device) => DeviceHelper.getDeviceState(device) === DeviceState.OPEN);
    const map: Map<string, Device> = new Map();
    _.forEach(room.data, (device: Device) => {
        map.set(device.title, device);
    });

    let list: Device[] = [];
    for (const expectedDevice of expectedDevices) {
        if (map.has(expectedDevice.title)) {
            list.push(map.get(expectedDevice.title));
        }
    }

    ctx.response.body = JSON.stringify(showDevices(list));
});

let bookDeviceInterval: NodeJS.Timer;
router.get('/book/expect/devices', (async (ctx) => {
    if (bookDeviceInterval != null) {
        clearInterval(bookDeviceInterval);
        bookDeviceInterval = null;
    }

    let tmp: Date = new Date();
    const begin: number = tmp.setHours(4, 1, 1);
    const end: number = tmp.setHours(4, 5, 5);
    // const begin: number = tmp.setHours(15, 40, 0);
    // const end: number = tmp.setHours(15, 45, 0);
    bookDeviceInterval = setInterval(async () => {
        const now = Date.now();
        if (begin < now && now < end) {
            const cookie: string = await login(user);
            for (const exp of expectedDevices) {
                bookYFDevice(cookie, {
                    dev_id: exp.devId,
                    lab_id: exp.labId,
                }).then((resp: CommonResult) => {
                    console.log(resp);
                    if (resp.ret === 1) {
                        clearInterval(bookDeviceInterval);
                    }
                });
            }
        }
    }, 10000);

    ctx.response.body = '开启定时自动抢座';
}));

router.get('/', async (ctx) => {
    ctx.response.body = 'Hello FAFUer!';
})

app.use(router.routes());
app.listen(server.port, server.host);
console.log('启动成功!!!');
