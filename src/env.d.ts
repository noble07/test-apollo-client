/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APOLLO_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}