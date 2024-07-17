import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'




// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_PREFIX_PATH;
  return defineConfig({
    plugins: [react()],
    base: base,
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          nested: resolve(__dirname, 'pages/games/index.html'),
          gamesDesktop: resolve(__dirname, 'pages/games-desktop/index.html'),
        },
      },
    },
  })
}
