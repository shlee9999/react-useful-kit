import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-useful-kit',
      fileName: format => `react-useful-kit.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },
  },
  plugins: [
    react(),
    svgr(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/App.tsx', // 개발용 데모 App
        'src/styles/app.css', // App CSS
        'src/main.tsx', // 개발용 진입점
        'src/examples/**/*', // 데모 예제들
        'src/vite-env.d.ts', // Vite 환경 타입
        'src/components/ExampleCard.tsx',
      ],
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: './tsconfig.lib.json',
    }),
    tsconfigPaths(),
  ],
})
