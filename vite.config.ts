import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import alias from '@rollup/plugin-alias'
// 按需导入ep
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [
    vue(),
    alias(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue'], dts: 'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      // 使用style-resources-loader 自动导入项目中的scss变量和mixins
      scss: {
        // additionalData: `
        //   @import "@/assets/styles/common.scss";
        // `
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 1024,
    open: true,
    cors: true, // 允许ajax跨域
    proxy: {
      '/openData': {
        // target: `http://fz.hthuandian.cn/analyse`,
        target: `http://hthd.hthuandian.cn/analyse`,
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace('/^\/openData/', '')
        // ws: true,  // 如果要代理 websockets,需要配置这个参数
        // secure: true,  // 如果是https接口,需要配置这个参数
      }
    },
  }
})