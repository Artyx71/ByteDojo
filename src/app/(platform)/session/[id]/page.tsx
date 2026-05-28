interface SessionPageProps {
  params: Promise<{ id: string }>
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params

  return (
    <main className="flex-1 p-6">
      <h1 className="font-mono text-[var(--text-2)] text-sm uppercase tracking-widest mb-6">
        session / {id}
      </h1>
      <p className="text-[var(--text-3)] font-mono text-xs">— coming soon —</p>
    </main>
  )
}
