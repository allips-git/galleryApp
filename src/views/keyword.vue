<template>
<main class="px-4 pt-5 pb-8">
    <ul class="grid grid-cols-2 gap-x-3 gap-y-5">
        <li class="" v-for="(item, index) in keyword['list']" :key="index" >
            <CompanyCard :item="item"  @click="getProduct(item['code'], item['codeNm'])"/>
        </li>
    </ul>
</main>
</template>

<script setup lang="ts">
import CompanyCard from '@/components/card/CompanyCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStateStore, useKeywordStore } from '@/stores';

const state     = useStateStore();
const router    = useRouter();
const keyword   = useKeywordStore();

const getProduct = async (code: string, codeNm: string) => {
    await state.setCode(code);
    await state.setCodeNm(codeNm);
    await state.setItemGb('');
    router.push('/product');
};

onMounted(async() => {
    await keyword.getListReset();
    await keyword.getList();
})

</script>

<style>

</style>

