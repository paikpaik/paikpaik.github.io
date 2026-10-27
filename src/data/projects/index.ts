import type { Project } from '../types'
import { aiCodingPlatform } from './01-ai-coding-platform'
import { partnerAdmin } from './02-partner-admin'
import { ismsRbac } from './03-isms-rbac'
import { adMediationSdk } from './04-ad-mediation-sdk'
import { obsidianClaudian } from './05-obsidian-claudian'
import { monitoring } from './06-monitoring'
import { fastifyMigration } from './07-fastify-migration'
import { redisRewardApi } from './08-redis-reward-api'
import { rewardContentPlatform } from './09-reward-content-platform'
import { partnerPointWebapp } from './10-partner-point-webapp'
import { forgeEcosystem } from './11-forge-ecosystem'
import { bedrockOfferwall } from './12-bedrock-offerwall'

// 이 배열의 숫자 순서대로 Projects·Troubleshooting 섹션에 표시됩니다 (빠진 id는 숨김)
export const projectOrder = [9, 8, 7, 6, 4, 10, 3, 2, 11, 5]

// Experience 섹션에 클릭 없이 펼쳐 보여줄 대표 실무 프로젝트 (highlight 필드 필수)
export const featuredProjectIds = [9, 7, 6]

export const projects: Project[] = [
  aiCodingPlatform,
  partnerAdmin,
  ismsRbac,
  adMediationSdk,
  obsidianClaudian,
  monitoring,
  fastifyMigration,
  redisRewardApi,
  rewardContentPlatform,
  partnerPointWebapp,
  forgeEcosystem,
  bedrockOfferwall,
]

const byId = (id: number) => projects.find((p) => p.id === id)
const isProject = (p: Project | undefined): p is Project => p !== undefined

export const visibleProjects = projectOrder.map(byId).filter(isProject)

export const featuredProjects = featuredProjectIds.map(byId).filter(isProject)
