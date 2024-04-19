interface MenuItem {
    title: string
    path: string
    icon: string
    subItems?: MenuItem[]
}

const menu: MenuItem[] = [
    {title: "首页", path: "/", icon: ""},
    {title: "受理", path: "/accept", icon: "",},
    {title: "办理", path: "/transact", icon: ""},
    {title: "非临柜", path: "/nonCounter", icon: ""},
    {title: "查询", path: "/search", icon: ""},
    {title: "管理", path: "/manage", icon: ""},
    {title: "清算", path: "/liquidation", icon: ""},
]
export default menu