import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { getToken } from './auth'

interface Props {
  current?: string
  folder?: string
  onUploaded: (url: string) => void
}

export default function ImageUpload({ current, folder = 'general', onUploaded }: Props) {
  const [src,      setSrc]      = useState<string | null>(null)
  const [crop,     setCrop]     = useState<Crop>()
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setSrc(ev.target?.result as string)
    reader.readAsDataURL(file)
    setCrop(undefined)
    setError('')
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    const c = centerCrop(makeAspectCrop({ unit: '%', width: 80 }, 16 / 9, width, height), width, height)
    setCrop(c)
  }

  const cropAndUpload = useCallback(async () => {
    if (!imgRef.current || !crop) return
    setLoading(true)
    setError('')

    const img    = imgRef.current
    const scaleX = img.naturalWidth  / img.width
    const scaleY = img.naturalHeight / img.height
    const canvas = document.createElement('canvas')
    const px     = crop.unit === '%'
      ? { x: (crop.x / 100) * img.width, y: (crop.y / 100) * img.height, w: (crop.width / 100) * img.width, h: (crop.height / 100) * img.height }
      : { x: crop.x, y: crop.y, w: crop.width, h: crop.height }

    canvas.width  = px.w * scaleX
    canvas.height = px.h * scaleY
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, px.x * scaleX, px.y * scaleY, px.w * scaleX, px.h * scaleY, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(async blob => {
      if (!blob) { setError('Crop failed'); setLoading(false); return }
      const form = new FormData()
      form.append('file', blob, 'upload.jpg')
      form.append('folder', folder)
      try {
        const res  = await fetch('/api/media/upload.php', {
          method:  'POST',
          headers: { Authorization: `Bearer ${getToken()}` },
          body:    form,
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Upload failed')
        onUploaded(data.url)
        setSrc(null)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setLoading(false)
      }
    }, 'image/jpeg', 0.92)
  }, [crop, folder, onUploaded])

  return (
    <div className="iu-root">
      {src ? (
        <div className="iu-crop-wrap">
          <ReactCrop crop={crop} onChange={c => setCrop(c)} ruleOfThirds>
            <img ref={imgRef} src={src} onLoad={onImageLoad} className="iu-crop-img" alt="crop preview" />
          </ReactCrop>
          <div className="iu-crop-actions">
            <p className="iu-crop-hint">Drag to adjust crop. Then click Upload.</p>
            {error && <p className="iu-error">{error}</p>}
            <div className="iu-crop-btns">
              <button className="iu-btn iu-btn--ghost" onClick={() => setSrc(null)} disabled={loading}>Cancel</button>
              <button className="iu-btn iu-btn--primary" onClick={cropAndUpload} disabled={loading}>
                {loading ? 'Uploading…' : 'Crop & Upload'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="iu-drop" onClick={() => inputRef.current?.click()}>
          {current ? (
            <div className="iu-preview">
              <img src={current} alt="current" className="iu-preview-img" />
              <div className="iu-preview-overlay">
                <span>Change Image</span>
              </div>
            </div>
          ) : (
            <div className="iu-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>Click to upload image</span>
              <span className="iu-hint">or drag & drop · JPG, PNG, GIF, WebP</span>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
        </div>
      )}
    </div>
  )
}
