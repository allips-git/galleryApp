<template>
    <main class="px-4 pt-2 pb-8">
        <div class="flex gap-2 mb-3">
            <Select placeholder="선택" class="w-40"/> 
            <IconField class="w-full">
                <InputIcon class="pi pi-search" />
                <InputText placeholder="제품 이름 검색" class="w-full" />
            </IconField>
        </div>
        <ul class="grid grid-cols-2 gap-x-4 ">
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in slides" :key="index" @click="navigateTodetail"/>
            </li>

            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in slides2" :key="index" @click="navigateTodetail"/>
            </li>
        </ul>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 임포트
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ProductCard from '@/components/card/ProductCard.vue';


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
const navigateTodetail = () => {
    router.push('/product/detail'); // 경로 이동
};

</script>

<style>

</style>

    