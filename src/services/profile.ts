import { mockProfile } from '@/mocks/users'
import type { Profile } from '@/entities/profile/model'

export const profileService = {
  get: async (): Promise<Profile> => {
    return mockProfile
  },
}
