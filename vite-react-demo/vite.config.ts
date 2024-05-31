import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import getEnv from './build/getEnv'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
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
    plugins: [react()],
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : undefined,
      // pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
