<template>
<main class="px-4 pt-5 pb-8">
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
import testImg1 from '@/assets/imgs/test_02.png';
import testImg2 from '@/assets/imgs/test_03.png';
import testImg3 from '@/assets/imgs/test_04.png';

const slides = ref([
    { image: testImg1, alt: 'Slide 1' },
    { image: testImg2, alt: 'Slide 2' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg3, alt: 'Slide 3' },
]);


const router = useRouter(); // 라우터 인스턴스 가져오기

// 클릭 시 /keyword로 이동하는 함수
const navigateToKeyword = () => {
    router.push('/product'); // 경로 이동
};

</script>

<style>

</style>

