<template>
<Dialog v-model:visible="visible"
    pt:root:class="!border-0 !bg-transparent w-full md:w-[400px] md:h-auto !min-h-[600px] h-full !max-h-screen justify-start">
        <template #container>
            <BackHeader title="로그인"  class="md:hidden" />
            <div class="flex flex-col px-4 pb-8 mt-5 rounded-2xl sm:mt-10">
                <div class="flex flex-col items-center justify-center">
                    <IconLogo class="w-[3.25rem] fill-[#00AEF2]"/>
                    <p class="w-full mt-[1.5625rem] mb-10 text-lg font-bold text-center noto"><span class="text-[#00AEF2] rext">GALLERY</span></p>
                </div>
                <div class="hidden mt-5 mb-5 md:block">
                    <p class="flex flex-col items-center justify-center text-2xl font-bold">로그인</p>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="inline-flex flex-col gap-2">
                        <label for="username" class="">이메일</label>
                        <InputText id="id" v-model="idData" placeholder="이메일을 입력해주세요." @keyup.enter="getEnter" class="w-full"/>
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="pw" class="">비밀번호</label>
                        <InputText id="pw" v-model="pwData" placeholder="비밀번호를 입력해주세요." type="password" @keyup.enter="getEnter" class="w-full"/>
                    </div>
                </div>
                <Button label="이메일 로그인" class="w-full mt-6" @click="getLogin"/>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import IconLogo from '@/components/icons/IconLogo.vue'
import BackHeader from '@/components/layouts/BackHeader.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores';

const login     = useLoginStore();
const router    = useRouter();
const idData    = ref('');
const pwData    = ref('');
const visible   = ref(true);

const getEnter = () => {
    const id  = event.target.id;

    if(id === 'id')
    {
        const pw = document.getElementById("pw");

        pw.focus();
    }
    else
    {
        getLogin();
    }
}

const getLogin = async () => {
    const params = {
        id : idData.value, 
        pw : pwData.value
    };
    
    const result = await login.getLogin(params);

    if(result)
    {
        router.push({ path : `/` });
        if (typeof window.ReactNativeWebView !== 'undefined') 
        {
            window.ReactNativeWebView.postMessage(JSON.stringify({ message: 'login success' }));
        }
    }
    else
    {
        alert('로그인 정보가 잘못되었습니다. 입력한 데이터를 확인해주세요.');
    }
}
</script>

<style lang="scss" scoped>

</style>