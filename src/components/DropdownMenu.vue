<script setup lang="ts">

import navbarMenu from "@/ts/topbar-menu.ts";
</script>

<template>
    <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content
        z-[1] shadow rounded-box
        bg-blue-500
        w-96">
            <li v-for="(item,index) in navbarMenu">
                <router-link :to="item.path" class="visited:text-white text-lg">
		                {{ item.title }}
                </router-link>
                <ul v-if="item.subItems" class="p-2">
                    <li v-for="subItem in item.subItems">
                        <router-link :to="subItem.path" class="visited:text-white text-lg">
                            {{ subItem.title }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>