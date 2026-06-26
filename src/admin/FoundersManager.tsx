import { useState, useEffect } from 'react'
import { getToken } from './auth'
import ImageUpload from './ImageUpload'

interface Founder {
  id: number
  name: string
  role: string
  bio: string
  image: string
  email: string
  linkedin: string
  twitter: string
  website: string
  sort_order: number
  is_active: number
}

const EMPTY: Omit<Founder, 'id'> = {
  name: '', role: '', bio: '', image: '', email: '',
  linkedin: '', twitter: '', website: '', sort_order: 0, is_active: 1,
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` }
}

export default function FoundersManager() {
  const [founders, setFounders] = useState<Founder[]>([])
  const [loading,  setLoading]  = useState(true)
  const [editing,  setEditing]  = useState<(typeof EMPTY & { id?: number }) | null>(null)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')

  async function load() {
    setLoading(true)
    const res  = await fetch('/api/founders/list.php', { headers: authHeaders() })
    const data = await res.json()
    setFounders(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.name.trim()) { setError('Name is required'); return }
    setSaving(true); setError('')
    const res  = await fetch('/api/founders/save.php', { method: 'POST', headers: authHeaders(), body: JSON.stringify(editing) })
    const data = await res.json()
    if (!data.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setSaving(false); setEditing(null); load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this founder?')) return
    await fetch('/api/founders/delete.php', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ id }) })
    load()
  }

  if (loading) return <div className="sm-loading">Loading founders…</div>

  if (editing !== null) {
    return (
      <div className="sm-form-wrap">
        <div className="sm-form-head">
          <button className="sm-back-btn" onClick={() => setEditing(null)}>← Back</button>
          <h2 className="sm-form-title">{editing.id ? 'Edit Founder' : 'New Founder'}</h2>
        </div>

        <div className="sm-form">
          <div className="sm-field">
            <label className="sm-label">Photo</label>
            <ImageUpload
              current={editing.image || undefined}
              folder="founders"
              onUploaded={url => setEditing({ ...editing, image: url })}
            />
            {editing.image && (
              <button className="sm-clear-img" onClick={() => setEditing({ ...editing, image: '' })}>Remove photo</button>
            )}
          </div>

          <div className="sm-field-row">
            <div className="sm-field">
              <label className="sm-label">Full Name *</label>
              <input className="sm-input" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="e.g. Kunal Sharma" />
            </div>
            <div className="sm-field">
              <label className="sm-label">Role / Title</label>
              <input className="sm-input" value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} placeholder="e.g. Co-Founder & CEO" />
            </div>
          </div>

          <div className="sm-field">
            <label className="sm-label">Bio</label>
            <textarea className="sm-textarea" value={editing.bio} onChange={e => setEditing({ ...editing, bio: e.target.value })} placeholder="A short bio about this person…" rows={4} />
          </div>

          <div className="sm-field-row">
            <div className="sm-field">
              <label className="sm-label">Email</label>
              <input className="sm-input" type="email" value={editing.email} onChange={e => setEditing({ ...editing, email: e.target.value })} placeholder="name@example.com" />
            </div>
            <div className="sm-field">
              <label className="sm-label">Website</label>
              <input className="sm-input" value={editing.website} onChange={e => setEditing({ ...editing, website: e.target.value })} placeholder="https://…" />
            </div>
          </div>

          <div className="sm-field-row">
            <div className="sm-field">
              <label className="sm-label">LinkedIn URL</label>
              <input className="sm-input" value={editing.linkedin} onChange={e => setEditing({ ...editing, linkedin: e.target.value })} placeholder="https://linkedin.com/in/…" />
            </div>
            <div className="sm-field">
              <label className="sm-label">Twitter / X URL</label>
              <input className="sm-input" value={editing.twitter} onChange={e => setEditing({ ...editing, twitter: e.target.value })} placeholder="https://twitter.com/…" />
            </div>
          </div>

          <div className="sm-field-row">
            <div className="sm-field">
              <label className="sm-label">Sort Order</label>
              <input className="sm-input" type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: +e.target.value })} />
            </div>
            <div className="sm-field sm-field--toggle">
              <label className="sm-label">Active (visible on site)</label>
              <label className="sm-toggle">
                <input type="checkbox" checked={!!editing.is_active} onChange={e => setEditing({ ...editing, is_active: e.target.checked ? 1 : 0 })} />
                <span className="sm-toggle-slider" />
              </label>
            </div>
          </div>

          {error && <p className="sm-error">{error}</p>}

          <div className="sm-form-actions">
            <button className="sm-btn sm-btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
            <button className="sm-btn sm-btn--primary" onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save Founder'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sm-root">
      <div className="sm-toolbar">
        <p className="sm-count">{founders.length} founder{founders.length !== 1 ? 's' : ''}</p>
        <button className="sm-btn sm-btn--primary" onClick={() => setEditing({ ...EMPTY })}>+ Add Founder</button>
      </div>

      {founders.length === 0 ? (
        <div className="sm-empty">
          <p>No founders added yet.</p>
          <button className="sm-btn sm-btn--primary" onClick={() => setEditing({ ...EMPTY })}>Add first founder</button>
        </div>
      ) : (
        <div className="sm-list sm-list--founders">
          {founders.map(f => (
            <div key={f.id} className={`sm-card sm-card--founder${!f.is_active ? ' sm-card--inactive' : ''}`}>
              <div className="sm-founder-photo">
                {f.image ? <img src={f.image} alt={f.name} /> : <div className="sm-founder-initials">{f.name.charAt(0)}</div>}
              </div>
              <div className="sm-card-body">
                <h3 className="sm-card-title">{f.name}</h3>
                {f.role && <p className="sm-founder-role">{f.role}</p>}
                {f.bio && <p className="sm-card-desc">{f.bio.slice(0, 120)}{f.bio.length > 120 ? '…' : ''}</p>}
                <div className="sm-founder-links">
                  {f.email    && <a href={`mailto:${f.email}`}    className="sm-founder-link">✉ Email</a>}
                  {f.linkedin && <a href={f.linkedin} target="_blank" rel="noopener" className="sm-founder-link">in LinkedIn</a>}
                  {f.twitter  && <a href={f.twitter}  target="_blank" rel="noopener" className="sm-founder-link">𝕏 Twitter</a>}
                  {f.website  && <a href={f.website}  target="_blank" rel="noopener" className="sm-founder-link">🌐 Website</a>}
                </div>
                {!f.is_active && <span className="sm-inactive-tag">Hidden</span>}
              </div>
              <div className="sm-card-actions">
                <button className="sm-action-btn" onClick={() => setEditing({ ...f })}>Edit</button>
                <button className="sm-action-btn sm-action-btn--danger" onClick={() => remove(f.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
