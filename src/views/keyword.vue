<template>
<main class="px-4 pt-5 pb-8">
    <ul class="grid grid-cols-2 gap-x-3 gap-y-5">
        <li class="" v-for="(item, index) in keyword['list']" :key="index" >
            <CompanyCard :item="item"  @click="navigateToKeyword"/>
        </li>
    </ul>
</main>
</template>

<script setup lang="ts">
import CompanyCard from '@/components/card/CompanyCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 임포트
import { useKeywordStore } from '@/stores';

const router    = useRouter();
const keyword   = useKeywordStore();

// 클릭 시 /keyword로 이동하는 함수
const navigateToKeyword = () => {
    router.push('/product'); // 경로 이동
};

onMounted(() => {
    keyword.getData();
})

</script>

<style>

</style>

