<template>
    <ul class="sticky bottom-0 left-0 w-full gap-4 px-3 h-[56px] dark:bg-[#000000] md:hidden flex  z-10">
      <li 
        class="flex flex-col items-center cursor-pointer py-0.5 justify-evenly w-full text-gray-600"
        v-for="item in SideHeaderItems" 
        :key="item.id" 
        @click="handleClick(item)"
      >
        <!-- 아이콘 컴포넌트를 동적으로 렌더링 -->
        <component :is="item.icon" class="" 
        :class="{ '*:fill-white': isActive(item.link) }"
        />
        <p class="text-sm font-normal text-gray-500 duration-300"
        :class="{ '!text-white': isActive(item.link) }" 
        >{{ item.label }}</p>
      </li>
    </ul>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import IconHome from '@/components/icons/IconHome.vue';
  import IconHeart from '@/components/icons/IconHeart.vue';
  import IconHot from '@/components/icons/IconHot.vue';
  import IconSearchNew from '@/components/icons/IconSearchNew.vue';
  
  // 기본값 설정
  const moSideHeader = ref(false);
  
  const route = useRoute();
  
  const props = defineProps({
    drawerClass: {
      type: Boolean,
    },
    setWideSide: {
      type: Boolean,
    },
  });
  
  // Vue Router 가져오기
  const router = useRouter();
  
  // 아이콘 컴포넌트를 포함한 항목 배열
  const SideHeaderItems = ref([
    { id: 1, label: '홈', link: '/', icon: IconHome }, 
    { id: 2, label: '인기', link: '/popular', icon: IconHot }, 
    { id: 3, label: '찜', link: '/whis', icon: IconHeart },
    { id: 4, label: '신규', link: '/new_post', icon: IconSearchNew },
  ]);
  
  // 클릭 핸들러
  const handleClick = (item: { id: number; link: string; label: string }) => {
      navigateTo(item.link);
  };
  
  // 링크로 이동
  const navigateTo = (link: string) => {
    router.push(link);
  };
  
  // 현재 경로와 링크를 비교하여 활성화 여부 판단
  const isActive = (link: string) => {
    return route.path === link;
  };
  </script>
  