<template>
<main class="pb-8">
    <section class="relative w-full px-5 mt-2">
        <img src="/src/assets/imgs/test_img.png" alt="" class="aspect-[3/4] border border-gray-700 rounded-2xl ">
        <div class="back_gradient w-full h-[50vw] absolute left-0 bottom-0 flex items-center flex-col gap-3 justify-end px-5 ">
            <div class="flex flex-col items-start w-full px-5 text-2xl font-bold text-left">
                <p>디자인 윈도우</p>
                <span>라인드 우드 블라인드</span>
            </div>
            <div class="w-full px-5">
                <Button label="보러가기" severity="contrast"  class="w-40" />
            </div>
        </div>
    </section>

    <section class="w-full mt-8">
        <div class="flex items-center justify-between w-full px-5 mb-2">
            <p class="text-xl font-medium">커튼</p>
            <span class="">모두 보기 ></span>
        </div>
        <div class="w-full pl-5">
            <swiper :slidesPerView="2.1" :spaceBetween="8" pagination >
                <swiper-slide v-for="(item, index) in slides" :key="index" >
                    <CompanyCard :item="item"  @click="navigateToKeyword"/>
                </swiper-slide>
            </swiper>
        </div>
    </section>

    <section class="w-full mt-8">
        <div class="flex items-center justify-between w-full px-5 mb-2">
            <p class="text-xl font-medium">추천제품</p>
            <span class="">모두 보기 ></span>
        </div>
        <div class="w-full pl-5">
            <swiper :slidesPerView="2.1" :spaceBetween="8" pagination >
                <swiper-slide v-for="(item, index) in slides2" :key="index" >
                    <CompanyCard :item="item"  @click="navigateToKeyword"/>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import CompanyCard from '@/components/card/CompanyCard.vue';
import { useRouter } from 'vue-router'; // useRouter 임포트


const slides = ref([
  { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
  { image: '/src/assets/imgs/test_03.png', alt: 'Slide 2' },
  { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
  { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
  { image: '/src/assets/imgs/test_03.png', alt: 'Slide 2' },
  { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
]);

const slides2 = ref([
  { image: '/src/assets/imgs/test_05.png', alt: 'Slide 1' },
  { image: '/src/assets/imgs/test_06.png', alt: 'Slide 2' },
  { image: '/src/assets/imgs/test_07.png', alt: 'Slide 3' },
  { image: '/src/assets/imgs/test_05.png', alt: 'Slide 1' },
  { image: '/src/assets/imgs/test_06.png', alt: 'Slide 2' },
  { image: '/src/assets/imgs/test_07.png', alt: 'Slide 3' },
]);

const router = useRouter(); // 라우터 인스턴스 가져오기

// 클릭 시 /keyword로 이동하는 함수
const navigateToKeyword = () => {
  router.push('/keyword'); // 경로 이동
};

</script>

<style>
.back_gradient{
    background: linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,1) 32%, rgba(20,20,20,0.58) 56%, rgba(20,20,20,0.35) 71%, rgba(20,20,20,0.15) 85%, rgba(20,20,20,0) 100%);
}
</style>

