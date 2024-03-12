<script setup lang="ts">
import TopBar from './layout/TopBar.vue';
import SideBar from './layout/SideBar.vue';
import Footer from './layout/Footer.vue';
</script>

<template>
  <header>
    <Top-bar></Top-bar>
  </header>
  <aside>
    <Side-Bar></Side-Bar>
  </aside>
  <main>
    内容区域
  </main>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<style scoped>
</style>
