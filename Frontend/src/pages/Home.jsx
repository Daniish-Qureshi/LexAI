import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const features = [
  { icon: '📄', title: 'Smart Summarizer', desc: 'Complex legal documents ko simple Hindi/English mein samjho — seconds mein' },
  { icon: '🔍', title: 'Risk Detector', desc: 'Hidden clauses aur red flags automatically detect karo — koi cheez chhupe nahi' },
  { icon: '💬', title: 'Document Q&A', desc: 'Apne document se seedha sawaal poochho — AI turant jawab dega' },
  { icon: '🌐', title: 'Multilingual', desc: 'Hindi aur English dono mein output milega — jo samjhe woh language chuno' },
]

const howItWorks = [
  { step: '01', title: 'Document Upload Karo', desc: 'PDF ya image upload karo ya text paste karo — koi bhi format chalega' },
  { step: '02', title: 'AI Analyze Karta Hai', desc: 'Hamara AI model document ko scan karta hai aur key information extract karta hai' },
  { step: '03', title: 'Summary Milti Hai', desc: 'Simple language mein summary, risks aur action items milte hain seconds mein' },
]

const documentTypes = [
  { icon: '🏠', name: 'Rent Agreement' },
  { icon: '🏦', name: 'Loan Papers' },
  { icon: '🛡️', name: 'Insurance Policy' },
  { icon: '💼', name: 'Employment Contract' },
  { icon: '🏢', name: 'Property Deed' },
  { icon: '⚖️', name: 'Court Notice' },
  { icon: '📊', name: 'Financial Report' },
  { icon: '🤝', name: 'Business Agreement' },
]

const stats = [
  { value: '10+', label: 'Document Types' },
  { value: '2', label: 'Languages Supported' },
  { value: '< 30s', label: 'Analysis Time' },
  { value: '100%', label: 'Free to Start' },
]

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <div style={{ textAlign: 'center', padding: '100px 2rem 80px', maxWidth: '850px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.1)',
          border: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '50px', padding: '6px 18px',
          fontSize: '13px', color: '#F5D77E',
          marginBottom: '28px', letterSpacing: '1px',
        }}>⚡ AI-Powered Legal Assistant — Free to Use</div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700', lineHeight: '1.15',
          marginBottom: '24px', color: '#ffffff',
        }}>
          Legal Documents Ko{' '}
          <span style={{ color: '#F5D77E' }}>Samajhna</span>{' '}
          Ab Aasaan Hai
        </h1>

        <p style={{
          fontSize: '18px', color: 'rgba(255,255,255,0.55)',
          lineHeight: '1.7', marginBottom: '40px',
          maxWidth: '600px', margin: '0 auto 40px',
        }}>
          India mein lakho log legal documents bina samjhe sign kar dete hain. 
          LexAI us problem solve karta hai — koi bhi document upload karo, 
          simple language mein summary aur hidden risks milenge.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/analyze" style={{
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
            color: '#050814', fontWeight: '700', fontSize: '15px',
            padding: '14px 32px', borderRadius: '10px',
          }}>Document Analyze Karo →</Link>
          <Link to="/register" style={{
            textDecoration: 'none', color: 'rgba(255,255,255,0.7)',
            fontSize: '15px', padding: '14px 32px', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>Free mein Sign Up Karo</Link>
        </div>
      </div>

      {/* ===== STATS ===== */}
      <div style={{
        maxWidth: '900px', margin: '0 auto', padding: '0 2rem 80px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(212,175,55,0.05)',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px', padding: '28px 16px', textAlign: 'center'
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.2rem', color: '#F5D77E',
              fontWeight: '700', marginBottom: '8px'
            }}>{s.value}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ===== FEATURES ===== */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '80px 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ color: '#F5D77E', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>
              FEATURES
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.2rem', color: '#fff'
            }}>LexAI Kya Kya Kar Sakta Hai?</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,175,55,0.12)',
                borderRadius: '16px', padding: '32px 24px',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '18px', color: '#F5D77E',
                  marginBottom: '12px', fontWeight: '700'
                }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <div style={{ padding: '80px 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ color: '#F5D77E', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>
              HOW IT WORKS
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.2rem', color: '#fff'
            }}>Sirf 3 Steps Mein</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {howItWorks.map((h, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,175,55,0.12)',
                borderRadius: '16px', padding: '32px 24px', position: 'relative'
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '3rem', color: 'rgba(212,175,55,0.15)',
                  fontWeight: '700', marginBottom: '16px', lineHeight: 1
                }}>{h.step}</div>
                <h3 style={{
                  fontSize: '17px', color: '#fff',
                  fontWeight: '600', marginBottom: '10px'
                }}>{h.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', margin: 0 }}>
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== DOCUMENT TYPES ===== */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '80px 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#F5D77E', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>
            SUPPORTED DOCUMENTS
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.2rem', color: '#fff', marginBottom: '40px'
          }}>Kaunse Documents Analyze Kar Sakte Ho?</h2>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: '12px', justifyContent: 'center'
          }}>
            {documentTypes.map((d, i) => (
              <div key={i} style={{
                background: 'rgba(212,175,55,0.07)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '50px', padding: '10px 20px',
                fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <span>{d.icon}</span> {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div style={{ padding: '100px 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem', color: '#fff', marginBottom: '16px'
          }}>
            Aaj Hi <span style={{ color: '#F5D77E' }}>Shuru Karo</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.45)', fontSize: '16px',
            lineHeight: '1.7', marginBottom: '36px'
          }}>
            Free account banao aur apna pehla document analyze karo — 
            koi credit card nahi chahiye
          </p>
          <Link to="/register" style={{
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
            color: '#050814', fontWeight: '700', fontSize: '16px',
            padding: '16px 40px', borderRadius: '12px',
          }}>
            Free mein Start Karo →
          </Link>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '30px 2rem', textAlign: 'center',
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#F5D77E' }}>
          Lex<span style={{ color: '#fff' }}>AI</span>
        </span>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginTop: '8px' }}>
          © 2026 LexAI — Built by Danish Qureshi
        </p>
      </div>

    </div>
  )
}

export default Home