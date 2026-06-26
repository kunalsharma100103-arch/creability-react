const TOKEN_KEY  = 'creability_admin_token'
const EXPIRY_KEY = 'creability_admin_expiry'
const TTL_MS     = 24 * 60 * 60 * 1000 // 24 hours

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY,  token)
  localStorage.setItem(EXPIRY_KEY, String(Date.now() + TTL_MS))
}

export function getToken(): string | null {
  const expiry = localStorage.getItem(EXPIRY_KEY)
  if (!expiry || Date.now() > Number(expiry)) {
    clearToken()
    return null
  }
  return localStorage.getItem(TOKEN_KEY)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EXPIRY_KEY)
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}
