<template>
    <main class="px-4 pt-4 pb-8">
        <h1 class="pb-3 text-xl font-bold ">니의 찜</h1>
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
import testImg1 from '@/assets/imgs/test_02.png';
import testImg2 from '@/assets/imgs/test_03.png';
import testImg3 from '@/assets/imgs/test_04.png';
import testImg5 from '@/assets/imgs/test_05.png';
import testImg6 from '@/assets/imgs/test_06.png';
import testImg7 from '@/assets/imgs/test_07.png';
import testImg10 from '@/assets/imgs/test_10.png';
import testImg11 from '@/assets/imgs/test_11.png';
import testImg13 from '@/assets/imgs/test_13.png';

const slides = ref([
    { image: testImg1, alt: 'Slide 1' },
    { image: testImg2, alt: 'Slide 2' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg5, alt: 'Slide 1' },
    { image: testImg6, alt: 'Slide 2' },
    { image: testImg7, alt: 'Slide 3' },
    { image: testImg1, alt: 'Slide 1' },
]);

const slides2 = ref([
    { image: testImg13, alt: 'Slide 2' },
    { image: testImg11, alt: 'Slide 3' },
    { image: testImg10, alt: 'Slide 3' },
    { image: testImg6, alt: 'Slide 2' },
    { image: testImg5, alt: 'Slide 1' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg2, alt: 'Slide 2' },
    { image: testImg1, alt: 'Slide 1' },
]);


</script>

<style>

</style>
        
        