import { defineStore } from 'pinia';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore, useStateStore } from '@/stores';

interface List {
    itemCd      : string;
    itemNm      : string;
    likeYn      : Y | N;
    filePath    : string;
}
interface Info {
    code    : string;
    itemNm  : string;
    /** 암막율 / 기타부속 / 원재료 국가 / 제품특성 */
}

interface State {
    gkCd    : string;
    search  : string;
    list1   : List[];
    list2   : List[];
    more    : boolean;
    info    : Info;
    start   : number;
    limit   : number;
}

const getInfo = (): Info => {
    return {
        code    : '',
        itemNm  : ''
    }
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const useProductStore = defineStore('product', {
    state: (): State => ({
        gkCd    : '',
        search  : '',
        list1   : [],
        list2   : [],
        more    : true,
        info    : getInfo(),
        start   : 0,
        limit   : 20
    }),
    actions: {
        async getList()
        {
            const loginStore    = useLoginStore();
            const state         = useStateStore();
            const params        = {
                myCode  : loginStore['code'],
                othCode : state['code'],
                gkCd    : this.gkCd,
                search  : this.search,
                start   : this.start,
                limit   : this.limit
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getAppItemList`, params);

                console.log(res);

                const list1     = [];
                const list2     = [];

                res.data.map((item, index) => {
                    const list = {
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
        async getInfo()
        {

        },
        async getWhis(itemCd: string)
        {
            const loginStore    = useLoginStore();
            const params        = {
                code    : loginStore['code'],
                itemCd  : itemCd
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.put(`https://gallery-data.plansys.kr/keyword/addLikeList`, params);

                return true;
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    getTokenOut();
                }
                else
                {
                    alert('찜 처리 중 오류가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }

                return false;
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