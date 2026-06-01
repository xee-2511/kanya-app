import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between"
      style={{
        background: 'linear-gradient(135deg, #f39ab8 0%, #e8789f 50%, #f39ab8 100%)',
        boxShadow: '0 4px 32px rgba(243, 154, 184, 0.4)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>

      {/* Left — Logo + Kanya */}
      <div
        className="flex items-center gap-3"
        style={{ cursor: 'pointer' }}
        onClick={() => window.location.reload()}
        onMouseEnter={e => {
          e.currentTarget.querySelector('img').style.boxShadow = '0 0 30px rgba(255,255,255, 0.9)'
          e.currentTarget.querySelector('span').style.filter = 'drop-shadow(0 0 18px rgba(255,255,255,0.9))'
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('img').style.boxShadow = '0 0 14px rgba(255,255,255,0.4)'
          e.currentTarget.querySelector('span').style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.4))'
        }}
      >
        <img
          src={logo}
          alt="kanya logo"
          style={{
            height: '65px',
            width: '65px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: '0 0 14px rgba(255,255,255,0.4)',
            transition: 'all 0.3s ease',
          }}
        />
        <span style={{
          fontFamily: 'Playball, cursive',
          fontSize: '2.4rem',
          fontWeight: '400',
          letterSpacing: '0.05em',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #f8e2ec 40%, #FFFFFF 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
          transition: 'all 0.3s ease',
        }}>
          Kanya
        </span>
      </div>

      {/* Right — Buttons */}
      <div className="flex items-center gap-4">
        {['Login', 'Sign Up'].map(label => (
          <button key={label} style={{
            color: '#e8789f',
            background: '#f8e2ec',
            border: 'none',
            borderRadius: '9999px',
            letterSpacing: '0.1em',
            fontSize: '0.9rem',
            fontWeight: '700',
            padding: '0.6rem 2rem',
            boxShadow: '0 4px 15px rgba(248, 226, 236, 0.5)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 4px 25px rgba(248, 226, 236, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.background = '#FFFFFF'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 226, 236, 0.5)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.background = '#f8e2ec'
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar