import { useLoginStore } from '@/stores';
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