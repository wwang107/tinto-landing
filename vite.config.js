import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// JS/CSS are inlined into index.html so the built page also works when
// opened directly from disk (file://), where module scripts are blocked.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    emptyOutDir: false,
  },
})
