import { useState, useEffect } from 'react'
import { getToken } from './auth'
import ImageUpload from './ImageUpload'

interface Service {
  id: number
  title: string
  description: string
  badge_text: string
  icon_value: string
  cover_image: string
  link_url: string
  features: string[] | string
  sort_order: number
  is_active: number
}

const EMPTY: Omit<Service, 'id' | 'created_at'> = {
  title: '', description: '', badge_text: '', icon_value: '',
  cover_image: '', link_url: '', features: [], sort_order: 0, is_active: 1,
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` }
}

function parseFeatures(f: string[] | string): string[] {
  if (Array.isArray(f)) return f
  try { return JSON.parse(f) } catch { return [] }
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading,  setLoading]  = useState(true)
  const [editing,  setEditing]  = useState<(typeof EMPTY & { id?: number }) | null>(null)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const [newFeature, setNewFeature] = useState('')

  async function load() {
    setLoading(true)
    const res  = await fetch('/api/services/list.php', { headers: authHeaders() })
    const data = await res.json()
    setServices(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.title.trim()) { setError('Title is required'); return }
    setSaving(true); setError('')
    const features = parseFeatures((editing as Service).features ?? [])
    const body = { ...editing, features }
    const res  = await fetch('/api/services/save.php', { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) })
    const data = await res.json()
    if (!data.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setSaving(false); setEditing(null); load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this service?')) return
    await fetch('/api/services/delete.php', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ id }) })
    load()
  }

  function addFeature() {
    if (!newFeature.trim() || !editing) return
    const cur = parseFeatures((editing as Service).features ?? [])
    setEditing({ ...editing, features: [...cur, newFeature.trim()] } as Service)
    setNewFeature('')
  }

  function removeFeature(i: number) {
    if (!editing) return
    const cur = parseFeatures((editing as Service).features ?? [])
    setEditing({ ...editing, features: cur.filter((_, idx) => idx !== i) } as Service)
  }

  if (loading) return <div className="sm-loading">Loading services…</div>

  if (editing !== null) {
    const features = parseFeatures((editing as Service).features ?? [])
    return (
      <div className="sm-form-wrap">
        <div className="sm-form-head">
          <button className="sm-back-btn" onClick={() => setEditing(null)}>← Back</button>
          <h2 className="sm-form-title">{editing.id ? 'Edit Service' : 'New Service'}</h2>
        </div>

        <div className="sm-form">
          <div className="sm-field-row">
            <div className="sm-field">
              <label className="sm-label">Title *</label>
              <input className="sm-input" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Maths Park" />
            </div>
            <div className="sm-field">
              <label className="sm-label">Badge</label>
              <input className="sm-input" value={editing.badge_text} onChange={e => setEditing({ ...editing, badge_text: e.target.value })} placeholder="e.g. New · Popular" />
            </div>
          </div>

          <div className="sm-field">
            <label className="sm-label">Description</label>
            <textarea className="sm-textarea" value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Short description of this service…" rows={3} />
          </div>

          <div className="sm-field-row">
            <div className="sm-field">
              <label className="sm-label">Icon (emoji)</label>
              <input className="sm-input" value={editing.icon_value} onChange={e => setEditing({ ...editing, icon_value: e.target.value })} placeholder="e.g. 🎓 or leave blank" />
            </div>
            <div className="sm-field">
              <label className="sm-label">Link URL</label>
              <input className="sm-input" value={editing.link_url} onChange={e => setEditing({ ...editing, link_url: e.target.value })} placeholder="https://… or /page-slug" />
            </div>
          </div>

          <div className="sm-field">
            <label className="sm-label">Cover Image</label>
            <ImageUpload
              current={editing.cover_image || undefined}
              folder="services"
              onUploaded={url => setEditing({ ...editing, cover_image: url })}
            />
            {editing.cover_image && (
              <button className="sm-clear-img" onClick={() => setEditing({ ...editing, cover_image: '' })}>Remove image</button>
            )}
          </div>

          <div className="sm-field">
            <label className="sm-label">Feature Bullet Points</label>
            <div className="sm-features">
              {features.map((f, i) => (
                <div key={i} className="sm-feature-item">
                  <span>{f}</span>
                  <button className="sm-feature-del" onClick={() => removeFeature(i)}>×</button>
                </div>
              ))}
              <div className="sm-feature-add">
                <input
                  className="sm-input"
                  value={newFeature}
                  onChange={e => setNewFeature(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addFeature()}
                  placeholder="Add a bullet point, then press Enter"
                />
                <button className="sm-add-btn" onClick={addFeature}>Add</button>
              </div>
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
              {saving ? 'Saving…' : 'Save Service'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sm-root">
      <div className="sm-toolbar">
        <p className="sm-count">{services.length} service{services.length !== 1 ? 's' : ''}</p>
        <button className="sm-btn sm-btn--primary" onClick={() => setEditing({ ...EMPTY })}>+ Add Service</button>
      </div>

      {services.length === 0 ? (
        <div className="sm-empty">
          <p>No services yet.</p>
          <button className="sm-btn sm-btn--primary" onClick={() => setEditing({ ...EMPTY })}>Add your first service</button>
        </div>
      ) : (
        <div className="sm-list">
          {services.map(s => (
            <div key={s.id} className={`sm-card${!s.is_active ? ' sm-card--inactive' : ''}`}>
              {s.cover_image && <img src={s.cover_image} alt={s.title} className="sm-card-img" />}
              <div className="sm-card-body">
                <div className="sm-card-top">
                  {s.icon_value && <span className="sm-card-icon">{s.icon_value}</span>}
                  <div>
                    <h3 className="sm-card-title">{s.title}</h3>
                    {s.badge_text && <span className="sm-badge">{s.badge_text}</span>}
                  </div>
                  {!s.is_active && <span className="sm-inactive-tag">Hidden</span>}
                </div>
                {s.description && <p className="sm-card-desc">{s.description}</p>}
                {s.link_url && <a className="sm-card-link" href={s.link_url} target="_blank" rel="noopener">{s.link_url}</a>}
                {parseFeatures(s.features).length > 0 && (
                  <ul className="sm-card-features">
                    {parseFeatures(s.features).slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                    {parseFeatures(s.features).length > 3 && <li>+{parseFeatures(s.features).length - 3} more…</li>}
                  </ul>
                )}
              </div>
              <div className="sm-card-actions">
                <button className="sm-action-btn" onClick={() => setEditing({ ...s, features: parseFeatures(s.features) })}>Edit</button>
                <button className="sm-action-btn sm-action-btn--danger" onClick={() => remove(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
