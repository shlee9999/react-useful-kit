import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
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
        // CSS를 별도 파일로도 추출;
        assetFileNames: assetInfo => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'react-useful-kit.css'
          }
          return assetInfo.name || 'assets/[name].[ext]'
        },
      },
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },
    // CSS를 별도 파일로 추출
    cssCodeSplit: false,
  },
  plugins: [
    react(),
    svgr(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}'],
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
})
