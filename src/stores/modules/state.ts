import { defineStore } from 'pinia';

interface State {
    gkGb    : string;
    gkNm    : string;
    faCd    : string;
    faNm    : string;
    itemCd  : string;
    itemNm  : string;
}

export const useStateStore = defineStore('state', {
    state: (): State => ({
        gkGb    : '',
        gkNm    : '',
        faCd    : '',
        faNm    : '',
        itemCd  : '',
        itemNm  : ''
    }),
    actions: {
        setGkGb(gkGb: string)
        {
            this.gkGb = gkGb;
        },
        setGkNm(gkNm: string)
        {
            this.gkNm = gkNm;
        },
        setFaCd(faCd: string)
        {
            this.faCd = faCd;
        },
        setFaNm(faNm: string)
        {
            this.faNm = faNm;
        },
        setItemCd(itemCd: string)
        {
            this.itemCd = itemCd;
        },
        setItemNm(itemNm: string)
        {
            this.itemNm = itemNm;
        }
    },
    persist: {
        key     : 'galleryState',
        storage : localStorage
    }
});