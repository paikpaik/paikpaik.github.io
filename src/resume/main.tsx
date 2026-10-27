import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Resume from './Resume'
import ResumeV1 from './ResumeV1'

// /resume/?v=1 로 접속하면 이전 버전(프로젝트 상세만 나열하는 구성)을 볼 수 있다
const isV1 = new URLSearchParams(window.location.search).get('v') === '1'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isV1 ? <ResumeV1 /> : <Resume />}
  </StrictMode>,
)
