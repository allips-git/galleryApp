import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

// import { usePopupStore } from './modules/popup';
import { useLoginStore } from './modules/login';
import { useDataStore } from './modules/data';
import { usePopupStore } from './modules/popup';
import { useStateStore } from './modules/state';
import { useMainStore } from './modules/main';
import { useKeywordStore } from './modules/keyword';
import { usePopularStore } from './modules/popular';
import { useWhisStore } from './modules/whis';
import { useProductStore } from './modules/product';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
    app.use(pinia);
}

export {
    pinia,
    useLoginStore,
    useDataStore,
    usePopupStore,
    useStateStore,
    useMainStore,
    useKeywordStore,
    usePopularStore,
    useWhisStore,
    useProductStore
};