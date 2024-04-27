<script setup lang="ts">

import {ID_TYPE} from "@/ts/model/customer.ts";
import {useCustomerStore} from "@/ts/store/customer-store.ts";
import pinia from "@/ts/pinia.ts";
import {getGeneratedCustomerId} from "@/ts/request-promises.ts";

const customerStore = useCustomerStore(pinia)

const okBasicSupplement = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    customerStore.routineTo(3)

}
const getGenId = async () => {
    let resp = await getGeneratedCustomerId()
    if (!resp.data) return
    customerStore.getCustomer.id = resp.data['data']
}
</script>

<template>
    <div id="notification"></div>
    <div id="section1" class="w-full">
        <div class="section-title">
            开户机构
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex flex-row my-6 md:w-80 items-center">
                <label class="mr-4">
                    开户机构
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>1145 - 信东总部14</option>
                </select>
            </div>
            <div class="flex flex-row my-6 md:w-80 items-center justify-between">
                <label class="mr-4">
                    客户模板
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>2 - 个人</option>
                </select>
            </div>
            <div class="flex my-6 md:w-80 gap-2 justify-between">
                <label class="flex items-center">
                    <span>客户代码</span>
                    <span class="text-red-600 text-3xl">*</span>
                </label>
                <input type="text" class="input input-bordered grow w-36" readonly
                       v-model="customerStore.getCustomer.id"
                />
                <button class="btn btn-info text-white" @click="getGenId">生成</button>
            </div>
        </div>
        <div class="section-title">
            基本信息
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="gap-2">
                    客户姓名
                </label>
                <input type="text" class="input input-bordered grow w-36" readonly
                       :value="customerStore.getCustomer.customerName"/>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="gap-2">
                    性别
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>0 - 男性</option>
                </select>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="gap-2">
                    民族
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>0 - 汉族</option>
                </select>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
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
                <label class="mr-4">
                    有效日期从
                </label>
                <input type="text" class="input input-bordered grow w-36" readonly
                       :value="19190810"/>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="gap-2">
                    至
                </label>
                <input type="text" class="input input-bordered grow w-36" readonly
                       :value="20290810"/>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 gap-2 items-center w-full">
                <label class="gap-2">
                    证件地址
                </label>
                <input type="text" class="input input-bordered grow" readonly
                       value="辽宁省沈阳市浑南区白塔街道195号"/>
                <label class="text-red-600">根据实际填写，精确至门牌号</label>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 gap-2 items-center w-full">
                <label class="gap-2">
                    发证机关
                </label>
                <input type="text" class="input input-bordered grow" readonly
                       value="辽宁省沈阳市浑南区白塔街道195号"/>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 gap-2 items-center w-full">
                <label class="gap-2">
                    读卡标志
                </label>
                <div class="badge badge-success gap-2 p-4 text-gray-50">
                    已读卡
                </div>
            </div>
            <div class="flex my-6 gap-2 items-center w-full">
                <label class="gap-2">
                    身份校验标志
                </label>
                <div class="badge badge-error gap-2 p-4 text-gray-50">
                    未校验
                </div>
            </div>
        </div>

        <div class="divider divider-accent"></div>

        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    主体身份
                </label>
                <select class="select select-bordered w-56">
                    <option selected>0 - 普通</option>
                </select>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="gap-2">
                    境内外标志
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>0 - 境内</option>
                </select>
            </div>
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
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    籍贯
                </label>
                <input type="text" class="input input-bordered grow w-36"
                       value="辽宁沈阳市"/>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="gap-2">
                    学历
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>2 - 大学本科</option>
                </select>
            </div>
        </div>

        <div class="divider divider-accent"></div>

        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    职业类型
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>58 - 学生</option>
                </select>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 gap-2 items-center w-full">
                <label class="gap-2">
                    工作单位
                </label>
                <input type="text" class="input input-bordered grow" readonly
                       value="无"/>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    职务
                </label>
                <select class="select select-bordered w-56 select-disabled">
                    <option selected>Z - 其它
                    </option>
                </select>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center">
                <label class="gap-2">
                    手动输入职务
                </label>
                <input type="text" class="input input-bordered grow w-36" readonly
                       value="测试"/>
            </div>
        </div>
        <div class="divider divider-accent"></div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    年收入（元）
                </label>
                <select class="select select-bordered w-56">
                    <option selected>0 - 0~10万
                    </option>
                </select>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center">
                <label class="gap-2">
                    投资者分类
                </label>
                <select class="select select-bordered w-56">
                    <option selected>0 - 普通投资者
                    </option>
                </select>
            </div>
            <div class="flex my-6 md:w-80 gap-2 items-center">
                <label class="gap-2">
                    投资者来源
                </label>
                <select class="select select-bordered w-56">
                    <option selected>0 - 普通投资者
                    </option>
                </select>
            </div>
        </div>

        <div class="section-title">
            联系信息
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    手机号码
                </label>
                <input type="text" class="input input-bordered grow w-36"
                       value="1376666"/>
            </div>
            <div class="flex my-6 md:w-90 gap-2 items-center">
                <label class="gap-2">
                    固定电话
                </label>
                <div class="grow w-fit">
                    +
                    <input class="input input-bordered max-w-16" value="86"/>
                    -
                    <input class="input input-bordered  max-w-16" value="024" placeholder="区号"/>
                    -
                    <input class="input input-bordered min-w-24" value="3378458"/>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    电子邮箱
                </label>
                <input type="email" class="input input-bordered grow w-36"
                       value="1376666@dingzhen.com"/>
            </div>
            <div class="flex my-6 md:w-90 gap-2 items-center">
                <label class="gap-2">
                    传真电话
                </label>
                <div class="grow w-fit">
                    +
                    <input class="input input-bordered max-w-16" value="86"/>
                    -
                    <input class="input input-bordered  max-w-16" value="024" placeholder="区号"/>
                    -
                    <input class="input input-bordered min-w-24" value="3378458"/>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 w-full gap-2 items-center justify-between">
                <label class="mr-4">
                    联系地址
                </label>
                <select class="select select-bordered w-32">
                    <option selected>四川省
                    </option>
                </select>
                <select class="select select-bordered w-44">
                    <option selected>甘孜藏族自治州
                    </option>
                </select>
                <select class="select select-bordered w-44">
                    <option selected>理塘县
                    </option>
                </select>
                <input type="text" class="input input-bordered grow w-fit"
                       value="然日卡"/>
                <button class="btn btn-info text-white">使用证件地址</button>
            </div>
        </div>
        <div class="flex flex-row items-center gap-10">
            <h5 class="text-red-600">根据实际填写，精确至门牌号</h5>
        </div>
        <div class="flex flex-row items-center gap-10">
            <div class="flex my-6 md:max-w-80 gap-2 items-center justify-between">
                <label class="mr-4">
                    邮政编码
                </label>
                <input type="text" class="input input-bordered grow w-56"
                       value="137666"/>
            </div>
        </div>
        <div id="service">
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 w-full gap-2 items-center justify-items-start">
                    <label class="mr-4 w-36">
                        业务办理说明
                    </label>
                    <textarea class="textarea textarea-bordered w-full"></textarea>
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
                        @click="okBasicSupplement"
                >
                    <span>下一步</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>