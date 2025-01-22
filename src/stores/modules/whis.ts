import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface List {
    itemCd      : string;
    itemNm      : string;
    filePath    : string;
}

interface State {
    search  : string;
    list1   : List[];
    list2   : List[];
}

export const useWhisStore = defineStore('whis', {
    state: (): State => ({
        search  : '',
        list1   : [],
        list2   : []
    }),
    actions: {
        async getList()
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
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getLikeList`, params);

                console.log(res);

                const list1 = [];
                const list2 = [];

                res.data.map((item, index) => {
                    const list = {
                        itemCd      : item.itemCd,
                        itemNm      : item.itemNm,
                        filePath    : item.filePath
                    };
                    
                    if(index % 2 === 0)
                    {
                        list1.push(list);
                    }
                    else
                    {
                        list2.push(list);
                    }
                });

                this.list1 = list1;
                this.list2 = list2;
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});