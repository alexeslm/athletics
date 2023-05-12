// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    base: '/atletika/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                product: resolve(__dirname, 'product/index.html'),
                brands: resolve(__dirname, 'brands/index.html'),
                brandDetail: resolve(__dirname, 'brand-detail/index.html'),
                articles: resolve(__dirname, 'articles/index.html'),
            },
        },
    },
})