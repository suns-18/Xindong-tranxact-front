<script setup lang="ts">
import navbarMenu from "@/ts/topbar-menu.ts";
</script>

<template>
    <div class="navbar font-sans bg-blue-400 text-white shadow-lg ">
        <div class="navbar-start text-center justify-items-center lg:flex-auto flex-1">
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
                        <router-link :to="item.path" class="visited:text-white">{{ item.title }}</router-link>
                        <ul v-if="item.subItems" class="p-2">
                            <li v-for="subItem in item.subItems">
                                <router-link :to="subItem.path" class="visited:text-white">
                                    {{ subItem.title }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <a class="bg-ghost lg:text-xl sm:text-xl md:text-xl text-lg
            text-center justify-items-center
      font-sans font-bold cursor-default select-none lg:px-16">XAct信东金融交易平台</a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li v-for="(item, index) in navbarMenu">
                    <details v-if="item.subItems">
                        <summary class="font-sans">{{ item.title }}</summary>
                        <ul class="p-2 bg-blue-600">
                            <li v-for="(subItem) in item.subItems">
                                <router-link class="visited:text-white" :to="subItem.path">{{ subItem.title }}</router-link>
                            </li>
                        </ul>
                    </details>
                    <router-link :to="item.path" v-else class="font-sans visited:text-white">{{ item.title }}</router-link>
                </li>
            </ul>
        </div>
        <div class="navbar-end flex-none sm:flex-none lg:flex-auto">
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
    </div><!--
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Item 1</a></li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn">Button</a>
    </div>
  </div>-->
</template>

<style scoped></style>
