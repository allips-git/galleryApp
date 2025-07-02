import { defineStore } from 'pinia';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface ProductList {
    faCd        : string;
    faNm        : string;
    filePath    : string;
}

interface SearchList {
    gkCd        : string;
    itemCd      : string;
    itemNm      : string;
    likeYn      : Y | N;
    filePath    : string;
}

interface List {
    gkGb        : string;
    gkNm        : string;
    productList : ProductList[];
}

interface State {
    search      : string;
    searchList1 : SearchList[];
    searchList2 : SearchList[];
    more        : boolean;
    list        : List[];
    start       : number;
    limit       : number;
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const useMainStore = defineStore('main', {
    state: (): State => ({
        search      : '',
        searchList1 : [],
        searchList2 : [],
        more        : true,
        list        : [],
        start       : 0,
        limit       : 20
    }),
    actions: {
        async getSearch()
        {
            const loginStore    = useLoginStore();
            const params        = {
                myCode  : loginStore['code'],
                search  : this.search,
                start   : this.start,
                limit   : this.limit
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getAppItemSearch`, params);

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

                this.searchList1  = [...this.searchList1, ...list1];
                this.searchList2  = [...this.searchList2, ...list2];

                this.start = this.start + 20;

                if(res.data.length === 0)
                {
                    this.more = false;
                }
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
                    alert('제품 정보 조회 중 오류가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        },
        async getData()
        {
            const loginStore    = useLoginStore();
            const params        = {
                code    : loginStore['code']
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getMain`, params);

                const list      = [];
                console.log(res);

                res.data.map(item => {
                    list.push({
                        gkGb        : item.gkGb,
                        gkNm        : item.gkNm,
                        productList : item.productList.map(product => {
                            return {
                                faCd        : product.faCd,
                                faNm        : product.faNm,
                                filePath    : fileUrl + product.filePath
                            }
                        })
                    });
                });

                this.list = list;
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
                    alert('제품 정보 조회 중 오류가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        },
        getSearchReset()
        {
            this.searchList1    = [];
            this.searchList2    = [];
            this.start          = 0;
        }
    }
});