import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // 메인 포트폴리오(/)와 인쇄용 이력서(/resume/)를 각각 별도 페이지로 빌드
      input: {
        main: 'index.html',
        resume: 'resume/index.html',
      },
    },
  },
})
