// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    base: '/atletika/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
})