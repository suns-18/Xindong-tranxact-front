<script setup lang="ts">
import sidebarMenu from "@/ts/sidebar-menu.ts";
</script>

<template>
    <aside
           class="top-0 bottom-0 left-0 flex flex-col transition-transform h-full
           -translate-x-full bg-white border-r w-full sm:translate-x-0 border-r-slate-200">
        <nav aria-label="side navigation" class="flex-1 overflow-auto divide-y divide-slate-100">
            <div>
                <ul class="flex flex-col flex-1 gap-1 py-3">
                    <li class="px-3 cursor-pointer select-none" v-for="(item) in sidebarMenu">
                        <router-link :to="item.path"
                                     class="flex items-center gap-3 p-3 transition-colors rounded
                                     text-slate-700 hover:text-gray-100 focus:text-gray-100
                                      hover:bg-blue-400 focus:bg-blue-400
                                      aria-[current=page]:text-cyan-50 aria-[current=page]:bg-blue-400 ">
                            <div class="flex items-center self-center text-2xl">
                                <span :class="item.icon" />
                            </div>
                            <div class="flex flex-col items-start justify-center
                            flex-1 w-full gap-0 overflow-hidden text-base truncate">
                                {{ item.title }}
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <footer class="p-3 border-t border-slate-200">
            <router-link to="/logout"
                         class="flex items-center gap-3 p-3 transition-colors rounded text-slate-900
                         hover:bg-blue-600 hover:text-gray-100 cursor-pointer select-none">
                <div class="flex items-center self-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6" aria-label="Dashboard icon" role="graphics-symbol">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="flex flex-col items-start justify-center
                flex-1 w-full gap-0 overflow-hidden text-base font-medium truncate">
                    退出登录
                </div>
            </router-link>
        </footer>
    </aside>

</template>

<style scoped>
</style>
