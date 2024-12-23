<template>
    <TopHeader v-if="showTopHeader"/>
    <BackHeader :title="route.meta.title" v-else/>
    <main class=""
    :class="{ 'min-h-[calc(100vh-112px)]': showTopHeader }"
    >
        <RouterView />
    </main>
    <AppBar v-if="showAppFooter"/>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'; // useRoute 임포트
import AppBar from '@/components/layouts/AppBar.vue'
import TopHeader from '@/components/layouts/TopHeader.vue'
import BackHeader from '@/components/layouts/BackHeader.vue'

const route = useRoute();


// showTopHeader과 showAppFooter의 메타 정보 안전하게 접근
const showTopHeader = computed(() => {
    return route.meta?.showTopHeader ?? false; // undefined일 경우 false 반환
});

const showAppFooter = computed(() => {
    return route.meta?.showAppFooter ?? false; // undefined일 경우 false 반환
});

const showBackHeader = computed(() => {
    return route.meta?.showAppFooter ?? false; // undefined일 경우 false 반환
});

</script>

<style scoped>

</style>
