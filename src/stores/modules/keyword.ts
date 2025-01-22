import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useStateStore, useLoginStore } from '@/stores';

interface ProductList {
    faCd        : string;
    faNm        : string;
    filePath    : string;
}

interface List {
    gkGb        : string;
    gkNm        : string;
    productList : ProductList[];
}

interface State {
    search  : string;
    list    : List[];
}

export const useKeywordStore = defineStore('keyword', {
    state: (): State => ({
        search  : '',
        list    : []
    }),
    actions: {
        async getData()
        {
            const stateStore    = useStateStore();
            const loginStore    = useLoginStore();
            const params        = {
                gkCd    : stateStore['gkGb'],
                code    : loginStore['code'],
                search  : this.search
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getAllFileList`, params);

                const list      = [];
                console.log(res);

                // res.data.map(item => {
                //     list.push({
                //         gkGb        : item.gkGb,
                //         gkNm        : item.gkNm,
                //         productList : item.productList.map(product => {
                //             return {
                //                 faCd        : product.faCd,
                //                 faNm        : product.faNm,
                //                 filePath    : product.filePath
                //             }
                //         })
                //     });
                // });

                this.list = list;
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});