import React, { useState } from 'react'

const SAVED = [
  { id: 1, title: '2-комн. квартира на Тверской', address: 'Москва, Тверская ул., 18', price: 85000, score: 92 },
  { id: 2, title: 'Студия у метро Чистые пруды', address: 'Москва, Чистопрудный б-р, 3', price: 55000, score: 88 },
  { id: 3, title: '1-комн. квартира в Хамовниках', address: 'Москва, Комсомольский пр., 42', price: 70000, score: 95 },
]

const APPLICATIONS = [
  { id: 1, title: '2-комн. квартира на Тверской', address: 'Тверская ул., 18', price: 85000, date: '20 июля', status: 'pending' },
  { id: 2, title: 'Студия у метро Чистые пруды', address: 'Чистопрудный б-р, 3', price: 55000, date: '18 июля', status: 'approved' },
  { id: 3, title: '3-комн. квартира на Арбате', address: 'Арбат ул., 29', price: 130000, date: '15 июля', status: 'rejected' },
]

const APP_STATUS = {
  pending: { label: 'На рассмотрении', bg: '#FEF3C7', color: '#D97706' },
  approved: { label: 'Одобрена', bg: '#ECFDF5', color: '#059669' },
  rejected: { label: 'Отклонена', bg: '#FEF2F2', color: '#DC2626' },
}

const SCORE = 78

export default function DomwitTenant() {
  const [activeTab, setActiveTab] = useState('overview')
  const [saved, setSaved] = useState(SAVED.map(l => l.id))

  function toggleSaved(id) {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const scoreColor = SCORE >= 90 ? '#059669' : SCORE >= 70 ? '#2563EB' : '#D97706'

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

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1B365D', margin: '0 0 6px' }}>Личный кабинет</h1>
            <p style={{ fontSize: 15, color: '#6B7280', margin: 0 }}>Добро пожаловать, Иван</p>
          </div>
          <a href="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#FFFFFF', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>
            Искать жильё
          </a>
        </div>

        {/* Trust Score card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 20, padding: '28px 32px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 40 }}>
          {/* Score circle */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width={120} height={120} viewBox="0 0 120 120">
              <circle cx={60} cy={60} r={50} fill="none" stroke="#F3F4F6" strokeWidth={10} />
              <circle
                cx={60} cy={60} r={50}
                fill="none"
                stroke={scoreColor}
                strokeWidth={10}
                strokeDasharray={`${2 * Math.PI * 50 * SCORE / 100} ${2 * Math.PI * 50}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{SCORE}</span>
              <span style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2, fontWeight: 600 }}>Trust Score</span>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B365D', margin: '0 0 8px' }}>Ваш Trust Score: {SCORE}</h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.65, margin: '0 0 20px' }}>
              Trust Score помогает арендодателям оценить вас как надёжного арендатора. Повысьте балл, заполнив профиль и подтвердив данные.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { label: 'Профиль заполнен', done: true },
                { label: 'Email подтверждён', done: true },
                { label: 'Телефон подтверждён', done: false },
                { label: 'Документ добавлен', done: false },
                { label: 'Рекомендации', done: false },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: item.done ? '#ECFDF5' : '#F9FAFB', border: '1px solid', borderColor: item.done ? '#A7F3D0' : '#E8E8E4', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 600, color: item.done ? '#059669' : '#6B7280' }}>
                  <span>{item.done ? '✓' : '○'}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ background: '#EFF6FF', color: '#2563EB', fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 8, marginBottom: 10 }}>Топ 35%</div>
            <div style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.5 }}>среди<br />арендаторов</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E8E8E4', marginBottom: 28, gap: 4 }}>
          {[['overview', 'Обзор'], ['applications', 'Заявки'], ['saved', 'Сохранённые']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{ padding: '10px 20px', border: 'none', background: 'none', fontSize: 15, fontWeight: activeTab === key ? 700 : 500, color: activeTab === key ? '#2563EB' : '#6B7280', borderBottom: activeTab === key ? '2px solid #2563EB' : '2px solid transparent', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', marginBottom: -1 }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Quick stats */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, padding: '24px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1B365D', margin: '0 0 20px' }}>Активность</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Активных заявок', value: '2', color: '#2563EB' },
                  { label: 'Сохранённых объявлений', value: '3', color: '#7C3AED' },
                  { label: 'Просмотренных объявлений', value: '18', color: '#6B7280' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <span style={{ fontSize: 14, color: '#374151' }}>{item.label}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, padding: '24px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1B365D', margin: '0 0 20px' }}>Последние события</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '✓', text: 'Заявка на студию одобрена', time: '2 ч назад', color: '#059669' },
                  { icon: '👁', text: 'Просмотрели ваш профиль', time: '5 ч назад', color: '#2563EB' },
                  { icon: '💬', text: 'Новое сообщение от арендодателя', time: '1 день назад', color: '#7C3AED' },
                ].map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${e.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                      {e.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{e.text}</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{e.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, overflow: 'hidden' }}>
            {APPLICATIONS.map((app, idx) => (
              <div key={app.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', borderBottom: idx < APPLICATIONS.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ width: 52, height: 52, background: '#F3F4F6', borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏠</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1B365D', marginBottom: 2 }}>{app.title}</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>{app.address} · Подана {app.date}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1B365D', marginRight: 8 }}>
                  {app.price.toLocaleString('ru-RU')} ₽
                </div>
                <span style={{ background: APP_STATUS[app.status].bg, color: APP_STATUS[app.status].color, fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 8, whiteSpace: 'nowrap' }}>
                  {APP_STATUS[app.status].label}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {SAVED.map(l => (
              <div key={l.id} style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ height: 160, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: 13, color: '#9CA3AF' }}>Фото</span>
                  <button
                    onClick={() => toggleSaved(l.id)}
                    style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%', background: '#FFFFFF', border: '1.5px solid #E8E8E4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
                  >
                    {saved.includes(l.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1B365D', margin: 0, lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{l.title}</h4>
                    <span style={{ background: '#ECFDF5', color: '#059669', fontSize: 12, fontWeight: 700, padding: '2px 7px', borderRadius: 5, whiteSpace: 'nowrap' }}>TS {l.score}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 12px' }}>{l.address}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#1B365D' }}>{l.price.toLocaleString('ru-RU')} ₽</span>
                    <a href={`/listing/${l.id}`} style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
                      Открыть
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
