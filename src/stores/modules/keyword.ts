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
    list    : List[];
    more    : boolean;
    start   : number;
    limit   : number;
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const useKeywordStore = defineStore('keyword', {
    state: (): State => ({
        list    : [],
        more    : true,
        start   : 0,
        limit   : 20
    }),
    actions: {
        async getList()
        {
            const stateStore    = useStateStore();
            const loginStore    = useLoginStore();
            const params        = {
                code    : loginStore['code'],
                itemGb  : stateStore['itemGb']
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getFactoryGbList`, params);

                const list      = [];
                console.log(res);

                res.data.map(item => {
                    list.push({
                        code        : item.code,
                        codeNm      : item.codeNm,
                        filePath    : fileUrl + item.filePath
                    });
                });

                this.list  = [...this.list, ...list];
                this.start = this.start + 20;

                if(res.data.length === 0)
                {
                    this.more = false;
                }
            }
            catch(e)
            {
                console.log(e);
            }
        },
        getListReset()
        {
            this.list  = [];
            this.start = 0;
        }
    }
});