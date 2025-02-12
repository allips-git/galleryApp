<template>
    <main class="px-4 pt-2 pb-8">
        <div class="flex gap-2 mb-3">
            <Select :options="data['keyword']" v-model="product['gkCd']" optionLabel="name" optionValue="value" placeholder="선택" @change="getList"/>
            <IconField class="w-full">
                <InputIcon class="pi pi-search" />
                <InputText v-model="product['search']" placeholder="제품 이름 검색" class="w-full" @keyup.enter="getList"/>
            </IconField>
        </div>
        <ul class="grid grid-cols-2 gap-x-4 ">
            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in product['list1']" @get-whis="getWhis" :key="index" 
                    @click="getMove(item['gkCd'], item['itemCd'])"/>
            </li>

            <li class="flex flex-col gap-y-4">
                <ProductCard :aspectRatio="false" :item="item" v-for="(item, index) in product['list2']" @get-whis="getWhis" :key="index" 
                    @click="getMove(item['gkCd'], item['itemCd'])"/>
            </li>
        </ul>
    </main>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ProductCard from '@/components/card/ProductCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore, useStateStore, useProductStore } from '@/stores';

const data      = useDataStore();
const state     = useStateStore();
const product   = useProductStore();
const router    = useRouter();

const getMove = async (gkCd: string, itemCd: string) => {
    await state.setGkCd(gkCd);
    await state.setItemCd(itemCd);
    router.push('/product/detail');
};

const getWhis = async (itemCd: string) => {
    await product.getWhis(itemCd).then( async (result) => {
        if(result)
        {
            await getList();
        }
    });
}

const getList = async () => {
    await product.getListReset();
    await product.getList();
}

onMounted(async() => {
    await getList();
})

</script>

<style>

</style>

    