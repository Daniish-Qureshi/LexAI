import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  const fetchDocuments = async () => {
    try {
      const { data } = await api.get('/documents/history')
      setDocuments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleAnalyze = async (doc) => {
    setAnalyzing(doc.id)
    try {
      const { data } = await api.post(`/analyze/${doc.id}`)
      navigate('/result', {
        state: {
          summary: data.summary,
          risks: data.risks,
          document: data.document
        }
      })
    } catch (err) {
      alert('Analysis fail ho gaya!')
    } finally {
      setAnalyzing(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Document delete karna chahte ho?')) return
    try {
      await api.delete(`/documents/${id}`)
      setDocuments(documents.filter(d => d.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleFavorite = async (id) => {
    try {
      const { data } = await api.patch(`/documents/${id}/favorite`)
      setDocuments(documents.map(d => d.id === id ? data : d))
    } catch (err) {
      console.error(err)
    }
  }

  const getCategoryColor = (cat) => {
    const colors = {
      legal: { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', border: 'rgba(99,102,241,0.3)' },
      financial: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80', border: 'rgba(34,197,94,0.3)' },
      property: { bg: 'rgba(251,146,60,0.15)', color: '#fb923c', border: 'rgba(251,146,60,0.3)' },
      insurance: { bg: 'rgba(56,189,248,0.15)', color: '#38bdf8', border: 'rgba(56,189,248,0.3)' },
    }
    return colors[cat] || colors.legal
  }

  const stats = [
    { label: 'Documents Analyzed', value: documents.length, icon: '📄' },
    { label: 'Favorites', value: documents.filter(d => d.isFavorite).length, icon: '⭐' },
    { label: 'Legal Docs', value: documents.filter(d => d.category === 'legal').length, icon: '⚖️' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem', color: '#fff', marginBottom: '6px'
            }}>
              Namaste, <span style={{ color: '#F5D77E' }}>{user?.name?.split(' ')[0]} 👋</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
              Apne sare documents ek jagah manage karo
            </p>
          </div>
          <Link to="/analyze" style={{
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
            color: '#050814', fontWeight: '700', fontSize: '14px',
            padding: '11px 22px', borderRadius: '10px',
          }}>+ New Document</Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', marginBottom: '40px'
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '14px', padding: '24px',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F5D77E', marginBottom: '4px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Documents List */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(212,175,55,0.12)',
          borderRadius: '20px', padding: '32px'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.3rem', color: '#fff', marginBottom: '24px'
          }}>Recent Documents</h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: 'rgba(255,255,255,0.3)' }}>
              ⏳ Documents load ho rahe hain...
            </div>
          ) : documents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '15px', marginBottom: '20px' }}>
                Abhi tak koi document analyze nahi kiya
              </p>
              <Link to="/analyze" style={{
                textDecoration: 'none',
                border: '1px solid rgba(212,175,55,0.3)',
                color: '#F5D77E', fontSize: '14px',
                padding: '10px 22px', borderRadius: '8px',
              }}>Pehla Document Upload Karo →</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {documents.map((doc) => {
                const catColor = getCategoryColor(doc.category)
                return (
                  <div key={doc.id} style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px', padding: '18px 20px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '16px'
                  }}>

                    {/* Left */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '10px',
                        background: 'rgba(212,175,55,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '20px', flexShrink: 0
                      }}>📄</div>
                      <div>
                        <p style={{ color: '#fff', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                          {doc.fileName}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{
                            fontSize: '11px', padding: '2px 8px', borderRadius: '4px',
                            background: catColor.bg, color: catColor.color, border: `1px solid ${catColor.border}`
                          }}>{doc.category}</span>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                            {new Date(doc.createdAt).toLocaleDateString('en-IN')}
                          </span>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                            {doc.language === 'hindi' ? '🇮🇳' : '🇬🇧'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

                      <button onClick={() => handleFavorite(doc.id)} style={{
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', fontSize: '18px', padding: '4px'
                      }}>{doc.isFavorite ? '⭐' : '☆'}</button>

                      {doc.cloudinaryUrl && (
                        <a href={doc.cloudinaryUrl} target="_blank" rel="noreferrer" style={{
                          textDecoration: 'none', fontSize: '12px',
                          color: '#F5D77E', border: '1px solid rgba(212,175,55,0.3)',
                          padding: '5px 12px', borderRadius: '6px'
                        }}>View</a>
                      )}

                      <button
                        onClick={() => handleAnalyze(doc)}
                        disabled={analyzing === doc.id}
                        style={{
                          background: analyzing === doc.id
                            ? 'rgba(212,175,55,0.3)'
                            : 'linear-gradient(135deg, #D4AF37, #F5D77E)',
                          border: 'none', color: '#050814',
                          padding: '5px 14px', borderRadius: '6px',
                          cursor: analyzing === doc.id ? 'not-allowed' : 'pointer',
                          fontSize: '12px', fontWeight: '700',
                          fontFamily: "'DM Sans', sans-serif"
                        }}>
                        {analyzing === doc.id ? '⏳...' : 'Analyze'}
                      </button>

                      <button onClick={() => handleDelete(doc.id)} style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,100,100,0.2)',
                        color: '#ff6b6b', padding: '5px 12px',
                        borderRadius: '6px', cursor: 'pointer',
                        fontSize: '12px', fontFamily: "'DM Sans', sans-serif"
                      }}>Delete</button>

                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard