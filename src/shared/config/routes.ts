export const routes = {
  dashboard: '/dashboard',
  train:     '/train',
  session:   (id: string) => `/session/${id}`,
  profile:   '/profile',
} as const
