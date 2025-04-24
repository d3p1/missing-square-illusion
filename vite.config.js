import tailwindcss from '@tailwindcss/vite'

export default {
  root: 'src/',
  base: '/missing-square-illusion/',
  server: {
    host: true,
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    tailwindcss(),
  ]
}
