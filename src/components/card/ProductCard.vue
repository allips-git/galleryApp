<template>
    <div>
      <img :src="item.image" :alt="item.alt" class="rounded-lg" />
      <div class="flex items-center justify-between mt-2">
        <p class="text-gray-200">올립스</p>
        <div class="relative flex size-8" @click="toggleIcon">
          <IconWishHeart v-if="!isWhished" class="absolute right-0 -translate-y-1/2 top-1/2 fill-white"/>
          <IconWishHeartFill v-if="isWhished" class="absolute right-0 -translate-y-1/2 top-1/2 fill-red-500"/>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps } from 'vue';
  import IconWishHeart from '@/components/icons/IconWishHeart.vue';
  import IconWishHeartFill from '@/components/icons/IconWishHeartFill.vue';
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });
  
  const isWhished = ref(false);
  
  // 아이콘 토글 함수
  const toggleIcon = () => {
    isWhished.value = !isWhished.value;
  };
  </script>
  
  <style scoped>
  </style>
  