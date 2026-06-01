import Navbar from '../components/Navbar'
import chatbotImg from '../assets/chatbot.png'
import symptomImg from '../assets/symptom.png'
import pregnancyImg from '../assets/pregnancy.png'
import infectionImg from '../assets/infection.png'

function Landing() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f9eef6 0%, #f7dce7 100%)',
    }}>
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center"
        style={{ padding: '100px 24px 60px' }}>

        {/* Floating badge */}
        <div style={{
          background: '#f8e2ec',
          color: '#eb427d',
          borderRadius: '9999px',
          padding: '0.4rem 1.4rem',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          boxShadow: '0 2px 12px rgba(235, 66, 125, 0.15)',
          display: 'inline-block',
          transition: 'all 0.3s ease',
          cursor: 'default'
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(235, 66, 125, 0.6), 0 0 50px rgba(235, 66, 125, 0.3)'
            e.currentTarget.style.color = '#c9005a'
            e.currentTarget.style.background = '#fdd0e0'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(235, 66, 125, 0.15)'
            e.currentTarget.style.color = '#eb427d'
            e.currentTarget.style.background = '#f8e2ec'
          }}
        >
          Your Health. Your Privacy. Your Power.
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Playball, cursive',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: '#eb427d',
          lineHeight: 1.2,
          marginBottom: '24px',
          filter: 'drop-shadow(0 2px 8px rgba(235, 66, 125, 0.2))'
        }}>
          Know Your Body.<br />
          <span style={{
            background: 'linear-gradient(135deg, #4bb5aa, #018a7a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Own Your Story.
          </span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: '1.15rem',
          color: '#9CA3AF',
          maxWidth: '560px',
          lineHeight: 1.8,
          marginBottom: '40px'
        }}>
          Kanya is a private, intelligent health companion built for every woman —
          track your cycle, understand your body, and get answers in your language.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <button style={{
            background: 'linear-gradient(135deg, #eb427d, #f39ab8)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.85rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            boxShadow: '0 8px 25px rgba(235, 66, 125, 0.35)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(235, 66, 125, 0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(235, 66, 125, 0.35)'
            }}
          >
            Get Started Free
          </button>

          <button style={{
            background: 'transparent',
            color: '#4bb5aa',
            border: '2px solid #4bb5aa',
            borderRadius: '9999px',
            padding: '0.85rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            boxShadow: '0 8px 25px rgba(75, 181, 170, 0.15)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.background = '#4bb5aa'
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(75, 181, 170, 0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#4bb5aa'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(75, 181, 170, 0.15)'
            }}
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap justify-center gap-6"
        style={{ padding: '0 24px 80px' }}>

        {[
  { img: chatbotImg, title: 'AI Chatbot', desc: 'Ask anything about your health — in your language.', color: '#eb427d', bg: 'linear-gradient(135deg, #f9eef6, #f7dce7)' },
  { img: symptomImg, title: 'Symptom Checker', desc: 'Understand what your body is telling you.', color: '#4bb5aa', bg: 'linear-gradient(135deg, #e7eaf5, #d4f5f2)' },
  { img: pregnancyImg, title: 'Pregnancy Chances', desc: 'Know your fertile window with a simple QnA.', color: '#c9940a', bg: 'linear-gradient(135deg, #fdf6d8, #f5e27d55)' },
  { img: infectionImg, title: 'Infection Checker', desc: 'Identify possible infections before they worsen.', color: '#018a7a', bg: 'linear-gradient(135deg, #e7eaf5, #b2ede7)' },
].map((card, i) => (
  <div key={i} style={{
    background: card.bg,
    borderRadius: '24px',
    padding: '32px 24px',
    width: '220px',
    textAlign: 'center',
    boxShadow: '0 4px 24px rgba(243, 154, 184, 0.12)',
    border: '1px solid #f8e2ec',
    transition: 'all 0.3s ease',
    cursor: 'default'
  }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)'
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(243, 154, 184, 0.25)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 4px 24px rgba(243, 154, 184, 0.12)'
    }}
  >
    <img src={card.img} alt={card.title} style={{
      width: '80px',
      height: '80px',
      objectFit: 'contain',
      marginBottom: '16px',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
    }} />
    <h3 style={{
      color: card.color,
      fontSize: '1rem',
      fontWeight: '700',
      marginBottom: '8px',
      letterSpacing: '0.05em'
    }}>
      {card.title}
    </h3>
    <p style={{
      color: '#9CA3AF',
      fontSize: '0.85rem',
      lineHeight: 1.6
    }}>
      {card.desc}
    </p>
  </div>
))}
      </div>

    </div>
  )
}

export default Landing