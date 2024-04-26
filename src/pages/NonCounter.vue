<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import NonterCustomerIdentify from "@/components/nonCounter/NonterCustomerIdentify.vue";

const route = useRoute()
const isRoot = computed(() => {
    return route.name == 'nonCounterRoot'
})
const currentPath = computed(() => {
    return route.path
})


interface MenuItem {
    title: string,
    desc: string,
    path: string,
    icon: string
}

const menuItems: MenuItem[] = [
    {title: "普通交易", path: "/nonCounter/transactCommission", icon: "", desc: "进行证券交易"},
    {title: "委托撤单", path: "/nonCounter/withdraw", icon: "", desc: "进行证券交易"},
    {title: "运营业务", path: "/nonCounter/1", icon: "", desc: "进行运营业务"},
    {title: "统一账户", path: "/nonCounter/2", icon: "", desc: "进行统一账户管理"},
    {title: "账户业务", path: "/nonCounter/3", icon: "", desc: "进行账户业务"},
    {title: "公共业务", path: "/nonCounter/4", icon: "", desc: "进行证券交易"},
    {title: "资金业务", path: "/nonCounter/5", icon: "", desc: "进行证券交易"},
    {title: "股份业务", path: "/nonCounter/6", icon: "", desc: "进行证券交易"},
    {title: "合约业务", path: "/nonCounter/7", icon: "", desc: "进行证券交易"},
]
</script>

<template>
    <div class="w-full">
        <section class="w-full mt-4" aria-multiselectable="false">
            <ul class="flex flex-row flex-wrap gap-4 items-center border-b border-slate-200" role="tablist">
                <li class="flex-1" role="presentation" v-for="(item,index) in menuItems">
                    <router-link
                            :class="currentPath == item.path?
                            `tab-button-current text-white`: `tab-button-others hover:text-white`"
                            :to="item.path">
                        <span>{{ item.title }}</span>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
    <div class="h-full" v-if="!isRoot">
        <div class="p-6 bg-gray-50 rounded-lg w-full h-full">
            <router-view></router-view>
        </div>
    </div>
    <div class="md:flex h-full w-full" v-else>
        <NonterCustomerIdentify/>
    </div>
</template>

<style scoped>

</style>