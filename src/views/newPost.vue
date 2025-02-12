<template>
    <main class="px-4 pt-4 pb-8">
        <h1 class="pb-3 text-xl font-bold ">신규 제품</h1>
        <ul class="grid grid-cols-2 gap-x-4 ">
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in newPost['list1']" @get-whis="getWhis" :key="index"
                    @click="getMove(item['gkCd'], item['itemCd'])"/>
            </li>
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in newPost['list2']" @get-whis="getWhis" :key="index"
                    @click="getMove(item['gkCd'], item['itemCd'])"/>
            </li>
        </ul>
</main>
</template>

<script setup lang="ts">
import ProductCard from '@/components/card/ProductCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStateStore, useProductStore, useNewPostStore } from '@/stores';

const router    = useRouter();
const state     = useStateStore();
const newPost   = useNewPostStore();
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
    await newPost.getListReset();
    await newPost.getList();
}

onMounted(async() => {
    await getList();
})
</script>

<style>

</style>
        
        