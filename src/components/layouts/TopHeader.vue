<template>
<header class="sticky top-0 z-50 flex items-center justify-between flex-none w-full h-16 px-5 bg-white dark:bg-netblack dark:border-zinc-700">
    <div class="flex items-center flex-none gap-1">
        <router-link v-if="!search" class="" to="/"><p class="text-2xl font-bold whitespace-nowrap">{{ login['name'] }}</p></router-link>
        <div v-if="search" class="flex gap-2 mb-3">
            <IconField class="w-full">
                <InputIcon class="pi pi-search" />
                <InputText id="search" v-model="main.search" placeholder="제품 이름 검색" class="w-full" @keyup.enter="getList"/>
            </IconField>
        </div>
    </div>
    <div class="flex items-center gap-3">
        <button class="flex items-center justify-center size-8" @click="getSearch">
            <span class="pi pi-search !text-2xl"></span>
        </button>

        <button class="flex items-center justify-center size-8" @click="toggleNotificationPopover($event)">
            <IconAvatar class="*:text-blue-200 !size-10 "/>
        </button>
        <Popover class="" ref="notificationPopover" dismissable>
            <div class="flex flex-col">
                <Button label="로그아웃" icon="pi pi-sign-out" severity="danger" text  size="small" @click="getLogOut"/>
            </div>
        </Popover>

        <!-- <div class="pc-hidden">
            <Button icon="pi pi-bars" severity="contrast" text  plain size="large" @click="moSideHeader=true"/>
        </div> -->
    </div>
</header>

</template>

<script setup lang="ts">
import IconAvatar from '@/components/icons/IconAvatar.vue'
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import { useRouter, useRoute } from 'vue-router';
import { ref, nextTick, watch } from 'vue';
import { useLoginStore, useMainStore } from '@/stores';

const router    = useRouter();
const login     = useLoginStore();
const main      = useMainStore();
const search    = ref(false);
const route     = useRoute();

const getSearch = () => {
    search.value = !search.value;
    if (search.value) 
    {
        nextTick(() => {
            const input = document.getElementById('search') as HTMLInputElement;
            if (input) 
            {
                input.focus();
            }
        });
    }
}

const getList = async () => {
    await main.getSearchReset();
    await main.getSearch();
    router.push('/search');
}

const getLogOut = () => {
    alert('로그아웃 되었습니다.');
    login.getLogout();
    router.push('/login');
}

const toggleDarkMode = () => {
    const element = document.querySelector('html');
    isDarkMode.value = !isDarkMode.value; // 상태 반전
    if (isDarkMode.value) {
        element.classList.add('dark');
        // 다크 모드일 때
        items.value[0].label = '라이트 모드로 변경';
        items.value[0].icon = 'pi pi-sun';
    } else {
        element.classList.remove('dark');
        // 라이트 모드일 때
        items.value[0].label = '다크 모드로 변경';
        items.value[0].icon = 'pi pi-moon';
    }
};

const notificationPopover = ref<InstanceType<typeof Popover> | null>(null);

// notificationPopover 토글 함수 정의
const toggleNotificationPopover = async (event: MouseEvent) => {
    await nextTick();
    if (notificationPopover.value) {
        notificationPopover.value.toggle(event);
    }
};

const isDarkMode = ref(false); 
const items = ref([
    {
        label: isDarkMode.value ? '라이트 모드로 변경' : '다크 모드로 변경',
        icon: isDarkMode.value ? 'pi pi-sun' : 'pi pi-moon',
        command: () => toggleDarkMode(),
    },
    {
        label: '언어 변경',
        icon: ' pi pi-language',
        items: [
            {   label: '한국어',
                command: () => changeLanguage('ko'),
            },
            { 
                label: 'Engilsh',
                command: () => changeLanguage('en'),
            }
        ],
    },
]);

watch(() => route.path, (newPath) => {
    if(newPath !== '/' && newPath !== '/search')
    {
        search.value = false;
    }
}, { immediate: true });

</script>