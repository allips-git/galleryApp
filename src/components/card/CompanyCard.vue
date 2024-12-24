<template>
    <div>
      <img :src="item.image" :alt="item.alt" class="rounded-lg aspect-[3/4]" />
      <div class="flex items-center justify-between mt-2">
        <p class="text-gray-200">올립스</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps } from 'vue';

  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });

  </script>
  
  <style scoped>
  </style>
  