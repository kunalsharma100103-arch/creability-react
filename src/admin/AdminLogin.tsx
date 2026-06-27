import { useState, useRef, useEffect } from 'react'
import { saveToken } from './auth'

const API = '/api/auth/login.php'

interface Props { onLogin: () => void }

type Mode = 'login' | 'reset-key' | 'reset-pw' | 'reset-done'

export default function AdminLogin({ onLogin }: Props) {
  const [mode,      setMode]      = useState<Mode>('login')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [showPw,    setShowPw]    = useState(false)
  // reset flow
  const [resetKey,  setResetKey]  = useState('')
  const [newPw,     setNewPw]     = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const emailRef    = useRef<HTMLInputElement>(null)
  const resetKeyRef = useRef<HTMLInputElement>(null)
  const newPwRef    = useRef<HTMLInputElement>(null)

  useEffect(() => { emailRef.current?.focus() }, [])
  useEffect(() => {
    if (mode === 'reset-key') resetKeyRef.current?.focus()
    if (mode === 'reset-pw')  newPwRef.current?.focus()
  }, [mode])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)

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
      setError('Cannot reach the server. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResetKey(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!resetKey.trim()) { setError('Enter your reset key'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset_key: resetKey, new_password: 'checking_key' }),
      })
      await res.json()
      if (res.status === 403) { setError('Wrong reset key. Check your JWT_SECRET in config.php.'); setLoading(false); return }
      setMode('reset-pw')
    } catch {
      setError('Cannot reach the server.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPw(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (newPw.length < 6)       { setError('Password must be at least 6 characters'); return }
    if (newPw !== confirmPw)    { setError('Passwords do not match'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset_key: resetKey, new_password: newPw }),
      })
      const data = await res.json()
      if (!data.ok) { setError(data.error ?? 'Reset failed'); return }
      setMode('reset-done')
    } catch {
      setError('Cannot reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="al-root">
      <div className="al-bg" aria-hidden>
        <div className="al-bg-grid" />
        <div className="al-glow al-glow--1" />
        <div className="al-glow al-glow--2" />
        <div className="al-glow al-glow--3" />
      </div>

      <div className="al-card">
        <div className="al-brand-row">
          <div className="al-brand-mark">C</div>
          <div className="al-brand-text">
            <span className="al-brand-name">Creability<em>Solutions</em></span>
            <span className="al-brand-sub">Admin Portal</span>
          </div>
        </div>

        {/* ── LOGIN ── */}
        {mode === 'login' && (
          <>
            <h1 className="al-heading">Welcome back</h1>
            <p className="al-sub">Sign in to manage your website content</p>
            <form className="al-form" onSubmit={handleLogin} noValidate>
              <div className="al-field">
                <label className="al-label" htmlFor="al-email">Email address</label>
                <input id="al-email" ref={emailRef} className="al-input" type="email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@creabilitysolutions.com" autoComplete="email" required />
              </div>
              <div className="al-field">
                <label className="al-label" htmlFor="al-pw">Password</label>
                <div className="al-pw-wrap">
                  <input id="al-pw" className="al-input" type={showPw ? 'text' : 'password'}
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••" autoComplete="current-password" required />
                  <button type="button" className="al-eye" onClick={() => setShowPw(p => !p)}>
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
            <p style={{textAlign:'center',marginTop:16}}>
              <button className="al-forgot" onClick={() => { setError(''); setMode('reset-key') }}>
                Forgot password?
              </button>
            </p>
          </>
        )}

        {/* ── RESET STEP 1: enter reset key ── */}
        {mode === 'reset-key' && (
          <>
            <h1 className="al-heading">Reset Password</h1>
            <p className="al-sub">Enter your JWT Secret key to verify it's you. Find it in <code style={{fontSize:11,opacity:.7}}>config.php</code> on the server.</p>
            <form className="al-form" onSubmit={handleResetKey} noValidate>
              <div className="al-field">
                <label className="al-label">JWT Secret Key</label>
                <input ref={resetKeyRef} className="al-input" type="password"
                  value={resetKey} onChange={e => setResetKey(e.target.value)}
                  placeholder="Paste your JWT_SECRET here" />
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
                {loading ? <span className="al-spinner" /> : 'Verify Key'}
              </button>
            </form>
            <p style={{textAlign:'center',marginTop:16}}>
              <button className="al-forgot" onClick={() => { setError(''); setMode('login') }}>← Back to login</button>
            </p>
          </>
        )}

        {/* ── RESET STEP 2: set new password ── */}
        {mode === 'reset-pw' && (
          <>
            <h1 className="al-heading">New Password</h1>
            <p className="al-sub">Choose a new password for your admin account.</p>
            <form className="al-form" onSubmit={handleResetPw} noValidate>
              <div className="al-field">
                <label className="al-label">New Password</label>
                <input ref={newPwRef} className="al-input" type="password"
                  value={newPw} onChange={e => setNewPw(e.target.value)}
                  placeholder="Min. 6 characters" autoComplete="new-password" />
              </div>
              <div className="al-field">
                <label className="al-label">Confirm Password</label>
                <input className="al-input" type="password"
                  value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                  placeholder="Repeat password" autoComplete="new-password" />
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
                {loading ? <span className="al-spinner" /> : 'Set New Password'}
              </button>
            </form>
          </>
        )}

        {/* ── RESET DONE ── */}
        {mode === 'reset-done' && (
          <>
            <div style={{textAlign:'center',padding:'12px 0 24px'}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:'rgba(46,204,113,.12)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" style={{width:28,height:28}}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h1 className="al-heading" style={{marginBottom:8}}>Password Updated</h1>
              <p className="al-sub" style={{marginBottom:24}}>Your password has been changed successfully.</p>
              <button className="al-submit" style={{maxWidth:240,margin:'0 auto'}}
                onClick={() => { setMode('login'); setNewPw(''); setConfirmPw(''); setResetKey(''); setError('') }}>
                Back to Login
              </button>
            </div>
          </>
        )}

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
