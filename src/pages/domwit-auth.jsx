import React, { useState } from 'react'

export default function DomwitAuth() {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('tenant')

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #E8E8E4',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 15,
    fontFamily: 'Manrope, sans-serif',
    outline: 'none',
    color: '#1B365D',
    boxSizing: 'border-box',
    background: '#FFFFFF',
  }

  return (
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E8E4', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ fontWeight: 800, fontSize: 20, color: '#1B365D', textDecoration: 'none' }}>DomWit</a>
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/search" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Поиск</a>
          <a href="/chat" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Чат</a>
          <a href="/notifications" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Уведомления</a>
          <a href="/auth" style={{ background: '#2563EB', color: '#FFFFFF', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Войти</a>
        </nav>
      </header>

      <div style={{ maxWidth: 440, margin: '64px auto', padding: '0 24px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 20, padding: '40px 36px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#1B365D', marginBottom: 6 }}>DomWit</div>
            <p style={{ fontSize: 15, color: '#6B7280', margin: 0 }}>
              {tab === 'login' ? 'Войдите в аккаунт' : 'Создайте аккаунт'}
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {[['login', 'Войти'], ['register', 'Регистрация']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: 8,
                  border: 'none',
                  background: tab === key ? '#FFFFFF' : 'transparent',
                  color: tab === key ? '#1B365D' : '#6B7280',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif',
                  boxShadow: tab === key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tab === 'register' && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  style={inputStyle}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Пароль</label>
                {tab === 'login' && (
                  <a href="#" style={{ fontSize: 13, color: '#2563EB', textDecoration: 'none' }}>Забыли пароль?</a>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            {tab === 'register' && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Я являюсь</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[['tenant', 'Арендатором'], ['landlord', 'Арендодателем']].map(([key, label]) => (
                    <label
                      key={key}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid', borderColor: role === key ? '#2563EB' : '#E8E8E4', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', background: role === key ? '#EFF6FF' : '#FFFFFF' }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={key}
                        checked={role === key}
                        onChange={() => setRole(key)}
                        style={{ accentColor: '#2563EB' }}
                      />
                      <span style={{ fontSize: 14, fontWeight: 600, color: role === key ? '#2563EB' : '#374151' }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', marginTop: 4 }}
            >
              {tab === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#9CA3AF' }}>
            {tab === 'login' ? (
              <>Нет аккаунта? <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', padding: 0 }}>Зарегистрироваться</button></>
            ) : (
              <>Уже есть аккаунт? <button onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', padding: 0 }}>Войти</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
