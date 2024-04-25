<script setup lang="ts">
import {useCustomerStore} from "@/ts/store/customer-store.ts";
import pinia from "@/ts/pinia.ts";
import {ID_TYPE} from "@/ts/model/customer.ts";

const customerStore = useCustomerStore(pinia)

const okRelatedInfo = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    customerStore.routineTo(4)
}
</script>

<template>
    <div class="w-full">
        <div id="notification"></div>
        <div id="section1" class="w-full">
            <div class="section-title">
                实际控制人信息
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        与本人关系
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0Z - 与本人关系</option>
                    </select>
                </div>
                <h5 class="text-orange-400">
                    温馨提示：客户不是“无劳动收入的未成年人”或“年长者”，实际控制人必须为“本人”</h5>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 justify-between">
                    <label class="flex items-center">
                        客户姓名
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.customerName"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        证件类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0{{ customerStore.getCustomer.idType }} -
                            {{ ID_TYPE[customerStore.getCustomer.idType] }}
                        </option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center">
                    <label class="gap-2">
                        证件号码
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.idNumber"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        证件到期
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="20290810"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        联系电话
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="1376666"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        邮箱
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           value="1376666@dingzhen.com"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        国籍 / 地区
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>CHN - 中华人民共和国</option>
                        <option>HK, CHN - 中国香港</option>
                        <option>MC, CHN - 中国澳门</option>
                        <option>TW, CHN - 中国台湾</option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        职业类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>58 - 学生</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        邮政编码
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="137666"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        性别
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0 - 男性</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        出生日期
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="19190810"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10 w-full">
                <div class="flex my-6 w-full gap-2 items-center justify-between">
                    <label class="mr-4">
                        联系地址
                    </label>
                    <input type="text" class="input input-bordered grow w-fit"
                           value="四川省甘孜藏族自治州理塘县然日卡"/>
                </div>
            </div>

            <div class="section-title">
                其他联系人信息
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        与本人关系
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0Z - 与本人关系</option>
                    </select>
                </div>
                <h5 class="text-orange-400">
                    温馨提示：客户不是“无劳动收入的未成年人”或“年长者”，实际控制人必须为“本人”</h5>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 justify-between">
                    <label class="flex items-center">
                        姓名
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.customerName"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        证件类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0{{ customerStore.getCustomer.idType }} -
                            {{ ID_TYPE[customerStore.getCustomer.idType] }}
                        </option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center">
                    <label class="gap-2">
                        证件号码
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.idNumber"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        证件到期
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="20290810"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        联系电话
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="1376666"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        邮箱
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           value="1376666@dingzhen.com"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        国籍 / 地区
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>CHN - 中华人民共和国</option>
                        <option>HK, CHN - 中国香港</option>
                        <option>MC, CHN - 中国澳门</option>
                        <option>TW, CHN - 中国台湾</option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        职业类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>58 - 学生</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        邮政编码
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="137666"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        性别
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0 - 男性</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        出生日期
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="19190810"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10 w-full">
                <div class="flex my-6 w-full gap-2 items-center justify-between">
                    <label class="mr-4">
                        联系地址
                    </label>
                    <input type="text" class="input input-bordered grow w-fit"
                           value="四川省甘孜藏族自治州理塘县然日卡"/>
                </div>
            </div>

            <div class="section-title">
                受益人信息
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        与本人关系
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0Z - 与本人关系</option>
                    </select>
                </div>
                <h5 class="text-orange-400">
                    温馨提示：客户不是“无劳动收入的未成年人”或“年长者”，实际控制人必须为“本人”</h5>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 justify-between">
                    <label class="flex items-center">
                        姓名
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.customerName"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        证件类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0{{ customerStore.getCustomer.idType }} -
                            {{ ID_TYPE[customerStore.getCustomer.idType] }}
                        </option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center">
                    <label class="gap-2">
                        证件号码
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.idNumber"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        证件到期
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="20290810"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        联系电话
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="1376666"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        邮箱
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           value="1376666@dingzhen.com"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        国籍 / 地区
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>CHN - 中华人民共和国</option>
                        <option>HK, CHN - 中国香港</option>
                        <option>MC, CHN - 中国澳门</option>
                        <option>TW, CHN - 中国台湾</option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        职业类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>58 - 学生</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        邮政编码
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="137666"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        性别
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0 - 男性</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        出生日期
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="19190810"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10 w-full">
                <div class="flex my-6 w-full gap-2 items-center justify-between">
                    <label class="mr-4">
                        联系地址
                    </label>
                    <input type="text" class="input input-bordered grow w-fit"
                           value="四川省甘孜藏族自治州理塘县然日卡"/>
                </div>
            </div>

            <div class="section-title">
                开户经办人信息
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        与本人关系
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0Z - 与本人关系</option>
                    </select>
                </div>
                <h5 class="text-orange-400">
                    温馨提示：客户不是“无劳动收入的未成年人”或“年长者”，实际控制人必须为“本人”</h5>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 justify-between">
                    <label class="flex items-center">
                        姓名
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.customerName"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        证件类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0{{ customerStore.getCustomer.idType }} -
                            {{ ID_TYPE[customerStore.getCustomer.idType] }}
                        </option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center">
                    <label class="gap-2">
                        证件号码
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           :value="customerStore.getCustomer.idNumber"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        证件到期
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="20290810"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        联系电话
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           :value="1376666"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        邮箱
                    </label>
                    <input type="text" class="input input-bordered grow w-fit" readonly
                           value="1376666@dingzhen.com"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        国籍 / 地区
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>CHN - 中华人民共和国</option>
                        <option>HK, CHN - 中国香港</option>
                        <option>MC, CHN - 中国澳门</option>
                        <option>TW, CHN - 中国台湾</option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        职业类型
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>58 - 学生</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        邮政编码
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="137666"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        性别
                    </label>
                    <select class="select select-bordered w-56 select-disabled">
                        <option selected>0 - 男性</option>
                    </select>
                </div>
                <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                    <label class="mr-4">
                        出生日期
                    </label>
                    <input type="text" class="input input-bordered grow w-56"
                           value="19190810"/>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10 w-full">
                <div class="flex my-6 w-full gap-2 items-center justify-between">
                    <label class="mr-4">
                        联系地址
                    </label>
                    <input type="text" class="input input-bordered grow w-fit"
                           value="四川省甘孜藏族自治州理塘县然日卡"/>
                </div>
            </div>


            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row items-center gap-10">
                    <div class="flex my-6 w-full gap-2 items-center justify-items-start">
                        <label class="mr-4 w-36">
                            业务办理说明
                        </label>
                        <textarea class="textarea textarea-bordered w-full"></textarea>
                    </div>
                </div>
            </div>
            <div class="items-center gap-10 w-full justify-items-center text-center ">
                <button class="w-24
                            items-center justify-center
                            h-12 gap-2 px-6 text-sm
                            font-medium tracking-wide
                            text-white transition duration-300
                            rounded shadow-lg focus-visible:outline-none
                            whitespace-nowrap bg-blue-500 shadow-blue-200
                            hover:bg-blue-600 hover:shadow-md hover:shadow-blue-200
                            focus:bg-blue-700 focus:shadow-md focus:shadow-blue-200
                            disabled:cursor-not-allowed disabled:border-blue-300
                            disabled:bg-blue-300 disabled:shadow-none"
                        @click="okRelatedInfo"
                >
                    <span>下一步</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@tailwind components;
@layer {

}
</style>