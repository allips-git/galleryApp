<template>
    <header class="sticky top-0 z-50 flex items-center w-full h-16 px-2 shadow-sm bg-netblack md:border-b md:shadow-none md:border-gray-100">
        <Button 
            plain 
            text 
            rounded 
            icon="pi pi-chevron-left" 
            @click="goBack"
            class="!block pc-hidden md:!hidden"
        />
        <h1 class="text-xl">{{ title }}</h1>
    </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 임포트

const props = defineProps({
    title: {
        type: String,
    },
})

const router = useRouter(); // useRouter 훅 사용

// 뒤로가기 함수 정의
const goBack = () => {
    router.back(); // 또는 router.go(-1);
};
</script>

<style lang="scss">


</style>
