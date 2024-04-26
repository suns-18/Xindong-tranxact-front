<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import CustomerIdentify from "@/components/accept/CustomerIdentify.vue";

const route = useRoute()
const isRoot = computed(() => {
    return route.name == 'acceptRoot'
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
    {title: "客户开户", path: "/accept/register", icon: "", desc: "为新客户创建、登记账户"},
    {title: "机构开户", path: "/accept/1", icon: "", desc: "为新机构创建、登记账户"},
    {title: "产品开户", path: "/accept/2", icon: "", desc: "为新产品创建、登记账户"},
]
</script>

<template>
    <div class="w-full">
        <section class="w-full mt-4" aria-multiselectable="false">
            <ul class="flex flex-row gap-4 items-center border-b border-slate-200" role="tablist">
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
        <CustomerIdentify></CustomerIdentify>
    </div>
</template>

<style scoped>
</style>