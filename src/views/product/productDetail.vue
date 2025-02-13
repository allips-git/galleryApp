<template>
    <main class="pb-8 h-[calc(100vh-56px)]">
        <section class="w-full">
            <div class="w-full">
                <swiper :slidesPerView="1" :pagination="{ dynamicBullets: true, }" :modules="modules">
                    <div>
                        <div class="flex items-center justify-center h-[calc(100vh-260px)]">
                            <img :src="product['info']['repImg']" class="flex items-center justify-center object-cover w-full max-h-full">
                        </div>
                        <div class="absolute right-4 top-4">
                            <Button label="스펙보기" severity="secondary" size="small" @click="getPopupOpen('productSpec')"/>
                        </div>
                    </div>
                </swiper>
            </div>
            <div class="w-full pt-5 pl-5 bottom-swiper">
                <h2 class="pb-2 font-bold ">컬러보기</h2>
                <swiper :slides-per-view="3.2" :space-between="8" :freeMode="true" ref="colorSwiper" @swiper="onSwiperInit">
                    <swiper-slide v-for="(slide, index) in product['info']['files']" :key="index" @click.stop="setActiveSlide(index)">
                        <img :src="slide.file" class="w-full rounded-lg aspect-[4/3] object-cover"/>
                        <p class="mt-1 text-sm">{{ slide['icNm'] }}</p>
                    </swiper-slide>
                </swiper>
            </div>
        </section>
    </main>
    <Dialog v-model:visible="popup['pop']['productSpec']" modal :style="{ width: 'calc(100% - 16px)', minWidth:'300px', maxWidth:'400px' }" 
        @update:visible="getPopupClose('productSpec', true);">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <span class="text-2xl font-bold whitespace-nowrap ">{{ state['itemNm'] }}</span>
            </div>
        </template>
        <section>
            <ul class="flex flex-col gap-2">
                <li class="flex justify-between w-full">
                    <p>code.No</p>
                    <p class="font-bold">{{ state['itemCd'] }}</p>
                </li>
                <li class="flex justify-between w-full">
                    <p>재질</p>
                    <p class="font-bold text-blue-500">{{ product['info']['texture'] }}</p>
                </li>
                <li class="flex justify-between w-full">
                    <p>암막율</p>
                    <p class="font-bold text-blue-500">{{ product['info']['rate'] }}%</p>
                </li>
                <li class="flex justify-between w-full">
                    <p>기타 부속</p>
                    <p>{{ product['info']['etc'] }}</p>
                </li>
                <li class="flex justify-between w-full">
                    <p>원재료 국가</p>
                    <p>{{ product['info']['origin'] }}</p>
                </li>
                <li class="flex flex-col pt-4 mt-4 border-t border-dashed">
                    <p>제품 특성</p>
                    <span class="text-sm">- {{ product['info']['prodChar'] }}</span>
                </li>
            </ul> 
        </section>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { onMounted, ref } from 'vue';
import { useStateStore, usePopupStore, useProductStore } from '@/stores';
import { usePopup } from '@/assets/js/popup';

const state   = useStateStore();
const popup   = usePopupStore();
const product = useProductStore();
const modules = [Pagination];

const { getPopupOpen, getPopupClose } = usePopup();

const activeSlide = ref(-1); // 현재 활성화된 슬라이드 인덱스
const colorSwiper = ref(null); // Swiper 인스턴스를 저장할 ref

const onSwiperInit = (swiper) => {
    colorSwiper.value = swiper;
};
const setActiveSlide = (index) => {
    activeSlide.value = index; // 클릭한 슬라이드 인덱스를 저장

    if (colorSwiper.value) {
        colorSwiper.value.slideTo(index); // 클릭된 슬라이드로 이동

        // 모든 슬라이드에서 'selected' 클래스 제거
        colorSwiper.value.slides.forEach((slide) => {
            slide.classList.remove('selected');
        });

        // 클릭한 슬라이드에 'selected' 클래스 추가
        if (colorSwiper.value.slides[index]) {
            colorSwiper.value.slides[index].classList.add('selected');
        }
    }
};

onMounted(() => {
    product.getInfo();
})

</script>

<style lang="scss">
.bottom-swiper {
    .swiper-slide {
        pointer-events: auto;

        img {
            opacity: 0.4;
            transition: opacity 0.3s, border 0.3s;
            border: 1px solid transparent;
        }

        &.selected, // 클릭한 슬라이드
        &.swiper-slide-active { 
            img {
                opacity: 1;
                border: 2px solid var(--p-primary-600);
            }
        }
    }
}

</style>

    