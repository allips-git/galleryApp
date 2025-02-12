import { defineStore } from 'pinia';

interface State {
    code    : string;
    codeNm  : string;
    itemGb  : string;
    itemGbNm: string;
    gkGb    : string;
    gkNm    : string;
    gkCd    : string;
    faCd    : string;
    faNm    : string;
    itemCd  : string;
    itemNm  : string;
}

export const useStateStore = defineStore('state', {
    state: (): State => ({
        code    : '',
        codeNm  : '',
        itemGb  : '',
        itemGbNm: '',
        gkGb    : '',
        gkNm    : '',
        gkCd    : '',
        faCd    : '',
        faNm    : '',
        itemCd  : '',
        itemNm  : ''
    }),
    actions: {
        setCode(code: string)
        {
            this.code = code;
        },
        setCodeNm(codeNm: string)
        {
            this.codeNm = codeNm
        },
        setItemGb(itemGb: string)
        {
            this.itemGb = itemGb
        },
        setItemGbNm(itemGbNm: string)
        {
            this.itemGbNm = itemGbNm;
        },
        setGkGb(gkGb: string)
        {
            this.gkGb = gkGb;
        },
        setGkNm(gkNm: string)
        {
            console.log(gkNm);
            this.gkNm = gkNm;
        },
        setGkCd(gkCd: string)
        {
            this.gkCd = gkCd;
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