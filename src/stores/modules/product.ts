import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface Info {
    code    : string;
    itemNm  : string;
    /** 암막율 / 기타부속 / 원재료 국가 / 제품특성 */
}

interface State {
    search  : string;
    itemCd  : string;
    list    : [];
    info    : Info;
}

const getInfo = (): Info => {
    return {
        code    : '',
        itemNm  : ''
    }
}

export const useProductStore = defineStore('product', {
    state: (): State => ({
        search  : '',
        itemCd  : '',
        list    : [],
        info    : getInfo()
    }),
    actions: {
        async getList()
        {

        },
        async getInfo()
        {

        }
    }
});