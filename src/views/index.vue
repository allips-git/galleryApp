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
    <section v-for="(item, index) in main['list']" :key="index" class="w-full mt-8">
        <div class="flex items-center justify-between w-full px-5 mb-2">
            <p class="text-xl font-medium">{{ item['gkNm'] }}</p>
            <span @click="getMove(item['gkGb'], item['gkNm'])">모두 보기 ></span>
        </div>
        <div class="w-full pl-5">
            <swiper :slidesPerView="2.1" :spaceBetween="8" pagination >
                <swiper-slide v-for="(product, pIndex) in item['productList']" :key="pIndex" >
                    <div @click="navigateToKeyword">
                        <img :src="product.filePath" class="rounded-lg aspect-[3/4]" />
                        <div class="flex items-center justify-between mt-2">
                            <p class="text-gray-200">{{ product['faNm'] }}</p>
                        </div>
                    </div>
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
                    <div @click="navigateToKeyword">
                    <img :src="item.image" :alt="item.alt" class="rounded-lg aspect-[3/4]" />
                    <div class="flex items-center justify-between mt-2">
                        <p class="text-gray-200">올립스</p>
                    </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</main>
</template>

<script setup lang="ts">
import testImg5 from '@/assets/imgs/test_05.png';
import testImg6 from '@/assets/imgs/test_06.png';
import testImg7 from '@/assets/imgs/test_07.png';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { useRouter } from 'vue-router';
import { useStateStore, useMainStore } from '@/stores';

const router    = useRouter();
const state     = useStateStore();
const main      = useMainStore();

const getMove = async (gkGb: string, gkNm: string) => {
    await state.setGkGb(gkGb);
    await state.setGkNm(gkNm);
    router.push({  path: '/keyword' });
}

const slides2 = ref([
  { image: testImg5, alt: 'Slide 1' },
  { image: testImg6, alt: 'Slide 2' },
  { image: testImg7, alt: 'Slide 3' },
  { image: testImg5, alt: 'Slide 1' },
  { image: testImg6, alt: 'Slide 2' },
  { image: testImg7, alt: 'Slide 3' },
]);

// 클릭 시 /keyword로 이동하는 함수
const navigateToKeyword = () => {
  router.push('/keyword'); // 경로 이동
};

onMounted(async () => {
    await main.getData();
})
</script>

<style>
.back_gradient{
    background: linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,1) 32%, rgba(20,20,20,0.58) 56%, rgba(20,20,20,0.35) 71%, rgba(20,20,20,0.15) 85%, rgba(20,20,20,0) 100%);
}
</style>

