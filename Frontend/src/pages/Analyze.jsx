import { useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

const Analyze = () => {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)
  const [language, setLanguage] = useState('hindi')
  const [category, setCategory] = useState('legal')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '10px',
    padding: '13px 16px',
    color: '#fff',
    fontSize: '15px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }

  const handleFileSelect = (selectedFile) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowed.includes(selectedFile.type)) {
      setError('Sirf PDF, JPG, PNG allowed hai!')
      return
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size 10MB se kam honi chahiye!')
      return
    }
    setError('')
    setFile(selectedFile)
  }

  const handleSubmit = async () => {
    if (!file) {
      setError('Pehle koi file select karo!')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('document', file)
      formData.append('category', category)
      formData.append('language', language)

      await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setSuccess('Document upload ho gaya! Dashboard pe dekho.')
      setFile(null)

      setTimeout(() => navigate('/dashboard'), 2000)

    } catch (err) {
      setError(err.response?.data?.message || 'Upload fail ho gaya!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: '750px', margin: '0 auto', padding: '60px 2rem' }}>

        {/* Heading */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '50px', padding: '5px 16px',
            fontSize: '12px', color: '#F5D77E',
            marginBottom: '16px', letterSpacing: '1px'
          }}>⚡ AI DOCUMENT ANALYZER</div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem', fontWeight: '700',
            color: '#fff', marginBottom: '12px'
          }}>
            Document <span style={{ color: '#F5D77E' }}>Analyze</span> Karo
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', lineHeight: '1.6' }}>
            PDF upload karo — AI seconds mein summary aur risks batayega
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: '20px', padding: '36px'
        }}>

          {/* Success Message */}
          {success && (
            <div style={{
              background: 'rgba(50,205,50,0.1)',
              border: '1px solid rgba(50,205,50,0.3)',
              borderRadius: '10px', padding: '14px',
              color: '#90EE90', fontSize: '14px',
              textAlign: 'center', marginBottom: '20px'
            }}>✅ {success}</div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgba(255,50,50,0.1)',
              border: '1px solid rgba(255,50,50,0.3)',
              borderRadius: '10px', padding: '14px',
              color: '#ff6b6b', fontSize: '14px',
              textAlign: 'center', marginBottom: '20px'
            }}>❌ {error}</div>
          )}

          {/* Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault(); setDragOver(false)
              handleFileSelect(e.dataTransfer.files[0])
            }}
            onClick={() => document.getElementById('fileInput').click()}
            style={{
              border: `2px dashed ${dragOver ? '#F5D77E' : file ? 'rgba(50,205,50,0.5)' : 'rgba(212,175,55,0.25)'}`,
              borderRadius: '14px',
              padding: '48px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? 'rgba(212,175,55,0.05)' : file ? 'rgba(50,205,50,0.03)' : 'transparent',
              transition: 'all 0.2s',
              marginBottom: '24px',
            }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>
              {file ? '✅' : '📄'}
            </div>
            <p style={{ color: file ? '#90EE90' : '#F5D77E', fontWeight: '600', fontSize: '16px', marginBottom: '6px' }}>
              {file ? file.name : 'PDF yahan drop karo'}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                : 'ya click karke file select karo • Max 10MB • PDF, JPG, PNG'
              }
            </p>
            {file && (
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null) }}
                style={{
                  marginTop: '10px', background: 'transparent',
                  border: '1px solid rgba(255,100,100,0.3)',
                  color: '#ff6b6b', padding: '4px 12px',
                  borderRadius: '6px', cursor: 'pointer',
                  fontSize: '12px', fontFamily: "'DM Sans', sans-serif"
                }}>
                Remove
              </button>
            )}
            <input id="fileInput" type="file" accept=".pdf,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {/* Category Select */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '12px' }}>
              Document Category
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { value: 'legal', label: '⚖️ Legal' },
                { value: 'financial', label: '💰 Financial' },
                { value: 'property', label: '🏠 Property' },
                { value: 'insurance', label: '🛡️ Insurance' },
              ].map((cat) => (
                <button key={cat.value} onClick={() => setCategory(cat.value)} style={{
                  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                  border: category === cat.value ? '1px solid #F5D77E' : '1px solid rgba(255,255,255,0.1)',
                  background: category === cat.value ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: category === cat.value ? '#F5D77E' : 'rgba(255,255,255,0.4)',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '13px', transition: 'all 0.2s',
                }}>{cat.label}</button>
              ))}
            </div>
          </div>

          {/* Language Select */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '12px' }}>
              Summary kis language mein chahiye?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { value: 'hindi', label: '🇮🇳 Hindi' },
                { value: 'english', label: '🇬🇧 English' },
              ].map((lang) => (
                <button key={lang.value} onClick={() => setLanguage(lang.value)} style={{
                  padding: '9px 22px', borderRadius: '8px', cursor: 'pointer',
                  border: language === lang.value ? '1px solid #F5D77E' : '1px solid rgba(255,255,255,0.1)',
                  background: language === lang.value ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: language === lang.value ? '#F5D77E' : 'rgba(255,255,255,0.4)',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: '500',
                  transition: 'all 0.2s',
                }}>{lang.label}</button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !file}
            style={{
              width: '100%', padding: '15px',
              background: loading || !file
                ? 'rgba(212,175,55,0.3)'
                : 'linear-gradient(135deg, #D4AF37, #F5D77E)',
              color: '#050814', fontWeight: '700', fontSize: '16px',
              border: 'none', borderRadius: '12px',
              cursor: loading || !file ? 'not-allowed' : 'pointer',
              fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.3px',
              transition: 'all 0.2s'
            }}>
            {loading ? '⏳ Upload ho raha hai...' : '⚡ Analyze Karo'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default Analyze