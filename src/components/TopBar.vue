<script setup lang="ts">
import navbarMenu from "@/ts/topbar-menu.ts";
import DropdownMenu from "@/components/DropdownMenu.vue";
</script>

<template>
    <div class="navbar font-sans bg-blue-400 text-white shadow-lg">

        <div class="navbar-start hidden md:flex lg:flex sm:flex">
            <DropdownMenu />
            <a class="bg-ghost lg:text-xl sm:text-xl md:text-xl text-lg
            text-center justify-items-center w-full hidden lg:flex
      font-sans font-bold cursor-default select-none lg:px-16">信东XAct金融交易平台</a>
        </div>
        <div class="navbar-start flex md:hidden lg:hidden sm:hidden">
            <DropdownMenu />
        </div>
        <div class="navbar-center flex sm:flex lg:hidden md:flex min-w-56">
            <a class="bg-ghost lg:text-xl sm:text-xl md:text-xl text-lg
            text-center justify-items-center w-full
      font-sans font-bold cursor-default select-none lg:px-16">信东XAct金融交易平台</a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1 w-full">
                <li v-for="(item, index) in navbarMenu">
                    <details v-if="item.subItems">
                        <summary class="font-sans">{{ item.title }}</summary>
                        <ul class="p-2 bg-blue-600 w-full">
                            <li v-for="(subItem) in item.subItems">
                                <router-link class="visited:text-white"
                                             :to="subItem.path">
                                    {{ subItem.title }}
                                </router-link>
                            </li>
                        </ul>
                    </details>
                    <router-link :to="item.path" v-else class="font-sans visited:text-white">
                        {{ item.title }}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <div class="dropdown dropdown-end text-end align-middle justify-items-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-blue-700">
                    <li>
                        <router-link to="/logout" class="visited:text-white">退出登录</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
