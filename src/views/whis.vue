<template>
    <main class="px-4 pt-4 pb-8">
        <h1 class="pb-3 text-xl font-bold ">니의 찜</h1>
        <ul class="grid grid-cols-2 gap-x-4 ">
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in whis['list1']" @get-whis="getWhis" :key="index" @click="getMove"/>
            </li>

            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in whis['list2']" @get-whis="getWhis" :key="index" @click="getMove"/>
            </li>
        </ul>
</main>
</template>

<script setup lang="ts">
import ProductCard from '@/components/card/ProductCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStateStore, useProductStore, useWhisStore } from '@/stores';

const router    = useRouter();
const state     = useStateStore();
const whis      = useWhisStore();
const product   = useProductStore();

const getMove = async (gkCd: string, itemCd: string) => {
    await state.setGkCd(gkCd);
    await state.setItemCd(itemCd);
    router.push('/product/detail');
};

const getWhis = async (itemCd: string) => {
    await product.getWhis(itemCd).then( async (result) => {
        if(result)
        {
            await getList();
        }
    });
}

const getList = async () => {
    await whis.getListReset();
    await whis.getList();
}

onMounted(async() => {
    await getList();
})
</script>

<style>

</style>
        
        