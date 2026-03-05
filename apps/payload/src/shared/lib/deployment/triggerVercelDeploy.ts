export async function triggerVercelDeploy() {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL

  if (!hookUrl) return

  try {
    const res = await fetch(hookUrl, { method: 'POST' })

    if (!res.ok) {
      console.error(`Vercel Deploy Hook failed: ${res.status} ${res.statusText}`)
    }
  } catch (error) {
    console.error('Vercel Deploy Hook request failed:', error)
  }
}
