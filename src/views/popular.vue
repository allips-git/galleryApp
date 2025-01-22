<template>
    <main class="pb-8">    
        <h1 class="px-5 pb-3 text-xl font-bold ">인기 제품</h1>
        <section v-for="(item, index) in popular['list']" class="w-full pt-4" :key="index">
            <div class="flex items-center justify-between w-full px-5 mb-2">
                <p class="text-xl font-medium">{{ item['gkNm'] }}</p>
                <span class="">모두 보기 ></span>
            </div>
            <div class="w-full pl-5">
                <swiper :slidesPerView="2.1" :spaceBetween="8" pagination >
                    <swiper-slide v-for="(product, pIndex) in item['list']" :key="pIndex" >
                        <ProductCard :aspectRatio="true" :item="product"  @click="navigateToKeyword"/>
                    </swiper-slide>
                </swiper>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import ProductCard from '@/components/card/ProductCard.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStateStore, usePopularStore } from '@/stores';

const router    = useRouter();
const state     = useStateStore();
const popular   = usePopularStore();

// 클릭 시 /keyword로 이동하는 함수
const navigateToKeyword = () => {
  router.push('/keyword'); // 경로 이동
};

onMounted(() => {
    popular.getData();
})
</script>

<style>
.back_gradient{
background: linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,1) 32%, rgba(20,20,20,0.58) 56%, rgba(20,20,20,0.35) 71%, rgba(20,20,20,0.15) 85%, rgba(20,20,20,0) 100%);
}
</style>
    
    