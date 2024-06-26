interface MenuItem {
    title: string
    path: string
    subItems?: MenuItem[]
}

const menu: MenuItem[] = [
    {title: "首页", path: "/"},
    {title: "受理", path: "/accept",
        subItems: [
            {title: "受理中心", path: "/accept"},
            {title: "客户开户", path: "/accept/register"},
            {title: "机构开户", path: "/accept/1"},
            {title: "产品开户", path: "/accept/2"},
        ]
    },
    {
        title: "办理", path: "/",
        subItems: [
            {title: "业务抢单", path: "/transact/qd"},
            {title: "业务派单", path: "/transact/pd"},
            {title: "复核", path: "/transact/fh"}
        ]
    },
    {title: "非临柜", path: "/"},
    {title: "查询", path: "/"},
    {title: "管理", path: "/"},
    {title: "清算", path: "/"},
]
export default menu