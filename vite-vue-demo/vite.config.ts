import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import getEnv from './build/getEnv'
import { fileURLToPath } from 'node:url'
// const postcssPresetEnv = require('postcss-preset-env')

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root, 'VITE')

  // 获取环境变量
  const { VITE_OPEN, VITE_PORT, VITE_DROP_CONSOLE } = getEnv(env)

  return {
    root,
    server: {
      port: VITE_PORT,
      open: VITE_OPEN,
    },
    plugins: [vue()],
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : undefined,
      // pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      // 自动注入一个 模块预加载 polyfill
      // modulePreload: {
      //   polyfill: true
      // },
      rollupOptions: {
        external: ['vue', 'lodash-es'],
        output: {
          globals: {
            vue: 'Vue',
            'lodash-es': '_',
          },
          paths: {
            vue: 'https://cdn.jsdelivr.net/npm/vue@3.4.27/+esm',
            'lodash-es': 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm',
          },
          manualChunks(id: string) {
            if (id.includes('lodash-es')) {
              return 'lodash-es'
            }
            if (id.includes('node_modules/vue')) {
              return 'vue'
            }
          },
          // manualChunks: {
          //   vue: ['vue'],
          //   'lodash-es': ['lodash-es'],
          // },
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames(chunkInfo) {
            if (chunkInfo.name?.endsWith('.css')) {
              return 'css/[name].[hash].[ext]'
            }
            const imageExt = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']
            if (imageExt.some((img) => chunkInfo.name?.endsWith(img))) {
              return 'imgs/[name].[hash].[ext]'
            }
            return 'assets/[name].[hash].[ext]'
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
      // postcss: {
      //   plugins: [
      //     postcssPresetEnv({
      //       browsers: ['last 2 versions', '> 1%', 'not ie < 11'],
      //       autoprefixer: {
      //         grid: true,
      //       },
      //     }),
      //   ],
      // },
    },
  }
})
