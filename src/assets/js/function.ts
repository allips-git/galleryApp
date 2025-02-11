import { useLoginStore } from '@/stores';
import router from '@/router';
import axios from 'axios';

/**
 * @description axios 통신
 */
export const getAxiosData = async () => {
    const loginStore = useLoginStore();

    const token: string | null          = loginStore.accessToekn;
    const refreshToken: string | null   = loginStore.refreshToken;

    const instance = axios.create({
        withCredentials : true,
        headers         : {
            'Authorization': 'Bearer ' + token,
            'Refresh-Token': refreshToken
        }
    });

    return instance;
};

export const getTokenOut = () => {
    const loginStore = useLoginStore();

    alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
    loginStore.getLogout();
    router.push('/login');
}