import { useState, useRef, useEffect } from 'react'
import { saveToken } from './auth'

const API = '/api/auth/login.php'

interface Props { onLogin: () => void }

export default function AdminLogin({ onLogin }: Props) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPw,   setShowPw]   = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => { emailRef.current?.focus() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)

    // Dev-only bypass — Vite strips this block entirely in production builds
    if (import.meta.env.DEV &&
        email === 'admin@creabilitysolutions.com' &&
        password === 'Admin@1234') {
      saveToken('dev-preview-token')
      onLogin()
      setLoading(false)
      return
    }

    try {
      const res  = await fetch(API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.token) {
        setError(data.error ?? 'Invalid credentials. Please try again.')
        return
      }
      saveToken(data.token)
      onLogin()
    } catch {
      setError('Cannot reach the server. Check your connection or backend setup.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="al-root">
      {/* Ambient background */}
      <div className="al-bg" aria-hidden>
        <div className="al-bg-grid" />
        <div className="al-glow al-glow--1" />
        <div className="al-glow al-glow--2" />
        <div className="al-glow al-glow--3" />
      </div>

      <div className="al-card">
        {/* Brand */}
        <div className="al-brand-row">
          <div className="al-brand-mark">C</div>
          <div className="al-brand-text">
            <span className="al-brand-name">Creability<em>Solutions</em></span>
            <span className="al-brand-sub">Admin Portal</span>
          </div>
        </div>

        <h1 className="al-heading">Welcome back</h1>
        <p className="al-sub">Sign in to manage your website content</p>

        <form className="al-form" onSubmit={handleSubmit} noValidate>
          <div className="al-field">
            <label className="al-label" htmlFor="al-email">Email address</label>
            <input
              id="al-email"
              ref={emailRef}
              className="al-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@creabilitysolutions.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="al-field">
            <label className="al-label" htmlFor="al-pw">Password</label>
            <div className="al-pw-wrap">
              <input
                id="al-pw"
                className="al-input"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="al-eye"
                onClick={() => setShowPw(p => !p)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="al-error" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button className="al-submit" type="submit" disabled={loading}>
            {loading ? <span className="al-spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="al-lockline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:12,height:12,opacity:.4}}>
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secured admin access · creabilitysolutions.com
        </p>
      </div>
    </div>
  )
}
