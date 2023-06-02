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
                articlesDetail: resolve(__dirname, 'articles-detail/index.html'),
                company: resolve(__dirname, 'company/index.html'),
                reviews: resolve(__dirname, 'reviews/index.html'),
                career: resolve(__dirname, 'career/index.html'),
                cooperation: resolve(__dirname, 'cooperation/index.html'),
                employees: resolve(__dirname, 'employees/index.html'),
                directorySection: resolve(__dirname, 'directory-section/index.html'),
                franchise: resolve(__dirname, 'franchise/index.html'),
                employeesDetail: resolve(__dirname, 'employees-detail/index.html'),
            },
        },
    },
})