<template>
<header class="sticky top-0 z-50 flex items-center justify-between flex-none w-full h-16 px-5 bg-white dark:bg-netblack dark:border-zinc-700">

<div class="flex items-center flex-none gap-1">
    <router-link class="" to="/"><p class="text-2xl font-bold whitespace-nowrap">{{ login['name'] }}</p></router-link>
</div>
    
    
    
    <div class="flex items-center gap-3">
        <button class="flex items-center justify-center size-8">
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
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import { useRouter } from 'vue-router';
import { ref, nextTick } from 'vue';
import { useLoginStore } from '@/stores';

const router    = useRouter();
const login     = useLoginStore();

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

// const { t, locale } = useI18n();
// const currentLanguage = ref(locale.value);

// const datePickerLocale = ref(datePickerLocales.ko); // 초기 로케일 설정

// watch(locale, (newLocale) => {
//     currentLanguage.value = newLocale === 'ko' ? 'KO' : 'EN';
//     datePickerLocale.value = datePickerLocales[newLocale]; // 데이트 피커 로케일 업데이트
//     localStorage.setItem('locale', newLocale); // 로컬 스토리지에 저장
// });

// const changeLanguage = (newLocale) => {
//   locale.value = newLocale; // vue-i18n의 locale 변경
//   localStorage.setItem('locale', newLocale); // 로컬 스토리지에 저장
//   location.reload(); // 페이지 새로 고침
// };


// const toggle = (event) => {
//     menu.value.toggle(event);
// };

// 컴포넌트가 마운트될 때 기본 로케일 설정
// onMounted(() => {
   
//     datePickerLocale.value = datePickerLocales[locale.value]; // 초기 데이트 피커 로케일 설정
// });
 </script>

