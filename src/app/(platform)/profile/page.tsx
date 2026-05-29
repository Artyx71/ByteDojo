import { profileService } from '@/services/profile'
import { ProfileView } from './ProfileView'

export default async function ProfilePage() {
  const profile = await profileService.get()
  return <ProfileView profile={profile} />
}
