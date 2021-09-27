import {ExpectedDevice, showDevices, User} from "./interface/user";
import Koa from 'koa';
import Router from 'koa-router'
import {getYFRoom} from "./request/YF-room";
import {Room} from "./interface/room";
import _ from "lodash";
import {Device, DeviceState} from "./interface/device";
import {DeviceHelper} from "./request/device";
import {getCookie, login} from "./request/user";
import {bookYFDevice} from "./request/YF-device";
import {CommonResult} from "./config/lib-axios";

let users: User[] = [
    {
        id: '3186016025',
        password: 'cgs7245332',
    },
    // {
    //     id: '3186016028',
    //     password: 'hmj520106',
    // }
];
const user: User = users[0];

const app: Koa = new Koa();
const router: Router = new Router();

let mapDeviceState: Map<string, DeviceState> = new Map([
    ['open', DeviceState.OPEN],
    ['closed', DeviceState.CLOSED],
    ['using', DeviceState.USING],
]);

const expectedDevices: ExpectedDevice[] = [
    {
        "title": "YF-635",
        "devId": "101648002",
        "labId": "100519472"
    },
    {
        "title": "YF-435",
        "devId": "100523145",
        "labId": "100519472"
    },
    {
        "title": "YF-433",
        "devId": "100523143",
        "labId": "100519472"
    },
    {
        "title": "YF-417",
        "devId": "100523127",
        "labId": "100519472"
    },
    {
        "title": "YF-419",
        "devId": "100523129",
        "labId": "100519472"
    },
    {
        "title": "YF-517",
        "devId": "100523167",
        "labId": "100519472"
    },
    {
        "title": "YF-519",
        "devId": "100523169",
        "labId": "100519472"
    },
    {
        "title": "YF-617",
        "devId": "100523203",
        "labId": "100519472"
    },
    {
        "title": "YF-619",
        "devId": "100523205",
        "labId": "100519472"
    },
    {
        "title": "YF-335",
        "devId": "100523101",
        "labId": "100519472"
    },
    {
        "title": "YF-333",
        "devId": "100523099",
        "labId": "100519472"
    },
    {
        "title": "YF-303",
        "devId": "100523069",
        "labId": "100519472"
    },
    {
        "title": "YF-301",
        "devId": "100523067",
        "labId": "100519472"
    },
    {
        "title": "YF-139",
        "devId": "100523017",
        "labId": "100519472"
    },
    {
        "title": "YF-137",
        "devId": "100523015",
        "labId": "100519472"
    },
    {
        "title": "YF-135",
        "devId": "100523013",
        "labId": "100519472"
    },
    {
        "title": "YF-127",
        "devId": "100523005",
        "labId": "100519472"
    },
    {
        "title": "YF-125",
        "devId": "100523003",
        "labId": "100519472"
    },
    {
        "title": "YF-123",
        "devId": "100523001",
        "labId": "100519472"
    },
    {
        "title": "YF-133",
        "devId": "100523011",
        "labId": "100519472"
    },
    {
        "title": "YF-107",
        "devId": "100522985",
        "labId": "100519472"
    },
    {
        "title": "YF-105",
        "devId": "100522983",
        "labId": "100519472"
    },
    {
        "title": "YF-103",
        "devId": "100522981",
        "labId": "100519472"
    },
    {
        "title": "YF-101",
        "devId": "100522979",
        "labId": "100519472"
    },
    {
        "title": "YF-401",
        "devId": "100523111",
        "labId": "100519472"
    },
    {
        "title": "YF-403",
        "devId": "100523113",
        "labId": "100519472"
    }
]
// 获取逸夫所有设备
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
app.listen(3000);
console.log('启动成功!!')
