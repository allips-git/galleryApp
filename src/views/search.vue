<template>
    <main class="px-4 pt-4 pb-8">
        <ul class="grid grid-cols-2 gap-x-4 ">
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in main['searchList1']" @get-whis="getWhis" :key="index"
                    @click="getMove(item['gkCd'], item['itemCd'], item['itemNm'])"/>
            </li>
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in main['searchList2']" @get-whis="getWhis" :key="index"
                    @click="getMove(item['gkCd'], item['itemCd'], item['itemNm'])"/>
            </li>
        </ul>
</main>
</template>

<script setup lang="ts">
import ProductCard from '@/components/card/ProductCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStateStore, useProductStore, useMainStore } from '@/stores';

const router    = useRouter();
const state     = useStateStore();
const main      = useMainStore();
const product   = useProductStore();

const getMove = async (gkCd: string, itemCd: string, itemNm: string) => {
    await state.setGkCd(gkCd);
    await state.setItemCd(itemCd);
    await state.setItemNm(itemNm);
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
    await main.getSearchReset();
    await main.getSearch();
}

onMounted(async() => {
    await getList();
})
</script>

<style>

</style>
        
        