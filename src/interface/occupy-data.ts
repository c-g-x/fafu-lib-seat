export interface OccupyData {
    id: any;                // null
    start: string;          // 2021-09-22 11:09
    end: string;            // 2021-09-22 19:09
    /**
     * 占座情况
     * "doing"  表示有人
     *  null    表示没开放
     * "open"   表示可以占座
     */
    state: "doing" | "open" | null;
    name: any;
    title: string;          // 加密后的用户名
    owner: string;          // 占座的所有者
    accno: string;          // account number，每个用户独立的用户号
    member: string;         // 占座的组成员(理论上应该是 [] 才对)
    limit: any;
    occupy: boolean;
}
