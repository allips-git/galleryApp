/**
 * @description 각 화면 팝업 관리 모듈 pinia
 */
import { defineStore } from 'pinia';

/** 리스트 데이터 */
interface Pop {
    confirm     : boolean;
    productSpec : boolean;
}

interface State {
    pop  : Pop,
    list : []
}

const getPopInfo = (): Pop => {
    return {
        confirm     : false,
        productSpec : false
    }
}

export const usePopupStore = defineStore('popup', {
    state: (): State => ({
        pop  : getPopInfo(),
        list : []
    }),
    actions: {
        getOpen(popNm : string)
        {
            this.pop[popNm] = true;

            const index = this.list.indexOf(popNm);

            if(index !== -1)
            {
                this.list.splice(index, 1);
            }

            this.list.push(popNm);
        },
        getClose(popNm : string)
        {
            this.pop[popNm] = false;

            const index = this.list.indexOf(popNm);

            if(index !== -1)
            {
                this.list.splice(index, 1);
            }
        },
        getReset()
        {
            this.pop = getPopInfo();
        }
    }
});