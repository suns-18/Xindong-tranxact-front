import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import {PrimeVueResolver} from "unplugin-vue-components/resolvers";
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: "http://localhost:8100",
                changeOrigin: true,
                cookiePathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})
