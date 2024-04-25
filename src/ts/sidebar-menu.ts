interface MenuItem {
    title: string
    path: string
    icon: string
    subItems?: MenuItem[]
}

const menu: MenuItem[] = [
    {title: "首页", path: "/", icon: "mdi mdi-home-circle"},
    {title: "受理", path: "/accept", icon: "mdi mdi-cash-register",},
    {title: "办理", path: "/transact", icon: "mdi mdi-note-text-outline"},
    {title: "非临柜", path: "/nonCounter", icon: "mdi mdi-countertop"},
    {title: "查询", path: "/search", icon: "mdi mdi-text-search-variant"},
    {title: "管理", path: "/manage", icon: "mdi mdi-account-hard-hat"},
    {title: "清算", path: "/liquidation", icon: "mdi mdi-sigma"},
]
export default menu