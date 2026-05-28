export const routes = {
  dashboard: '/',
  train:     '/train',
  session:   (id: string) => `/session/${id}`,
  profile:   '/profile',
} as const
