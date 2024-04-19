<script setup lang="ts">

import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
    <header>
        <Top-bar></Top-bar>
    </header>
    <main class="grid lg:grid-cols-12">
        <div class="lg:block lg:col-span-2 md:block md:col-span-1 sm:hidden xs:hidden hidden">
            <Side-Bar></Side-Bar>
        </div>
        <div class="p-2 lg:col-span-10 md:col-span-11">
            <router-view></router-view>
        </div>
    </main>
    <div>
        <Footer></Footer>
    </div>
</template>

<style scoped>

</style>