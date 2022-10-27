import type { Prisma, Post } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'
import { onePost } from 'src/lib/makers'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: { data: onePost(1) },
    two: { data: onePost(2) },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
