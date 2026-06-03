import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import chatbotImg from '../assets/chatbot.png'
import symptomImg from '../assets/symptom.png'
import pregnancyImg from '../assets/pregnancy.png'
import femaleImg from '../assets/female.png'
import { registerUser } from '../api/auth'

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [slide, setSlide] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logo} alt="kanya" style={{
            width: '100px', height: '100px', borderRadius: '50%',
            objectFit: 'cover', border: '3px solid rgba(255,255,255,0.8)',
            boxShadow: '0 0 30px rgba(255,255,255,0.4)', marginBottom: '24px',
            transition: 'all 0.3s ease', cursor: 'default'
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(255,255,255,0.95)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.4)'}
          />
          <h1 style={{
            fontFamily: 'Playball, cursive', fontSize: '3rem',
            color: '#FFFFFF', marginBottom: '16px',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
          }}>Kanya</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '260px' }}>
            Your private health companion. Know your body, own your story.
          </p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{
            fontFamily: 'Playball, cursive', fontSize: '1.8rem',
            color: '#FFFFFF', marginBottom: '32px'
          }}>Everything You Need</h2>
          {[
            { icon: chatbotImg, label: 'AI Health Chatbot' },
            { icon: symptomImg, label: 'Symptom Checker' },
            { icon: pregnancyImg, label: 'Pregnancy Chances' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.15)', borderRadius: '12px',
              padding: '12px 20px', marginBottom: '12px', width: '100%',
              backdropFilter: 'blur(8px)', transition: 'all 0.3s ease'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <img src={item.icon} alt={item.label} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '600' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={femaleImg} alt="female" style={{
            width: '110px', height: '110px',
            objectFit: 'contain', marginBottom: '16px',
            filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.6))',
            transition: 'all 0.3s ease', cursor: 'default'
          }}
            onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 30px rgba(255,255,255,0.99))'}
            onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(255,255,255,0.6))'}
          />
          <h2 style={{
            fontFamily: 'Playball, cursive', fontSize: '1.8rem',
            color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.4
          }}>
            "Your health is your power"
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '28px', maxWidth: '260px' }}>
            Join thousands of women taking charge of their health — privately, confidently.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            {[['10k+', 'Women'], ['100%', 'Private'], ['Free', 'Always']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: '700' }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '12px',
    border: '1.5px solid #f8e2ec', background: '#fff7fa',
    fontSize: '0.95rem', color: '#4A4A4A', outline: 'none',
    transition: 'all 0.3s ease', boxSizing: 'border-box'
  }

  const labelStyle = {
    display: 'block', fontSize: '0.85rem',
    color: '#4A4A4A', marginBottom: '8px', letterSpacing: '0.05em'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f9eef6 0%, #f7dce7 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div style={{
        background: '#FFFFFF', borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(235, 66, 125, 0.15)',
        display: 'flex', overflow: 'hidden',
        width: '100%', maxWidth: '900px', minHeight: '620px'
      }}>

        {/* Left Panel — Carousel */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(160deg, #f39ab8 0%, #eb427d 100%)',
          padding: '60px 40px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {slides[slide].content}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setSlide(i)} style={{
                width: i === slide ? '24px' : '8px', height: '8px',
                borderRadius: '9999px',
                background: i === slide ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
        </div>

        {/* Right Panel — Form */}
        <div style={{
          flex: 1, padding: '50px 48px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <h2 style={{
            fontFamily: 'Playball, cursive', fontSize: '2rem',
            color: '#eb427d', marginBottom: '8px'
          }}>Create Account</h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '28px' }}>
            Join Kanya and take charge of your health
          </p>

          {/* Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" value={form.name}
              onChange={handleChange} placeholder="Your name"
              style={inputStyle}
              onFocus={e => e.target.style.border = '1.5px solid #eb427d'}
              onBlur={e => e.target.style.border = '1.5px solid #f8e2ec'}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="you@example.com"
              style={inputStyle}
              onFocus={e => e.target.style.border = '1.5px solid #eb427d'}
              onBlur={e => e.target.style.border = '1.5px solid #f8e2ec'}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'}
                name="password" value={form.password}
                onChange={handleChange} placeholder="••••••••"
                style={{ ...inputStyle, padding: '0.75rem 3rem 0.75rem 1rem' }}
                onFocus={e => e.target.style.border = '1.5px solid #eb427d'}
                onBlur={e => e.target.style.border = '1.5px solid #f8e2ec'}
              />
              <span onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: '14px', top: '50%',
                transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '1rem', color: '#9CA3AF'
              }}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showConfirm ? 'text' : 'password'}
                name="confirmPassword" value={form.confirmPassword}
                onChange={handleChange} placeholder="••••••••"
                style={{
                  ...inputStyle,
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  border: form.confirmPassword && form.password !== form.confirmPassword
                    ? '1.5px solid #E05C5C' : '1.5px solid #f8e2ec'
                }}
                onFocus={e => e.target.style.border = '1.5px solid #eb427d'}
                onBlur={e => e.target.style.border = form.password !== form.confirmPassword
                  ? '1.5px solid #E05C5C' : '1.5px solid #f8e2ec'}
              />
              <span onClick={() => setShowConfirm(!showConfirm)} style={{
                position: 'absolute', right: '14px', top: '50%',
                transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '1rem', color: '#9CA3AF'
              }}>
                {showConfirm ? '🙈' : '👁️'}
              </span>
            </div>
            {/* Password mismatch warning */}
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p style={{ color: '#E05C5C', fontSize: '0.78rem', marginTop: '6px' }}>
                Passwords do not match
              </p>
            )}
          </div>

          {/* Error Message */}
            {error && (
              <p style={{ color: '#E05C5C', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' }}>
                {error}
              </p>
            )}

            {/* Sign Up Button */}
            <button
              onClick={async () => {
                setError('')
                if (form.password !== form.confirmPassword) {
                  setError('Passwords do not match')
                  return
                }
                try {
                  setLoading(true)
                  const data = await registerUser(form.name, form.email, form.password)
                  localStorage.setItem('token', data.token)
                  localStorage.setItem('user', JSON.stringify(data.user))
                  navigate('/dashboard')
                } catch (err) {
                  setError(err.message)
                } finally {
                  setLoading(false)
                }
              }}
              style={{
                width: '100%', padding: '0.85rem',
                background: 'linear-gradient(135deg, #eb427d, #f39ab8)',
                color: '#FFFFFF', border: 'none', borderRadius: '12px',
                fontSize: '1rem', fontWeight: '700', letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(235, 66, 125, 0.35)',
                transition: 'all 0.3s ease', marginBottom: '20px',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(235, 66, 125, 0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(235, 66, 125, 0.35)'
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

          {/* Login Link */}
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#9CA3AF' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}
              style={{ color: '#eb427d', cursor: 'pointer', fontWeight: '700' }}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup