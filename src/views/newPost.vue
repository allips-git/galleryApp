<template>
    <main class="px-4 pt-4 pb-8">
        <h1 class="pb-3 text-xl font-bold ">신규 제품</h1>
        <ul class="grid grid-cols-2 gap-x-4 ">
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in slides" :key="index"/>
            </li>

            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in slides2" :key="index"/>
            </li>
        </ul>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ProductCard from '@/components/card/ProductCard.vue';
import { useRouter } from 'vue-router'; // useRouter 임포트

const slides = ref([
    { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_03.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_05.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_06.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_07.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
]);

const slides2 = ref([
    { image: '/src/assets/imgs/test_13.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_11.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_10.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_06.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_05.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_03.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
]);


const router = useRouter(); // 라우터 인스턴스 가져오기

// 클릭 시 /keyword로 이동하는 함수
const navigateToKeyword = () => {
    router.push('/keyword'); // 경로 이동
};

</script>

<style>

</style>
        
        