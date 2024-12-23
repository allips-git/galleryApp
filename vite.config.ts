import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// vueDevTools(),
export default defineConfig({
  plugins: [
      vue(), 
      //테일윈드 관련 플러그인 ( 테일윈드 플러그인 타입정의가 맞지 않아서 길게 작성)
      {
          name: 'tailwindcss',
          enforce: 'pre',
          async transform(src, id) {
            if (id.endsWith('.css')) {
              return {
                map: null, // return source map if available
              };
            }
          },
        },
        {
          name: 'postcss-import',
          enforce: 'pre',
          async transform(src, id) {
            if (id.endsWith('.css')) {
              return {
                map: null, // return source map if available
              };
            }
          },
        },
        {
          name: 'autoprefixer',
          enforce: 'post',
          async transform(src, id) {
            if (id.endsWith('.css')) {
              return {
                map: null, // return source map if available
              };
            }
          },
        },  
    ],

    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
          // formsPackage.default,
        ],
      },
    },
    
  resolve: {
      alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
  },
  define: {
    'global': {}
  }
  
})