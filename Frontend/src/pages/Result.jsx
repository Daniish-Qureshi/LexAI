import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Result = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate('/dashboard')
    return null
  }

  const { summary, risks, document } = state

  const getRiskColor = (level) => {
    if (level === 'high') return { bg: 'rgba(255,50,50,0.1)', color: '#ff6b6b', border: 'rgba(255,50,50,0.3)' }
    if (level === 'medium') return { bg: 'rgba(255,165,0,0.1)', color: '#ffa500', border: 'rgba(255,165,0,0.3)' }
    return { bg: 'rgba(50,205,50,0.1)', color: '#90EE90', border: 'rgba(50,205,50,0.3)' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '50px 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)', padding: '8px 16px',
            borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
            fontFamily: "'DM Sans', sans-serif", marginBottom: '20px'
          }}>← Dashboard pe jao</button>

          <div style={{
            display: 'inline-block',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '50px', padding: '5px 16px',
            fontSize: '12px', color: '#F5D77E',
            marginBottom: '14px', letterSpacing: '1px'
          }}>⚡ AI ANALYSIS COMPLETE</div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem', color: '#fff', marginBottom: '8px'
          }}>
            Document <span style={{ color: '#F5D77E' }}>Analysis</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            📄 {document?.fileName}
          </p>
        </div>

        {/* Overview */}
        <div style={{
          background: 'rgba(212,175,55,0.05)',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '16px', padding: '28px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem', color: '#F5D77E', marginBottom: '14px'
          }}>📋 Overview</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: '15px' }}>
            {summary?.overview}
          </p>
        </div>

        {/* Key Clauses */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '28px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem', color: '#fff', marginBottom: '16px'
          }}>📌 Key Clauses</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {summary?.key_clauses?.map((clause, i) => (
              <div key={i} style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span style={{ color: '#F5D77E', fontWeight: '700', minWidth: '20px' }}>{i + 1}.</span>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {clause}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '28px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem', color: '#fff', marginBottom: '16px'
          }}>⚠️ Risks Detected</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {risks?.map((risk, i) => {
              const color = getRiskColor(risk.level)
              return (
                <div key={i} style={{
                  padding: '16px',
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                  borderRadius: '10px',
                  display: 'flex', gap: '14px', alignItems: 'flex-start'
                }}>
                  <span style={{
                    background: color.bg, color: color.color,
                    border: `1px solid ${color.border}`,
                    padding: '2px 10px', borderRadius: '20px',
                    fontSize: '11px', fontWeight: '700',
                    minWidth: '55px', textAlign: 'center',
                    textTransform: 'uppercase'
                  }}>{risk.level}</span>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {risk.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Items */}
        <div style={{
          background: 'rgba(50,205,50,0.03)',
          border: '1px solid rgba(50,205,50,0.15)',
          borderRadius: '16px', padding: '28px',
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem', color: '#90EE90', marginBottom: '16px'
          }}>✅ Action Items</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {summary?.action_items?.map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '12px 16px',
                background: 'rgba(50,205,50,0.05)',
                borderRadius: '10px',
              }}>
                <span style={{ color: '#90EE90', minWidth: '20px' }}>→</span>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Result