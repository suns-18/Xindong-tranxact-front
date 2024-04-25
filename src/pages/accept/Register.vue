<script setup lang="ts">
import {Component, computed, defineAsyncComponent, ref} from "vue";
import pinia, {useCustomerStore} from "@/ts/pinia.ts";
import CustomerBasicInfo from "@/components/accept/CustomerBasicInfo.vue";
import CustomerBasicSupplement from "@/components/accept/CustomerBasicSupplement.vue";
import CustomerRelatedInfo from "@/components/accept/CustomerRelatedInfo.vue";
import CustomerAppropriateInfo from "@/components/accept/CustomerAppropriateInfo.vue";
import CustomerQuestionaire from "@/components/accept/CustomerQuestionaire.vue";
import CustomerAccountInfo from "@/components/accept/CustomerAccountInfo.vue";
import CustomerImage from "@/components/accept/CustomerImage.vue";

interface Routine {
    title: string
    step: number
}

const routine = ref<Routine[]>([
    {step: 1, title: "基本信息采集"},
    {step: 2, title: "基本信息补充"},
    {step: 3, title: "关联信息采集"},
    {step: 4, title: "适当性信息"},
    {step: 5, title: "风险测评"},
    {step: 6, title: "账户信息"},
    {step: 7, title: "影像采集"},
])

const customerStore = useCustomerStore(pinia)
const currentRoutine = computed(() => customerStore.getCurrentRoutine)

const routineBack = () => {
    if (currentRoutine.value == 1) return

    customerStore.routineBack()
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

</script>

<template>
    <div class="m-4">
        <div id="timeline" class=" hidden lg:flex gap-10 items-center justify-items-center align-middle justify-center">
            <ul class="timeline items-center justify-items-center">
                <template v-for="(item,index) in routine">
                    <li>
                        <hr :class="currentRoutine>(item.step)?`bg-primary`:`bg-gray-300`"/>
                        <div class="timeline-start timeline-box">{{ item.step }}. {{ item.title }}</div>
                        <div class="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 :class="currentRoutine>(item.step)?`text-primary w-5 h-5 `:`text-gray-300 w-5 h-5 `">
                                <path fill-rule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75
                                       0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06
                                       1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <hr :class="currentRoutine>(item.step)?`bg-primary`:`bg-gray-300`"/>
                    </li>
                </template>
            </ul>
            <button class="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white
            transition duration-300 rounded focus-visible:outline-none
            whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700
            disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                    @click="routineBack"
            >
                <span>上一步</span>
            </button>
        </div>
        <div id="switchStep" class="w-full flex md:hidden lg:hidden items-center justify-center justify-items-center align-middle">
            <button class="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                <span>上一步</span>
            </button>
            <div class="flex-grow items-center justify-center justify-items-center align-middle">
                <h5 class="text-center">
                    当前是在第{{ currentRoutine }}步：{{ routine[currentRoutine-1].title }}</h5>
            </div>
        </div>
        <div id="steps" class="w-full">
            <div id="s1" class="w-full" v-if="currentRoutine==1">
                <CustomerBasicInfo/>
            </div>
            <div id="s2" class="w-full" v-if="currentRoutine==2">
                <CustomerBasicSupplement/>
            </div>
            <div id="s3" class="w-full" v-if="currentRoutine==3">
                <CustomerRelatedInfo/>
            </div>
            <div id="s4" class="w-full" v-if="currentRoutine==4">
                <CustomerAppropriateInfo/>
            </div>
            <div id="s5" class="w-full" v-if="currentRoutine==5">
                <CustomerQuestionaire/>
            </div>
            <div id="s6" class="w-full" v-if="currentRoutine==6">
                <CustomerAccountInfo/>
            </div>
            <div id="s7" class="w-full" v-if="currentRoutine==7">
                <CustomerImage/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>