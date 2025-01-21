import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

// import { useDataStore } from './modules/data';
// import { usePopupStore } from './modules/popup';
import { useLoginStore } from './modules/login';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
    app.use(pinia);
}

export {
    pinia,
    useLoginStore
};