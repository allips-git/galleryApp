import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface List {
    gkCd        : string;
    itemCd      : string;
    itemNm      : string;
    likeYn      : Y | N;
    filePath    : string;
}

interface State {
    list1   : List[];
    list2   : List[];
    more    : boolean;
    start   : number;
    limit   : number;
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const useNewPostStore = defineStore('newPost', {
    state: (): State => ({
        list1   : [],
        list2   : [],
        more    : true,
        start   : 0,
        limit   : 20
    }),
    actions: {
        async getList()
        {
            const loginStore    = useLoginStore();
            const params        = {
                code    : loginStore['code'],
                start   : this.start,
                limit   : this.limit
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getNewItemList`, params);

                console.log(res);

                const list1     = [];
                const list2     = [];

                res.data.map((item, index) => {
                    const list = {
                        gkCd        : item.gkCd,
                        itemCd      : item.itemCd,
                        itemNm      : item.itemNm,
                        likeYn      : item.likeYn,
                        filePath    : fileUrl + item.filePath
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

                this.list1  = [...this.list1, ...list1];
                this.list2  = [...this.list2, ...list2];

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
            this.list1 = [];
            this.list2 = [];
            this.start = 0;
        }
    }
});