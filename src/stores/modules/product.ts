import { defineStore } from 'pinia';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore, useStateStore } from '@/stores';

interface List {
    gkCd        : string;
    itemCd      : string;
    itemNm      : string;
    likeYn      : Y | N;
    filePath    : string;
}

interface IcList {
    icNm : string;
    img  : string;
}

interface Info {
    itemNm      : string;
    colorCnt    : number;
    texture     : string;
    rate        : number;
    etc         : string;
    origin      : string;
    prodChar    : string;
    repImg      : string;
    icList      : IcList[];
}

interface State {
    gkCd        : string;
    search      : string;
    list1       : List[];
    list2       : List[];
    more        : boolean;
    fileIndex   : number;
    info        : Info;
    start       : number;
    limit       : number;
}

const getInfo = (): Info => {
    return {
        itemNm      : '',
        colorCnt    : 0,
        texture     : '',
        rate        : 0,
        etc         : '',
        origin      : '',
        prodChar    : '',
        repImg      : '',
        icList      : []
    }
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const useProductStore = defineStore('product', {
    state: (): State => ({
        gkCd        : '',
        search      : '',
        list1       : [],
        list2       : [],
        more        : true,
        fileIndex   : 0,
        info        : getInfo(),
        start       : 0,
        limit       : 20
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
        async getInfo()
        {
            const state         = useStateStore();
            const params        = {
                gkCd    : state['gkCd'],
                itemCd  : state['itemCd']
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getInfo`, params);

                console.log(res);

                const files     = [];

                const info = {
                    itemNm      : res.data['itemNm'] + res.data['list'].length + '종',
                    colorCnt    : res.data['list'].length,
                    texture     : res.data['texture'],
                    rate        : res.data['rate'],
                    etc         : res.data['etc'],
                    origin      : res.data['origin'],
                    prodChar    : res.data['prodChar'],
                    repImg      : fileUrl + (res.data['list'].length > 0 ? res.data['list'][0]['files'][0]['filePath'] : ''),
                }

                res.data['list'].map(item => {
                    files.push({
                        icNm    : item.icNm,
                        repFile : fileUrl + item.files[0].filePath,
                        files   : item.files.map(file => {
                            return {
                                fileNm  : file.fileNm,
                                filePath: fileUrl + file.filePath
                            }
                        })
                    })
                });

                info['files'] = files;

                this.info = info;
            }
            catch(e)
            {
                console.log(e);
            }
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
        getFileIndex(index: number)
        {
            this.fileIndex = index;
        },
        getListReset()
        {
            this.list1 = [];
            this.list2 = [];
            this.start = 0;
        }
    }
});