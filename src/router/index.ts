import { createWebHistory, createRouter, } from "vue-router";

// RouteMeta 인터페이스 정의
interface RouteMeta {
    showTopHeader?: boolean; // showTopHeader 메타 필드 정의
    showAppFooter?: boolean;
    showBackHeader?: boolean
    title:string;
  }

import Login from "@/views/LoginPage.vue";
import Index from "@/views/index.vue";
import popular from "@/views/popular.vue";
import whis from "@/views/whis.vue";
import newPost from "@/views/newPost.vue";
import keyword from "@/views/keyword.vue";
import product from "@/views/product/product.vue";
import productDetail from "@/views/product/productDetail.vue";


const routes = [

    {
        path: "/login",
        name: "LoginPage",
        component: Login,
        meta: { showTopHeader: false, showAppFooter: false } as RouteMeta 
    },
    {
        path: "/",
        name: "MainPage",
        component: Index,
        meta: { showTopHeader: true, showAppFooter: true } as RouteMeta 
    },

    {
        path: "/popular",
        name: "popular",
        component: popular,
        meta: { showTopHeader: true, showAppFooter: true } as RouteMeta 
    },

    {
        path: "/whis",
        name: "whis",
        component: whis,
        meta: { showTopHeader: true, showAppFooter: true } as RouteMeta 
    },

    {
        path: "/new_post",
        name: "newPost",
        component: newPost,
        meta: { showTopHeader: true, showAppFooter: true } as RouteMeta 
    },
    {
        path: "/keyword",
        name: "keyword",
        component: keyword,
        meta: { showTopHeader: false, showAppFooter: false, title: "차양" } as RouteMeta 
    },

    {
        path: "/product",
        name: "product",
        component: product,
        meta: { showTopHeader: false, showAppFooter: false, title: "제품선택" } as RouteMeta 
    },

    {
        path: "/product/detail",
        name: "productDetail",
        component: productDetail,
        meta: { showTopHeader: false, showAppFooter: false, title: "세븐크리스 7종" } as RouteMeta 
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 항상 맨 위로 스크롤
        return { top: 0 };
      },
});


export default router