import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface ProductList {
    itemCd      : string;
    itemNm      : string;
    filePath    : string;
}

interface List {
    gkCd    : string;
    gkNm    : string;
    list    : ProductList[];
}

interface State {
    search  : string;
    list    : List[];
}

export const usePopularStore = defineStore('popular', {
    state: (): State => ({
        search  : '',
        list    : []
    }),
    actions: {
        async getData()
        {
            const loginStore    = useLoginStore();
            const params        = {
                code    : loginStore['code'],
                search  : this.search
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getPopularList`, params);

                const list      = [];
                console.log(res);

                res.data.map(item => {
                    if(item.list)
                    {
                        list.push({
                            gkCd    : item.gkCd,
                            gkNm    : item.gkNm,
                            list    : item.list ? item.list.map(product => {
                                return {
                                    itemCd      : product.itemCd,
                                    itemNm      : product.itemNm,
                                    filePath    : product.filePath
                                }
                            }) : []
                        });
                    }
                });

                this.list = list;
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});