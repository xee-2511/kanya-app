const BASE_URL = 'http://localhost:5000/api'

// Auth
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

// Period
export const logPeriod = async (startDate, cycleLength, periodDuration) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/period/log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ startDate, cycleLength, periodDuration })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const getAllPeriods = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/period/all`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export const getLatestPeriod = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/period/latest`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}