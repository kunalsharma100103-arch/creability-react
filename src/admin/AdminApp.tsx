import { useState } from 'react'
import { isAuthenticated } from './auth'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import './admin.css'

export default function AdminApp() {
  const [authed, setAuthed] = useState(isAuthenticated)

  return authed
    ? <AdminDashboard onLogout={() => setAuthed(false)} />
    : <AdminLogin    onLogin={() => setAuthed(true)} />
}
