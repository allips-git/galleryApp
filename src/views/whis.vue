<template>
    <main class="px-4 pt-4 pb-8">
        <h1 class="pb-3 text-xl font-bold ">니의 찜</h1>
        <ul class="grid grid-cols-2 gap-x-4 ">
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="whis['list1']" v-for="(item, index) in slides" :key="index"/>
            </li>

            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="whis['list2']" v-for="(item, index) in slides2" :key="index"/>
            </li>
        </ul>
</main>
</template>

<script setup lang="ts">
import ProductCard from '@/components/card/ProductCard.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 임포트
import { useWhisStore } from '@/stores';

const router    = useRouter();
const whis      = useWhisStore();

onMounted(() => {
    whis.getList();
})
</script>

<style>

</style>
        
        