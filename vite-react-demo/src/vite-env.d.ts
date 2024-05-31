/// <reference types="vite/client" />

declare interface EnvConfig {
  [key: string]: any
  VITE_APP_TITLE: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_IMAGE_BASE_URL: string
}

interface ImportMetaEnv extends Readonly<EnvConfig> {}

type Module = { readonly [key: string]: any }
