<template>
    <div>
        <img :src="item.filePath" :alt="item.alt" class="rounded-lg" :class="{ 'aspect-[3/4]': aspectRatio }"/>
        <div class="flex items-center justify-between mt-2">
            <p class="text-gray-200">{{ item.itemNm }}</p>
            <div class="relative flex size-8" @click.stop="getLike">
                <IconWishHeart v-if="item.likeYn === 'N'" class="absolute right-0 -translate-y-1/2 top-1/2 fill-white"/>
                <IconWishHeartFill v-if="item.likeYn === 'Y'" class="absolute right-0 -translate-y-1/2 top-1/2 fill-red-500"/>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue';
import IconWishHeart from '@/components/icons/IconWishHeart.vue';
import IconWishHeartFill from '@/components/icons/IconWishHeartFill.vue';

const emit  = defineEmits(['get-whis']);
const props = defineProps({
    item: {
        type        : Object,
        required    : true
    },
    aspectRatio: {
        type        : Boolean,
        required    : true
    }
});

const getLike = () => {
    emit('get-whis', props['item']['itemCd']);
}
</script>

<style scoped>
</style>
