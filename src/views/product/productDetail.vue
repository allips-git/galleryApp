<template>
    <main class="pb-8 h-[calc(100vh-56px)]">
        <section class="w-full">
        <div class="w-full">
            <swiper :slidesPerView="1"
            :pagination="{ dynamicBullets: true, }"
            :modules="modules"
        
            >
            <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="flex items-center justify-center h-[calc(100vh-260px)]">
                <img :src="slide.image" :alt="slide.alt" class="flex items-center justify-center object-cover w-full max-h-full">
            </div>
            <div class="absolute right-4 top-4">
                <Button label="스펙보기" severity="secondary" size="small"/>
            </div>
            </swiper-slide>
            </swiper>
        </div>
        <div class="w-full pt-5 pl-5 bottom-swiper">
            <h2 class="pb-2 font-bold ">컬러보기</h2>
            <swiper 
                    :slides-per-view="3.2" 
                    :space-between="8"
                    :freeMode="true"
                    ref="colorSwiper"
                    @swiper="onSwiperInit"
                >
                    <swiper-slide 
                        v-for="(slide, index) in slides2" 
                        :key="index" 
                        @click.stop="setActiveSlide(index)"
                    >
                        <img 
                            :src="slide.image" 
                            :alt="slide.alt" 
                            class="w-full rounded-lg aspect-[4/3] object-cover"
                        />
                        <p class="mt-1 text-sm">브라운</p>
                    </swiper-slide>
                </swiper>
        </div>
    </section>
    </main>
    <Dialog v-model:visible="sepcPop" modal :style="{ width: 'calc(100% - 16px)', minWidth:'300px', maxWidth:'400px' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <span class="text-2xl font-bold whitespace-nowrap ">아르카디아14종</span>
            </div>
        </template>
        <section>
            <ul class="flex flex-col gap-2">
                <li class="flex justify-between w-full">
                    <p>code.Now</p>
                    <p class="font-bold">202104041085100</p>
                </li>

                <li class="flex justify-between w-full">
                    <p>재질</p>
                    <p class="font-bold text-blue-500">폴리 80% / 린넨 20%</p>
                </li>

                <li class="flex justify-between w-full">
                    <p>암막율</p>
                    <p class="font-bold text-blue-500">68%</p>
                </li>

                <li class="flex justify-between w-full">
                    <p>기타 부속</p>
                    <p>아노다이징 알리미늄</p>
                </li>

                <li class="flex justify-between w-full">
                    <p>원재료 국가</p>
                    <p>한국</p>
                </li>

                <li class="flex flex-col pt-4 mt-4 border-t border-dashed">
                    <p>제품 특성</p>
                    <span class="text-sm">- 폴리 린넨 혼방제품 방염가능</span>
                </li>
                
            </ul> 
        </section>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import testImg1 from '@/assets/imgs/test_02.png';
import testImg2 from '@/assets/imgs/test_03.png';
import testImg3 from '@/assets/imgs/test_04.png';
import testImg5 from '@/assets/imgs/test_05.png';
import testImg6 from '@/assets/imgs/test_06.png';
import testImg7 from '@/assets/imgs/test_07.png';
import testImg8 from '@/assets/imgs/test_08.png';
import testImg9 from '@/assets/imgs/test_09.png';
import testImg10 from '@/assets/imgs/test_10.png';
import testImg11 from '@/assets/imgs/test_11.png';

const sepcPop = ref(true)

const modules = [Pagination];

const slides = ref([
    { image: testImg1, alt: 'Slide 1' },
    { image: testImg2, alt: 'Slide 2' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg5, alt: 'Slide 1' },
    { image: testImg6, alt: 'Slide 2' },
    { image: testImg7, alt: 'Slide 3' },
    { image: testImg8, alt: 'Slide 1' },
    { image: testImg9, alt: 'Slide 1' },
    { image: testImg10, alt: 'Slide 1' },
    { image: testImg11, alt: 'Slide 1' },
]);


const activeSlide = ref(-1); // 현재 활성화된 슬라이드 인덱스
const colorSwiper = ref(null); // Swiper 인스턴스를 저장할 ref

const onSwiperInit = (swiper) => {
    colorSwiper.value = swiper;
};
const setActiveSlide = (index) => {
    const totalSlides = slides2.value.length; // 전체 슬라이드 개수
    const currentSlide = colorSwiper.value?.activeIndex; // 현재 활성화된 슬라이드 인덱스

    console.log(`Current Slide: ${currentSlide}, Clicked Index: ${index}, Total Slides: ${totalSlides}`);

    // 현재 슬라이드가 전체 슬라이드 - 4 이하일 때 슬라이드 이동 가능
    if (currentSlide <= totalSlides - 4 && index <= totalSlides - 4) {
        activeSlide.value = index; // 클릭한 슬라이드의 인덱스를 저장
        if (colorSwiper.value) {
            console.log(`Moving to slide index: ${index}`);
            colorSwiper.value.slideTo(index); // 클릭된 슬라이드로 이동
        }
    } else if (currentSlide > totalSlides - 4 && index > totalSlides - 4) {
        
        activeSlide.value = index; // 클릭한 슬라이드의 인덱스를 저장
        
        // 슬라이드에 'swiper-slide-active' 클래스 추가
        const slides = colorSwiper.value.slides;
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add('swiper-slide-active'); // 활성화된 슬라이드에 클래스 추가
            } else {
                slide.classList.remove('swiper-slide-active'); // 다른 슬라이드에서는 클래스 제거
            }
        });
    } else {
        activeSlide.value = index; // 클릭한 슬라이드의 인덱스를 저장
        if (colorSwiper.value) {
            console.log(`Moving to slide index: ${index}`);
            colorSwiper.value.slideTo(index); // 클릭된 슬라이드로 이동
        }
    }
};


const slides2 = ref([
    { image: testImg11, alt: 'Slide 3' },
    { image: testImg10, alt: 'Slide 3' },
    { image: testImg6, alt: 'Slide 2' },
    { image: testImg5, alt: 'Slide 1' },
    { image: testImg3, alt: 'Slide 3' },
    { image: testImg2, alt: 'Slide 2' },
    { image: testImg1, alt: 'Slide 1' },
    { image: testImg1, alt: 'Slide 1' },
    { image: testImg1, alt: 'Slide 1' },
    { image: testImg1, alt: 'Slide 1' },

]);

</script>

<style lang="scss">
.bottom-swiper{
    .swiper-slide{
        pointer-events: auto;
        &.swiper-slide-active{
            img{
                opacity: 1;
                border: 1px solid var(--p-primary-600);
            }
        }
        img{
            opacity: 0.4;
        }
    }
}
.swiper-pagination{
    .swiper-pagination-bullet{
        background: #fff;
        &.swiper-pagination-bullet-active{
            background-color: var(--p-primary-500)
        }
    }
}

</style>

    