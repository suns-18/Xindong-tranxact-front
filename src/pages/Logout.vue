<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

const initComponent = async () => {
    console.log("cnm")
    await router.push("/login")
}

initComponent()
</script>

<template>

</template>

<style scoped>

</style>