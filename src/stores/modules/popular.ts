import { defineStore } from 'pinia';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface ProductList {
    gkCd        : string;
    itemCd      : string;
    itemNm      : string;
    likeYn      : Y | N;
    filePath    : string;
}

interface List {
    itemGb      : string;
    itemGbNm    : string;
    list        : ProductList[];
}

interface State {
    list    : List[];
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const usePopularStore = defineStore('popular', {
    state: (): State => ({
        list    : []
    }),
    actions: {
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
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getPopularList`, params);

                const list      = [];
                console.log(res);

                res.data.map(item => {
                    if(item.list)
                    {
                        list.push({
                            itemGb      : item.itemGb,
                            itemGbNm    : item.itemGbNm,
                            list        : item.list ? item.list.map(product => {
                                return {
                                    gkCd        : product.gkCd,
                                    itemCd      : product.itemCd,
                                    itemNm      : product.itemNm,
                                    likeYn      : product.likeYn,
                                    filePath    : fileUrl+product.filePath
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
                if(e.response.status === 401)
                {
                    getTokenOut();
                }
                else
                {
                    alert('제품 정보 조회 중 오류가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    }
});