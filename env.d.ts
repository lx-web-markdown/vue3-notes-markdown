/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Support importing raw file content as string, e.g. `import code from './file.vue?raw'`
declare module '*?raw' {
  const src: string
  export default src
}
