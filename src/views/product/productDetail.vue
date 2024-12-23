<template>
    <main class="px-4 pb-8 h-[calc(100vh-56px)]">
        <section class="w-full">
        <div class="w-full">
            <swiper :slidesPerView="1" :spaceBetween="8" pagination >
                <swiper-slide>
                    <div class="flex items-center justify-center h-[calc(100vh-260px)] py-10">
                        <img src="@/assets/imgs/test_02.png" alt="" class="flex items-center justify-center object-cover w-full max-h-full">
                    </div>
                </swiper-slide>

                <swiper-slide>
                    <div class="flex items-center justify-center h-[calc(100vh-260px)] py-10">
                        <img src="@/assets/imgs/test_13.png" alt="" class="flex items-center justify-center object-cover w-full max-h-full">
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="w-full pt-5 bottom-swiper">
            <h2 class="px-5 pb-2 font-bold">컬러보기</h2>
            <swiper :slidesPerView="4.2" :spaceBetween="8" pagination :loop="true" :centered-slides="true">
                <swiper-slide>
                    <img src="@/assets/imgs/test_02.png" alt="" class="w-full rounded-lg aspect-[4/3] object-cover">
                    <p class="mt-1 text-sm">브라운</p>
                </swiper-slide>

                <swiper-slide>
                    <img src="@/assets/imgs/test_03.png" alt="" class="w-full rounded-lg aspect-[4/3] object-cover">
                    <p class="mt-1 text-sm">브라운</p>
                </swiper-slide>

                <swiper-slide>
                    <img src="@/assets/imgs/test_04.png" alt="" class="w-full rounded-lg aspect-[4/3] object-cover">
                    <p class="mt-1 text-sm">브라운</p>
                </swiper-slide>

                <swiper-slide>
                    <img src="@/assets/imgs/test_05.png" alt="" class="w-full rounded-lg aspect-[4/3] object-cover">
                    <p class="mt-1 text-sm">브라운</p>
                </swiper-slide>

                <swiper-slide>
                    <img src="@/assets/imgs/test_06.png" alt="" class="w-full rounded-lg aspect-[4/3] object-cover">
                    <p class="mt-1 text-sm">브라운</p>
                </swiper-slide>

                <swiper-slide>
                    <img src="@/assets/imgs/test_06.png" alt="" class="w-full rounded-lg aspect-[4/3] object-cover">
                    <p class="mt-1 text-sm">브라운</p>                    
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

</script>

<style lang="scss">
.bottom-swiper{
    .swiper-slide{
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

</style>

    