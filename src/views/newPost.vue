<template>
    <main class="px-4 pt-4 pb-8">
        <h1 class="pb-3 text-xl font-bold ">신규 제품</h1>
        <ul class="grid grid-cols-2 gap-x-3 gap-y-5">
            <li class="" v-for="(item, index) in slides" :key="index" >
                <CompanyCard :item="item"  @click="navigateToKeyword"/>
            </li>
        </ul>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CompanyCard from '@/components/card/CompanyCard.vue';
import { useRouter } from 'vue-router'; // useRouter 임포트

const slides = ref([
    { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_03.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
]);


const router = useRouter(); // 라우터 인스턴스 가져오기

// 클릭 시 /keyword로 이동하는 함수
const navigateToKeyword = () => {
    router.push('/keyword'); // 경로 이동
};

</script>

<style>

</style>
        
        