import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
    accessToekn     : string | null;
    refreshToken    : string | null;
    type            : string | null;
    code            : string | null;
    userCd          : string | null;
    name            : string;
}

export const useLoginStore = defineStore('login', {
    state: (): State => ({
        accessToekn     : null,
        refreshToken    : null,
        type            : null,
        code            : null,
        userCd          : null,
        name            : ''
    }),
    actions: {
        async getLogin(params) {
            try 
            {
                const res  = await axios.post('https://gallery-data.plansys.kr/login/loginCheck', params, { withCredentials: true });

                console.log(res);

                this.accessToekn    = res.data.token;
                this.refreshToken   = res.data.refreshToken;
                this.type           = res.data.type;
                this.code           = res.data.code;
                this.userCd         = res.data.userCd;
                this.name           = res.data.name;


                return true;
            }
            catch(e)
            {
                console.log(e);
                return false;
            }
        },
        async getLogout()
        {
            
        },
        getToken(token: string)
        {
            this.token = token;
        }
    },
    persist: {
        key     : 'galleryLogin',
        storage : localStorage
    }
});