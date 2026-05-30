import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between"
      style={{
        background: 'linear-gradient(135deg, #4A0000 0%, #6B0000 50%, #8B1A1A 100%)',
        borderBottom: '1px solid #E0BFB8',
        boxShadow: '0 4px 24px rgba(224, 191, 184, 0.2)'
      }}>

      {/* Left — Logo + Kanya (clickable, glows on hover) */}
      <div
        className="flex items-center gap-3"
        style={{ cursor: 'pointer' }}
        onClick={() => window.location.reload()}
        onMouseEnter={e => {
          e.currentTarget.querySelector('img').style.boxShadow = '0 0 30px rgba(224, 191, 184, 0.95)'
          e.currentTarget.querySelector('span').style.filter = 'drop-shadow(0 0 18px rgba(224, 191, 184, 0.95))'
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('img').style.boxShadow = '0 0 14px rgba(224, 191, 184, 0.6)'
          e.currentTarget.querySelector('span').style.filter = 'drop-shadow(0 0 8px rgba(224, 191, 184, 0.5))'
        }}
      >
        <img
          src={logo}
          alt="kanya logo"
          style={{
            height: '70px',
            width: '70px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #E0BFB8',
            boxShadow: '0 0 14px rgba(224, 191, 184, 0.6)',
            transition: 'all 0.3s ease',
          }}
        />
        <span
          style={{
            fontFamily: 'Playball, cursive',
            fontSize: '2.2rem',
            fontWeight: '400',
            letterSpacing: '0.05em',
            background: 'linear-gradient(180deg, #F5E6E0 0%, #E0BFB8 40%, #A07060 70%, #E0BFB8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 8px rgba(224, 191, 184, 0.5))',
            transition: 'all 0.3s ease',
          }}
        >
          Kanya
        </span>
      </div>

      {/* Right — Buttons */}
      <div className="flex items-center gap-4">
        <button style={{
          color: '#F5E6E0',
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(#5A0000, #5A0000), linear-gradient(135deg, #F5E6E0, #A07060, #F5E6E0)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          borderRadius: '9999px',
          letterSpacing: '0.12em',
          fontSize: '1.1rem',
          padding: '0.65rem 2.2rem',
          boxShadow: '0 0 10px rgba(224, 191, 184, 0.2)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(224, 191, 184, 0.6)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 10px rgba(224, 191, 184, 0.2)'}
        >
          Login
        </button>

        <button style={{
          color: '#F5E6E0',
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(#5A0000, #5A0000), linear-gradient(135deg, #F5E6E0, #A07060, #F5E6E0)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          borderRadius: '9999px',
          letterSpacing: '0.12em',
          fontSize: '1.1rem',
          padding: '0.65rem 2.2rem',
          boxShadow: '0 0 10px rgba(224, 191, 184, 0.2)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(224, 191, 184, 0.6)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 10px rgba(224, 191, 184, 0.2)'}
        >
          Sign Up
        </button>
      </div>

    </nav>
  )
}

export default Navbar