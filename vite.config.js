import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
	proxy:{
		'/api':{
			target: 'http://10.249.58.208:3000',
			changeOrigin: true,
			rewrite: path => {
				console.log(path);
				return path.replace(/^\/api/, '');
			}
		}
	},
	define: {
		'process.env': process.env
	}
  }
})
