interface MenuItem {
    title: string
    path: string
    icon: string
    subItems?: MenuItem[]
}

const menu: MenuItem[] = [
    {
        title: "首页", path: "/", icon: ""
    }, {
        title: "业务办理", path: "/", icon: "",
        subItems: [
            {
                title: "业务1", path: "/", icon: ""
            }
        ]
    }, {
        title: "首页", path: "/", icon: ""
    }, {
        title: "首页", path: "/", icon: ""
    }, {
        title: "首页", path: "/", icon: ""
    },
]
export default menu