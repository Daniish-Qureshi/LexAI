import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [hovered, setHovered] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      background: 'rgba(5, 8, 20, 0.95)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
      padding: '0 2.5rem',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px'
        }}>⚖️</div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#F5D77E', letterSpacing: '1px' }}>
          Lex<span style={{ color: '#ffffff' }}>AI</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {['/', '/analyze', '/dashboard'].map((path, i) => {
          const labels = ['Home', 'Analyze', 'Dashboard']
          return (
            <Link key={path} to={path}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '500',
                color: hovered === i ? '#F5D77E' : 'rgba(255,255,255,0.6)',
                transition: 'color 0.2s',
                letterSpacing: '0.5px',
              }}>
              {labels[i]}
            </Link>
          )
        })}
      </div>

      {/* Auth Buttons */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {user ? (
          <>
            {/* User Name */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '8px', padding: '7px 14px',
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: '700', color: '#050814'
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: '#F5D77E', fontSize: '14px', fontWeight: '500' }}>
                {user.name?.split(' ')[0]}
              </span>
            </div>

            {/* Logout */}
            <button onClick={handleLogout} style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              padding: '8px 16px', borderRadius: '8px',
              cursor: 'pointer', fontSize: '14px',
              fontFamily: "'DM Sans', sans-serif",
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              padding: '8px 18px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>Login</Link>

            <Link to="/register" style={{
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: '600',
              color: '#050814',
              background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
              padding: '8px 20px',
              borderRadius: '8px',
            }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar