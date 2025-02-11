<template>
    <div>
        <img :src="item.filePath" :alt="item.alt" class="rounded-lg aspect-[3/4]" />
        <div class="flex items-center justify-between mt-2">
            <p class="text-gray-200">{{ item['codeNm'] }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps({
    item: {
        type        : Object,
        required    : true
    }
});

</script>
  
<style scoped>
</style>
  