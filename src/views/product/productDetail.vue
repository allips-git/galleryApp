<template>
  <main class="pb-8 h-[calc(100vh-56px)]">
    <section class="w-full">
      <div class="w-full">
        <swiper
          v-if="files.length > 0"
          :slidesPerView="1"
          :pagination="{ dynamicBullets: true }"
          :modules="modules"
          ref="mainSwiper"
          @swiper="onMainSwiperInit"
        >
          <swiper-slide v-for="(slide, index) in files[product.fileIndex]['files']" :key="index">
            <div class="flex items-center justify-center h-[calc(100vh-260px)]">
              <img
                :src="slide.filePath"
                class="flex items-center justify-center object-cover w-full max-h-full"
              />
            </div>
            <div class="absolute right-4 top-4">
              <Button
                label="스펙보기"
                severity="secondary"
                size="small"
                @click="getPopupOpen('productSpec')"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="w-full pt-5 pl-5 bottom-swiper">
        <h2 class="pb-2 font-bold">컬러보기</h2>
        <swiper
          :slides-per-view="3.2"
          :space-between="8"
          :freeMode="true"
          ref="colorSwiper"
          @swiper="onSwiperInit"
        >
          <swiper-slide
            v-for="(slide, index) in files"
            :key="index"
            @click.stop="setActiveSlide(index)"
            :class="{ selected: activeSlide === index }"
          >
            <img :src="slide.repFile" class="w-full rounded-lg aspect-[4/3] object-cover" />
            <p class="mt-1 text-sm">{{ slide['icNm'] }}</p>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </main>
  <Dialog
    v-model:visible="popup['pop']['productSpec']"
    modal
    :style="{ width: 'calc(100% - 16px)', minWidth: '300px', maxWidth: '400px' }"
    @update:visible="getPopupClose('productSpec', true)"
  >
    <template #header>
      <div class="inline-flex items-center justify-center gap-2">
        <span class="text-2xl font-bold whitespace-nowrap">{{ state['itemNm'] }}</span>
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
import Dialog from 'primevue/dialog'
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { onMounted, ref, computed } from 'vue'
import type { Swiper as SwiperInstance } from 'swiper/types'
import { useStateStore, usePopupStore, useProductStore } from '@/stores'
import { usePopup } from '@/assets/js/popup'

const state = useStateStore()
const popup = usePopupStore()
const product = useProductStore()
const modules = [Pagination]

const { getPopupOpen, getPopupClose } = usePopup()

interface FileItem {
  icNm: string
  file: string
}
const activeSlide = ref<number>(-1) // 현재 활성화된 슬라이드 인덱스
const colorSwiper = ref<SwiperInstance | null>(null) // Swiper 인스턴스를 저장할 ref
const files = computed<FileItem[]>(() => (product.info as any).files || [])
const mainSwiper = ref<SwiperInstance | null>(null)

const onSwiperInit = (swiper: SwiperInstance) => {
  colorSwiper.value = swiper
}
const onMainSwiperInit = (swiper: SwiperInstance) => {
  mainSwiper.value = swiper
}
const setActiveSlide = async (index: number) => {
    await product.getFileIndex(index) // 파일 인덱스 업데이트
  activeSlide.value = index
  // 선택 효과만 적용
  if (colorSwiper.value) {
    const slides = colorSwiper.value.slides as unknown as HTMLElement[]
    slides.forEach((slide: HTMLElement) => {
      slide.classList.remove('selected')
    })
    if (slides[index]) {
      slides[index].classList.add('selected')
    }
  }
}

onMounted(() => {
  product.getInfo()
})
</script>

<style lang="scss">
.bottom-swiper {
  .swiper-slide {
    pointer-events: auto;

    img {
      opacity: 0.4;
      transition:
        opacity 0.3s,
        border 0.3s;
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
