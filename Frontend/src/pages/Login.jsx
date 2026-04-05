import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
  setError('')
  setLoading(true)
  try {
    await login(form.email, form.password)
    navigate('/dashboard', { replace: true })
  } catch (err) {
    setError(err.response?.data?.message || 'Kuch galat hua!')
  } finally {
    setLoading(false)
  }
}

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '10px',
    padding: '13px 16px',
    color: '#fff',
    fontSize: '15px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#050814',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", padding: '2rem'
    }}>
      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(212,175,55,0.15)',
        borderRadius: '20px', padding: '40px 36px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', color: '#F5D77E' }}>
              Lex<span style={{ color: '#fff' }}>AI</span>
            </span>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '8px' }}>
            Apne account mein login karo
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)',
            borderRadius: '8px', padding: '12px', marginBottom: '16px',
            color: '#ff6b6b', fontSize: '14px', textAlign: 'center'
          }}>{error}</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              Email Address
            </label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="danish@example.com"
              style={inputStyle} />
          </div>

          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              Password
            </label>
            <input type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="••••••••"
              style={inputStyle} />
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? 'rgba(212,175,55,0.5)' : 'linear-gradient(135deg, #D4AF37, #F5D77E)',
            color: '#050814', fontWeight: '700', fontSize: '15px',
            border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif", marginTop: '8px'
          }}>
            {loading ? 'Login ho raha hai...' : 'Login Karo'}
          </button>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '24px' }}>
          Account nahi hai?{' '}
          <Link to="/register" style={{ color: '#F5D77E', textDecoration: 'none', fontWeight: '600' }}>
            Register Karo
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login