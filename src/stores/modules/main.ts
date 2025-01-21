import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface State {
    search  : string;
    list    : [];
}

export const useMainStore = defineStore('main', {
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
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getFileList`, params);

                console.log(res);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});