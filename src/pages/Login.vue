<script setup lang="ts">
import {useRouter} from "vue-router";

/**
 * 写给前端同学
 * 有空可以看我的仓库，以前写的问卷系统有个登陆的代码，可以参考
 * 这里用户名不输入邮箱会有错误提示，好好利用一下这个机制
 */
const router = useRouter()
const doLogin = async () => {
    await router.push("/")
}
</script>

<template>
    <div class="justify-items-center w-full justify-center text-center align-middle grid pt-16">
        <div class="grid-cols-3"></div>
        <div class="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 w-96 grid-cols-3">
            <!-- Body-->
            <div class="p-6">
                <header class="mb-4 text-center">
                    <h2 class="text-2xl font-bold text-blue-700 pb-2 select-none">XAct证券业务综合服务平台</h2>
                    <h3 class="text-xl font-medium text-slate-700  select-none">登陆</h3>
                </header>
                <div class="flex flex-col space-y-8">
                    <!-- Input field -->
                    <div class="relative my-6">
                        <input type="text" placeholder="用户名"
                               class="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white
                               invalid:border-pink-500 invalid:text-pink-500
                               focus:border-blue-500 focus:outline-none
                               invalid:focus:border-pink-500
                               disabled:cursor-not-allowed
                               disabled:bg-slate-50 disabled:text-slate-400"/>
                        <label
                               class="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                            用户名
                        </label>
                        <small class="absolute flex justify-between w-full px-4 py-1 text-xs transition
                        text-slate-400 peer-invalid:text-pink-500">
                            <span>用户名不能为空</span>
                        </small>
                    </div>
                    <!-- Input field -->
                    <div class="relative my-6">
                        <input id="id-b13" type="password" name="id-b13" placeholder="密码"
                               class="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"/>
                        <label for="id-b13"
                               class="absolute left-2 -top-2 z-[1] px-2 text-xs
                               text-slate-400 transition-all before:absolute
                               before:top-0 before:left-0 before:z-[-1] before:block
                               before:h-full before:w-full before:bg-white
                               before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                            密码
                        </label>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="absolute top-2.5 right-4 h-5 w-5 stroke-slate-400 cursor-pointer peer-disabled:cursor-not-allowed"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                        </svg>
                        <small class="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                            <span>请输入密码</span>
                        </small>
                    </div>
                </div>
            </div>
            <!-- Action base sized basic button -->
            <div class="flex justify-end p-6 ">
                <button class="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium
                tracking-wide text-white transition duration-300 rounded
                focus-visible:outline-none whitespace-nowrap bg-blue-500
                hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed
                disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                        @click="doLogin">
                    <span>登陆</span>
                </button>
            </div>
        </div>
        <div class="grid-cols-3"></div>
    </div>
</template>

<style scoped>

</style>