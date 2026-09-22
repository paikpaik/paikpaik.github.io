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

// 이 배열의 숫자 순서대로 Projects 섹션에 표시됩니다
export const projectOrder = [11, 12, 5, 1, 7, 6, 8, 4, 9, 10, 3, 2]

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
