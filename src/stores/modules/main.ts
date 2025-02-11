import { defineStore } from 'pinia';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

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
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const useMainStore = defineStore('main', {
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
        }
    }
});