import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
    state: () => {
        return {
            keyword : [
                { name  : '전체', value : '' },
                { name  : '롤스크린', value : 'GK0001' },
                { name  : '콤비 블라인드', value : 'GK0002' },
                { name  : '트리플 쉐도우', value : 'GK0003' },
                { name  : '우드 블라인드', value : 'GK0004' },
                { name  : '레이저 블라인드', value : 'GK0005' },
                { name  : '유니슬랫', value : 'GK0006' },
                { name  : '버티컬', value : 'GK0007' },
                { name  : '린넨 커튼', value : 'GK0008' },
                { name  : '암막 커튼', value : 'GK0009' },
                { name  : '기타 커튼', value : 'GK0010' }
            ]
        };
    },
});
