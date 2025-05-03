/// <reference types='vite/client' />
/// <reference types='vite-plugin-svgr/client' />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_WS_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
