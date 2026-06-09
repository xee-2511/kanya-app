import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLatestPeriod, getAllPeriods, logPeriod } from '../api/auth'
import logo from '../assets/logo.png'

// ── Dino SVG Mascot ──────────────────────────────────────────────
function DinoMascot({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="55" rx="18" ry="14" fill="#5cb85c" />
      <ellipse cx="40" cy="55" rx="14" ry="10" fill="#6dca6d" />
      <circle cx="40" cy="32" r="16" fill="#5cb85c" />
      <circle cx="40" cy="32" r="12" fill="#6dca6d" />
      <circle cx="35" cy="29" r="3" fill="white" />
      <circle cx="45" cy="29" r="3" fill="white" />
      <circle cx="36" cy="29" r="1.5" fill="#333" />
      <circle cx="46" cy="29" r="1.5" fill="#333" />
      <path d="M36 37 Q40 41 44 37" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="32" cy="18" rx="5" ry="8" fill="#5cb85c" transform="rotate(-20 32 18)" />
      <ellipse cx="50" cy="16" rx="4" ry="6" fill="#5cb85c" transform="rotate(15 50 16)" />
      <ellipse cx="28" cy="62" rx="5" ry="8" fill="#5cb85c" transform="rotate(10 28 62)" />
      <ellipse cx="52" cy="62" rx="5" ry="8" fill="#5cb85c" transform="rotate(-10 52 62)" />
      <circle cx="36" cy="28" r="1" fill="white" opacity="0.8" />
      <circle cx="46" cy="28" r="1" fill="white" opacity="0.8" />
      <path d="M34 22 Q36 19 38 22" stroke="#eb427d" strokeWidth="1" fill="none" />
      <path d="M42 22 Q44 19 46 22" stroke="#eb427d" strokeWidth="1" fill="none" />
    </svg>
  )
}

// ── Mood Tracker ─────────────────────────────────────────────────
function MoodTracker({ phase }) {
  const [selected, setSelected] = useState(null)

  const phaseMoods = {
    'Menstrual Phase': { suggested: 'Tired', message: 'It\'s okay to feel low energy during your period. Rest up!' },
    'Follicular Phase': { suggested: 'Happy', message: 'Rising estrogen boosts your mood naturally. Ride the wave!' },
    'Ovulation': { suggested: 'Happy', message: 'Peak energy and confidence — you\'re glowing today!' },
    'Luteal Phase': { suggested: 'Anxious', message: 'PMS is real. Be gentle with yourself today.' },
  }

  const moods = [
    { label: 'Happy', color: '#f5c518' },
    { label: 'Calm', color: '#4bb5aa' },
    { label: 'Tired', color: '#9CA3AF' },
    { label: 'Anxious', color: '#f39ab8' },
    { label: 'Sad', color: '#6B7280' },
    { label: 'Irritable', color: '#eb427d' },
  ]

  const suggestion = phaseMoods[phase]

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '20px', padding: '24px',
      boxShadow: '0 2px 12px rgba(235,66,125,0.06)', border: '1px solid #f8e2ec',
      transition: 'all 0.3s ease'
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(235,66,125,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(235,66,125,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today's Mood</p>
      <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2D2D2D', marginBottom: '4px' }}>How are you feeling?</p>
      {suggestion && !selected && (
        <p style={{ fontSize: '0.75rem', color: '#eb427d', marginBottom: '12px' }}>
          Based on your phase: likely <strong>{suggestion.suggested}</strong>
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {moods.map(mood => (
          <button key={mood.label} onClick={() => setSelected(mood.label)} style={{
            padding: '5px 12px', borderRadius: '9999px', fontSize: '0.75rem',
            fontWeight: selected === mood.label ? '700' : '400',
            background: selected === mood.label ? mood.color : 'transparent',
            color: selected === mood.label ? '#FFFFFF' : mood.color,
            border: `1.5px solid ${mood.color}`,
            cursor: 'pointer', transition: 'all 0.2s ease',
            boxShadow: selected === mood.label ? `0 0 12px ${mood.color}88` : 'none'
          }}>
            {mood.label}
          </button>
        ))}
      </div>
      {selected && suggestion && (
        <div style={{ background: '#fff7fa', borderRadius: '12px', padding: '10px 12px', border: '1px solid #f8e2ec' }}>
          <p style={{ fontSize: '0.75rem', color: '#eb427d', fontWeight: '600', marginBottom: '2px' }}>Kanya says:</p>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.5 }}>{suggestion.message}</p>
        </div>
      )}
    </div>
  )
}

// ── Water Tracker ────────────────────────────────────────────────
function WaterTracker() {
  const [glasses, setGlasses] = useState(0)
  const goal = 8
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '20px', padding: '24px',
      boxShadow: '0 2px 12px rgba(235,66,125,0.06)', border: '1px solid #f8e2ec',
      transition: 'all 0.3s ease'
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(75,181,170,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(235,66,125,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Water Intake</p>
      <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2D2D2D', marginBottom: '16px' }}>
        {glasses}/{goal} glasses
        {glasses >= goal && <span style={{ color: '#4bb5aa', marginLeft: '8px', fontSize: '0.75rem' }}>Goal reached! 🎉</span>}
      </p>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {Array.from({ length: goal }).map((_, i) => (
          <div key={i} onClick={() => setGlasses(i < glasses ? i : i + 1)} style={{
            width: '26px', height: '34px', borderRadius: '6px 6px 4px 4px',
            background: i < glasses ? 'linear-gradient(180deg, #6dd5ca, #4bb5aa)' : '#f0f9f8',
            cursor: 'pointer', transition: 'all 0.2s ease',
            border: i < glasses ? '1.5px solid #4bb5aa' : '1.5px solid #e7eaf5',
            boxShadow: i < glasses ? '0 0 8px rgba(75,181,170,0.4)' : 'none'
          }} />
        ))}
      </div>
      <div style={{ background: '#f0f9f8', borderRadius: '9999px', height: '6px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #4bb5aa, #8ADBD5)',
          borderRadius: '9999px', height: '6px',
          width: `${(glasses / goal) * 100}%`,
          transition: 'width 0.3s ease',
          boxShadow: '0 0 8px rgba(75,181,170,0.5)'
        }} />
      </div>
    </div>
  )
}

// ── Health Awareness Cards ────────────────────────────────────────
function HealthCards() {
  const [expanded, setExpanded] = useState(null)

  const cards = [
    {
      id: 0,
      title: 'Don\'t worry about cramps',
      short: 'Cramps are completely normal during your period.',
      full: 'Period cramps happen when your uterus contracts to shed its lining. Try a warm water bottle on your lower belly, light stretching, or ibuprofen if needed. If cramps are severe, talk to a doctor.',
      color: '#eb427d', bg: 'linear-gradient(135deg, #fff0f5, #ffd6e7)',
      dino: true
    },
    {
      id: 1,
      title: 'How to use a pad',
      short: 'Pads are easy to use and totally safe.',
      full: 'Peel the backing off the pad and stick the sticky side to your underwear. Change every 4-6 hours or sooner if needed. Always wash your hands before and after. Wrap used pads and dispose in a bin, not a toilet.',
      color: '#4bb5aa', bg: 'linear-gradient(135deg, #e7faf8, #c8f0ec)',
      dino: false
    },
    {
      id: 2,
      title: 'What is a yeast infection?',
      short: 'Common, treatable, and nothing to be embarrassed about.',
      full: 'A yeast infection causes itching, burning, and thick white discharge. It\'s caused by an overgrowth of natural yeast. It\'s NOT an STI and is very common. See a doctor for antifungal treatment — it clears up quickly.',
      color: '#c9940a', bg: 'linear-gradient(135deg, #fdf6d8, #fdeea0)',
      dino: false
    },
    {
      id: 3,
      title: 'Hygiene tips during period',
      short: 'Simple habits that keep you fresh and healthy.',
      full: 'Change your pad/tampon every 4-6 hours. Wash your intimate area with plain water — no soap inside. Wear breathable cotton underwear. Stay hydrated. Avoid scented products — they disrupt natural pH balance.',
      color: '#9b59b6', bg: 'linear-gradient(135deg, #f5e6ff, #e8c8ff)',
      dino: false
    },
    {
      id: 4,
      title: 'Infection warning signs',
      short: 'Know when something needs attention.',
      full: 'See a doctor if you notice: unusual colored discharge (green/grey), strong bad smell, severe itching or burning, pain during urination, or unusual bleeding between periods. Early treatment is always better.',
      color: '#e74c3c', bg: 'linear-gradient(135deg, #fff0ee, #ffd5d0)',
      dino: false
    },
    {
      id: 5,
      title: 'Your cycle is unique',
      short: 'Every body is different — that\'s totally okay.',
      full: 'Normal cycles range from 21 to 35 days. Some people have light periods, some heavy. Some have 3-day periods, some 7 days. All of this can be completely normal. Track your own patterns and know your body.',
      color: '#eb427d', bg: 'linear-gradient(135deg, #fff0f5, #ffe0ee)',
      dino: true
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <DinoMascot size={48} />
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D2D2D', marginBottom: '2px' }}>Kanya Knows</h3>
          <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Tap any card to learn more</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {cards.map(card => (
          <div key={card.id}
            onClick={() => setExpanded(expanded === card.id ? null : card.id)}
            style={{
              background: card.bg, borderRadius: '20px', padding: '20px',
              cursor: 'pointer', transition: 'all 0.3s ease',
              border: `1px solid ${card.color}22`,
              boxShadow: expanded === card.id ? `0 8px 30px ${card.color}33` : '0 2px 12px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 12px 35px ${card.color}33`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = expanded === card.id ? `0 8px 30px ${card.color}33` : '0 2px 12px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <p style={{ fontSize: '0.88rem', fontWeight: '700', color: card.color, flex: 1, lineHeight: 1.4 }}>{card.title}</p>
              {card.dino && <DinoMascot size={36} />}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.5 }}>
              {expanded === card.id ? card.full : card.short}
            </p>
            <p style={{ fontSize: '0.72rem', color: card.color, marginTop: '8px', fontWeight: '600' }}>
              {expanded === card.id ? 'Tap to collapse ↑' : 'Tap to learn more ↓'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Dashboard ───────────────────────────────────────────────
function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [latestPeriod, setLatestPeriod] = useState(null)
  const [allPeriods, setAllPeriods] = useState([])
  const [showLogModal, setShowLogModal] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [form, setForm] = useState({ startDate: '', cycleLength: 28, periodDuration: 5 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [latest, all] = await Promise.all([getLatestPeriod(), getAllPeriods()])
      setLatestPeriod(latest)
      setAllPeriods(all)
    } catch {
      setShowLogModal(true)
    } finally {
      setLoading(false)
    }
  }

  const handleLogPeriod = async () => {
    if (!form.startDate) return alert('Please select a date')
    try {
      await logPeriod(form.startDate, form.cycleLength, form.periodDuration)
      await fetchData()
      setShowLogModal(false)
    } catch (err) { alert(err.message) }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const getCycleInfo = () => {
    if (!latestPeriod) return null
    const today = new Date()
    const lastPeriod = new Date(latestPeriod.startDate)
    const daysSince = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24))
    const currentDay = (daysSince % latestPeriod.cycleLength) + 1
    const ovulationDay = latestPeriod.cycleLength - 14
    const daysUntilNextPeriod = latestPeriod.cycleLength - currentDay + 1
    const daysUntilOvulation = ovulationDay - currentDay
    const isInPeriod = currentDay <= latestPeriod.periodDuration
    const isOvulating = currentDay >= ovulationDay - 2 && currentDay <= ovulationDay + 2
    const isLuteal = currentDay > ovulationDay + 2
    const cyclesElapsed = Math.floor(daysSince / latestPeriod.cycleLength)
    const currentCycleStart = new Date(lastPeriod)
    currentCycleStart.setDate(currentCycleStart.getDate() + cyclesElapsed * latestPeriod.cycleLength)
    const nextPeriodDate = new Date(currentCycleStart)
    nextPeriodDate.setDate(nextPeriodDate.getDate() + latestPeriod.cycleLength)

    let phase = 'Follicular Phase'
    let phaseDesc = 'Your body is preparing for ovulation'
    let pregnancyChance = 'Low'
    let pregnancyColor = '#4bb5aa'
    if (isInPeriod) { phase = 'Menstrual Phase'; phaseDesc = 'Your period is active'; pregnancyChance = 'Very Low'; pregnancyColor = '#9CA3AF' }
    else if (isOvulating) { phase = 'Ovulation'; phaseDesc = 'High chance of getting pregnant'; pregnancyChance = 'High'; pregnancyColor = '#eb427d' }
    else if (isLuteal) { phase = 'Luteal Phase'; phaseDesc = 'Post-ovulation phase'; pregnancyChance = 'Low'; pregnancyColor = '#4bb5aa' }
    else { pregnancyChance = 'Medium'; pregnancyColor = '#c9940a' }

    return {
      currentDay, cycleLength: latestPeriod.cycleLength,
      periodDuration: latestPeriod.periodDuration,
      daysUntilNextPeriod, daysUntilOvulation,
      isInPeriod, isOvulating, isLuteal,
      nextPeriodDate: nextPeriodDate.toDateString(),
      ovulationStart: ovulationDay - 2,
      ovulationEnd: ovulationDay + 2,
      phase, phaseDesc, pregnancyChance, pregnancyColor
    }
  }

  const cycleInfo = getCycleInfo()

  const renderCycleCircle = () => {
    if (!cycleInfo) return null
    const size = 300
    const cx = size / 2, cy = size / 2, radius = 120
    const circumference = 2 * Math.PI * radius
    const periodArc = (cycleInfo.periodDuration / cycleInfo.cycleLength) * circumference
    const ovulationArc = (5 / cycleInfo.cycleLength) * circumference
    const ovulationOffset = -((cycleInfo.ovulationStart / cycleInfo.cycleLength) * circumference)
    const progressArc = (cycleInfo.currentDay / cycleInfo.cycleLength) * circumference
    const angle = ((cycleInfo.currentDay / cycleInfo.cycleLength) * 360 - 90) * (Math.PI / 180)
    const dotX = cx + radius * Math.cos(angle)
    const dotY = cy + radius * Math.sin(angle)

    return (
      <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
        <svg width={size} height={size} style={{ filter: 'drop-shadow(0 4px 24px rgba(235,66,125,0.2))' }}>
          <defs>
            <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f39ab8" />
              <stop offset="100%" stopColor="#eb427d" />
            </linearGradient>
          </defs>
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f8e2ec" strokeWidth="18" />
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke="url(#progressGrad)" strokeWidth="18"
            strokeDasharray={`${progressArc} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`} />
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke="#eb427d" strokeWidth="18" opacity="0.9"
            strokeDasharray={`${periodArc} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`} />
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke="#4bb5aa" strokeWidth="18"
            strokeDasharray={`${ovulationArc} ${circumference}`}
            strokeDashoffset={ovulationOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`} />
          <circle cx={dotX} cy={dotY} r="12" fill="white" opacity="0.9" />
          <circle cx={dotX} cy={dotY} r="8" fill="#eb427d" />
          <circle cx={dotX} cy={dotY} r="4" fill="white" />
        </svg>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', textAlign: 'center', width: '160px'
        }}>
          <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '2px' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '2px' }}>Day of cycle</div>
          <div style={{ fontSize: '3.2rem', fontWeight: '800', color: '#eb427d', lineHeight: 1 }}>
            {cycleInfo.currentDay}
          </div>
          <div style={{
            fontSize: '0.75rem', fontWeight: '700', marginTop: '6px',
            color: cycleInfo.isOvulating ? '#4bb5aa' : '#eb427d',
            background: cycleInfo.isOvulating ? '#e7faf8' : '#fff0f5',
            borderRadius: '9999px', padding: '2px 10px', display: 'inline-block'
          }}>
            {cycleInfo.phase}
          </div>
        </div>
      </div>
    )
  }

  const renderCycleDots = (period) => {
    const total = period.cycleLength
    const ovDay = period.cycleLength - 14
    return (
      <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', marginTop: '8px' }}>
        {Array.from({ length: total }).map((_, i) => {
          const day = i + 1
          const isPeriod = day <= period.periodDuration
          const isOv = day >= ovDay - 2 && day <= ovDay + 2
          return (
            <div key={i} style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: isPeriod ? '#eb427d' : isOv ? '#4bb5aa' : '#f8e2ec',
              boxShadow: isPeriod ? '0 0 4px rgba(235,66,125,0.4)' : isOv ? '0 0 4px rgba(75,181,170,0.4)' : 'none'
            }} />
          )
        })}
      </div>
    )
  }

  const renderCycleTrends = () => {
    if (allPeriods.length < 2) return (
      <div style={{ textAlign: 'center', padding: '32px', color: '#9CA3AF', fontSize: '0.9rem' }}>
        <DinoMascot size={60} />
        <p style={{ marginTop: '12px' }}>Log at least 2 cycles to see trends</p>
      </div>
    )
    const data = [...allPeriods].reverse().slice(-6)
    const lengths = data.map(p => p.cycleLength)
    const minLen = Math.min(...lengths) - 5
    const maxLen = Math.max(...lengths) + 5
    const graphW = 500
    const graphH = 140
    const points = lengths.map((len, i) => ({
      x: lengths.length === 1 ? graphW / 2 : (i / (lengths.length - 1)) * graphW,
      y: graphH - ((len - minLen) / (maxLen - minLen)) * graphH
    }))
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

    return (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg width="100%" viewBox={`-20 -10 ${graphW + 60} ${graphH + 50}`} style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eb427d" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#eb427d" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[21, 28, 35].map(val => {
            const y = graphH - ((val - minLen) / (maxLen - minLen)) * graphH
            return (
              <g key={val}>
                <line x1={0} y1={y} x2={graphW} y2={y} stroke="#f8e2ec" strokeWidth="1" strokeDasharray="4" />
                <text x={graphW + 8} y={y + 4} fontSize="10" fill="#9CA3AF">{val}</text>
              </g>
            )
          })}
          {points.length > 1 && (
            <path d={`${pathD} L ${points[points.length - 1].x} ${graphH} L 0 ${graphH} Z`}
              fill="url(#areaGrad)" />
          )}
          {points.length > 1 && (
            <path d={pathD} fill="none" stroke="#eb427d" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round" />
          )}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="7" fill="#eb427d" opacity="0.2" />
              <circle cx={p.x} cy={p.y} r="5" fill="#eb427d" />
              <circle cx={p.x} cy={p.y} r="2.5" fill="white" />
              <text x={p.x} y={p.y - 14} fontSize="11" fill="#eb427d" textAnchor="middle" fontWeight="700">
                {lengths[i]}
              </text>
              <text x={p.x} y={graphH + 22} fontSize="10" fill="#9CA3AF" textAnchor="middle">
                {new Date(data[i].startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            </g>
          ))}
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
          <div style={{ width: '20px', height: '2px', background: '#f8e2ec', borderRadius: '2px' }} />
          <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Normal range (21–35 days)</span>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: 'home', label: 'Today' },
    { id: 'cycle', label: 'Cycle Tracker' },
    { id: 'symptom', label: 'Symptom Checker' },
    { id: 'pregnancy', label: 'Pregnancy' },
    { id: 'infection', label: 'Infection Checker' },
  ]

  const glowStyle = {
    onMouseEnter: (e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(235,66,125,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' },
    onMouseLeave: (e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #f9eef6 0%, #f7dce7 100%)'
    }}>
      <DinoMascot size={80} />
      <p style={{ color: '#eb427d', fontSize: '1.1rem', fontFamily: 'Playball, cursive', marginTop: '16px' }}>Loading your health data...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f9f5fb', display: 'flex' }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: '220px', minHeight: '100vh', background: '#FFFFFF',
        boxShadow: '2px 0 20px rgba(235,66,125,0.08)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', left: 0, top: 0, zIndex: 100
      }}>
        {/* Logo + User */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #f8e2ec' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer' }}
            onClick={() => navigate('/')}>
            <img src={logo} alt="Kanya" style={{
              width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover',
              border: '2px solid #eb427d',
              boxShadow: '0 0 12px rgba(235,66,125,0.3)',
              transition: 'all 0.3s ease'
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 25px rgba(235,66,125,0.7)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 12px rgba(235,66,125,0.3)'}
            />
            <span style={{
              fontFamily: 'Playball, cursive', fontSize: '1.5rem',
              background: 'linear-gradient(135deg, #eb427d, #f39ab8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Kanya</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #eb427d, #f39ab8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', fontWeight: '700', fontSize: '0.9rem',
              boxShadow: '0 0 10px rgba(235,66,125,0.3)'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#2D2D2D' }}>{user?.name}</p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>
                {cycleInfo ? `Day ${cycleInfo.currentDay} of cycle` : 'No cycle data'}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1, padding: '12px 0' }}>
          {sidebarItems.map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} style={{
              padding: '12px 20px', cursor: 'pointer', fontSize: '0.88rem',
              color: activeTab === item.id ? '#eb427d' : '#6B7280',
              fontWeight: activeTab === item.id ? '700' : '400',
              background: activeTab === item.id ? '#fff0f5' : 'transparent',
              borderRight: activeTab === item.id ? '3px solid #eb427d' : '3px solid transparent',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === item.id ? 'inset 0 0 20px rgba(235,66,125,0.05)' : 'none'
            }}
              onMouseEnter={e => { if (activeTab !== item.id) { e.currentTarget.style.background = '#fff7fa'; e.currentTarget.style.color = '#eb427d' } }}
              onMouseLeave={e => { if (activeTab !== item.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280' } }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Settings + Logout */}
        <div style={{ borderTop: '1px solid #f8e2ec', padding: '8px 0' }}>
          {[
            { label: 'Settings', color: '#6B7280', hoverBg: '#fff7fa' },
            { label: 'Logout', color: '#E05C5C', hoverBg: '#fff0f0', action: handleLogout }
          ].map(item => (
            <div key={item.label} onClick={item.action} style={{
              padding: '12px 20px', cursor: 'pointer', fontSize: '0.88rem',
              color: item.color, transition: 'all 0.2s ease'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = item.hoverBg; e.currentTarget.style.boxShadow = `0 0 12px ${item.color}22` }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ marginLeft: '220px', flex: 1, padding: '40px', minHeight: '100vh' }}>

        {activeTab === 'home' && (
          <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '4px' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2D2D2D' }}>
                  Hey, {user?.name?.split(' ')[0]} 
                </h1>
              </div>
              <DinoMascot size={64} />
            </div>

            {/* Cycle + Pregnancy Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', marginBottom: '24px' }}>

              {/* Cycle Card */}
              <div style={{
                background: 'linear-gradient(135deg, #fff0f5, #f9eef6)',
                borderRadius: '24px', padding: '28px',
                boxShadow: '0 4px 24px rgba(235,66,125,0.08)',
                border: '1px solid #f8e2ec'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Prediction</p>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2D2D2D' }}>
                      {cycleInfo?.phase || 'Log your period'}
                    </h2>
                    <p style={{ fontSize: '0.82rem', color: '#9CA3AF', marginTop: '4px' }}>
                      {cycleInfo?.phaseDesc}
                    </p>
                  </div>
                  <button onClick={() => setShowLogModal(true)} style={{
                    background: '#eb427d', color: '#FFFFFF',
                    border: 'none', borderRadius: '9999px',
                    padding: '0.45rem 1.2rem', fontSize: '0.8rem',
                    cursor: 'pointer', fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(235,66,125,0.35)',
                    transition: 'all 0.2s ease'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 25px rgba(235,66,125,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(235,66,125,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    + Log Period
                  </button>
                </div>
                {renderCycleCircle()}
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Pregnancy chance */}
                {cycleInfo && (
                  <div style={{
                    background: '#FFFFFF', borderRadius: '20px', padding: '20px',
                    boxShadow: '0 2px 12px rgba(235,66,125,0.06)', border: '1px solid #f8e2ec',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 30px ${cycleInfo.pregnancyColor}33`; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(235,66,125,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pregnancy Chance</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '800', color: cycleInfo.pregnancyColor, marginBottom: '4px' }}>
                      {cycleInfo.pregnancyChance}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#9CA3AF', lineHeight: 1.4 }}>
                      {cycleInfo.isOvulating ? 'You are in your fertile window' : `Based on Day ${cycleInfo.currentDay} of your cycle`}
                    </p>
                    <div style={{
                      marginTop: '12px', height: '6px', background: '#f8e2ec',
                      borderRadius: '9999px', overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%', borderRadius: '9999px',
                        background: cycleInfo.pregnancyColor,
                        width: cycleInfo.pregnancyChance === 'High' ? '85%' : cycleInfo.pregnancyChance === 'Medium' ? '50%' : cycleInfo.pregnancyChance === 'Low' ? '20%' : '5%',
                        boxShadow: `0 0 8px ${cycleInfo.pregnancyColor}88`,
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                )}

                {/* Next period + ovulation */}
                {cycleInfo && [
                  { label: 'Next Period', value: `${cycleInfo.daysUntilNextPeriod} days`, sub: cycleInfo.nextPeriodDate, color: '#eb427d' },
                  { label: 'Ovulation', value: `Day ${cycleInfo.ovulationStart}–${cycleInfo.ovulationEnd}`, sub: cycleInfo.daysUntilOvulation > 0 ? `in ${cycleInfo.daysUntilOvulation} days` : 'Now!', color: '#4bb5aa' },
                ].map((card, i) => (
                  <div key={i} style={{
                    background: '#FFFFFF', borderRadius: '16px', padding: '16px 20px',
                    boxShadow: '0 2px 12px rgba(235,66,125,0.06)',
                    border: '1px solid #f8e2ec', transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}22` }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(235,66,125,0.06)' }}
                  >
                    <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '4px' }}>{card.label}</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: '700', color: card.color }}>{card.value}</p>
                    <p style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '2px' }}>{card.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Insight */}
            {cycleInfo && (
              <div style={{
                background: 'linear-gradient(135deg, #fff0f5, #f9eef6)',
                borderRadius: '20px', padding: '20px 24px',
                boxShadow: '0 2px 12px rgba(235,66,125,0.06)',
                border: '1px solid #f8e2ec', marginBottom: '24px',
                display: 'flex', alignItems: 'center', gap: '16px',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(235,66,125,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(235,66,125,0.06)' }}
              >
                <DinoMascot size={52} />
                <div>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Kanya's Daily Tip</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: '600', color: '#2D2D2D', lineHeight: 1.6 }}>
                    {cycleInfo.isInPeriod && 'Rest and stay hydrated. A warm compress helps cramps. Avoid caffeine and salty snacks today.'}
                    {cycleInfo.isOvulating && 'You\'re in your fertile window! Energy is at its peak — great day for exercise and social plans.'}
                    {cycleInfo.isLuteal && 'You may feel more tired than usual. Prioritize sleep, reduce stress, and eat magnesium-rich foods.'}
                    {!cycleInfo.isInPeriod && !cycleInfo.isOvulating && !cycleInfo.isLuteal && 'Estrogen is rising in your follicular phase — you\'ll likely feel more energetic and focused today!'}
                  </p>
                </div>
              </div>
            )}

            {/* Mood + Water */}
            {cycleInfo && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <MoodTracker phase={cycleInfo.phase} />
                <WaterTracker />
              </div>
            )}

            {/* Cycle Trends */}
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', padding: '28px',
              boxShadow: '0 2px 12px rgba(235,66,125,0.06)',
              border: '1px solid #f8e2ec', marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D2D2D', marginBottom: '4px' }}>Cycle Trends</h3>
              <p style={{ fontSize: '0.8rem', color: '#9CA3AF', marginBottom: '20px' }}>
                {allPeriods.length >= 2 ? `Your last ${Math.min(allPeriods.length, 6)} cycles` : 'Log more cycles to see trends'}
              </p>
              {renderCycleTrends()}
            </div>

            {/* Cycle History */}
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', padding: '28px',
              boxShadow: '0 2px 12px rgba(235,66,125,0.06)',
              border: '1px solid #f8e2ec', marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D2D2D' }}>Cycle History</h3>
                <span style={{ fontSize: '0.8rem', color: '#eb427d', cursor: 'pointer', fontWeight: '600' }}>See all</span>
              </div>
              {allPeriods.length === 0 ? (
                <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>No cycles logged yet</p>
              ) : (
                allPeriods.slice(0, 4).map((period, i) => {
                  const nextPeriod = allPeriods[i - 1]
                  const start = new Date(period.startDate)
                  const end = nextPeriod ? new Date(nextPeriod.startDate) : null
                  const actualLength = end ? Math.floor((end - start) / (1000 * 60 * 60 * 24)) : period.cycleLength
                  return (
                    <div key={period._id} style={{
                      paddingBottom: '20px', marginBottom: '20px',
                      borderBottom: i < Math.min(allPeriods.length, 4) - 1 ? '1px solid #f8e2ec' : 'none'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <p style={{ fontSize: '0.88rem', fontWeight: '700', color: '#2D2D2D' }}>{actualLength} days</p>
                        <p style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
                          {start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {end ? ` – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ' – Present'}
                        </p>
                      </div>
                      {renderCycleDots(period)}
                    </div>
                  )
                })
              )}
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                {[['#eb427d', 'Period'], ['#4bb5aa', 'Ovulation'], ['#f8e2ec', 'Normal']].map(([color, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, boxShadow: `0 0 4px ${color}88` }} />
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Awareness Cards */}
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', padding: '28px',
              boxShadow: '0 2px 12px rgba(235,66,125,0.06)',
              border: '1px solid #f8e2ec', marginBottom: '40px'
            }}>
              <HealthCards />
            </div>
          </div>
        )}

        {activeTab !== 'home' && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '70vh', flexDirection: 'column', gap: '16px'
          }}>
            <DinoMascot size={100} />
            <h2 style={{ color: '#eb427d', fontFamily: 'Playball, cursive', fontSize: '2rem', marginTop: '8px' }}>Coming Soon</h2>
            <p style={{ color: '#9CA3AF' }}>This feature is being built</p>
          </div>
        )}
      </div>

      {/* ── Log Period Modal ── */}
      {showLogModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#FFFFFF', borderRadius: '24px', padding: '40px',
            width: '100%', maxWidth: '420px',
            boxShadow: '0 20px 60px rgba(235,66,125,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <DinoMascot size={44} />
              <h2 style={{ fontFamily: 'Playball, cursive', fontSize: '1.8rem', color: '#eb427d' }}>Log Period</h2>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '28px' }}>Track your cycle accurately</p>

            {[
              { label: 'Period Start Date', type: 'date', key: 'startDate' }
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#4A4A4A', marginBottom: '8px' }}>{field.label}</label>
                <input type={field.type} value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '12px',
                    border: '1.5px solid #f8e2ec', background: '#fff7fa',
                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.border = '1.5px solid #eb427d'}
                  onBlur={e => e.target.style.border = '1.5px solid #f8e2ec'}
                />
              </div>
            ))}

            {[
              { label: 'Cycle Length', key: 'cycleLength', min: 21, max: 35, unit: 'days' },
              { label: 'Period Duration', key: 'periodDuration', min: 2, max: 8, unit: 'days' }
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#4A4A4A', marginBottom: '8px' }}>
                  {field.label}: <strong>{form[field.key]} {field.unit}</strong>
                </label>
                <input type="range" min={field.min} max={field.max} value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: '#eb427d' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9CA3AF' }}>
                  <span>{field.min} days</span><span>{field.max} days</span>
                </div>
              </div>
            ))}

            <button onClick={handleLogPeriod} style={{
              width: '100%', padding: '0.85rem',
              background: 'linear-gradient(135deg, #eb427d, #f39ab8)',
              color: '#FFFFFF', border: 'none', borderRadius: '12px',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(235,66,125,0.35)',
              transition: 'all 0.3s ease', marginBottom: '12px', marginTop: '12px'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(235,66,125,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(235,66,125,0.35)' }}
            >
              Save & Continue
            </button>

            {latestPeriod && (
              <button onClick={() => setShowLogModal(false)} style={{
                width: '100%', padding: '0.75rem', background: 'transparent',
                color: '#9CA3AF', border: 'none', cursor: 'pointer', fontSize: '0.9rem'
              }}>Cancel</button>
            )}
          </div>
        </div>
      )}

      {/* ── Floating Chatbot ── */}
      <div style={{
        position: 'fixed', bottom: '32px', right: '32px',
        width: '60px', height: '60px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #eb427d, #f39ab8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', boxShadow: '0 8px 25px rgba(235,66,125,0.4)',
        transition: 'all 0.3s ease', zIndex: 999
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(235,66,125,0.7)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(235,66,125,0.4)' }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </div>
  )
}

export default Dashboard