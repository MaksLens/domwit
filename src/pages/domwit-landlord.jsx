import React, { useState } from 'react'

const LISTINGS = [
  { id: 1, title: '2-комн. квартира на Тверской', address: 'Тверская ул., 18', price: 85000, views: 47, responses: 6, status: 'active' },
  { id: 2, title: 'Студия у метро Чистые пруды', address: 'Чистопрудный б-р, 3', price: 55000, views: 31, responses: 4, status: 'active' },
  { id: 3, title: '1-комн. квартира в Хамовниках', address: 'Комсомольский пр., 42', price: 70000, views: 12, responses: 2, status: 'draft' },
]

const STATUS_LABEL = { active: 'Активно', draft: 'Черновик', paused: 'Приостановлено' }
const STATUS_COLOR = { active: { bg: '#ECFDF5', color: '#059669' }, draft: { bg: '#F9FAFB', color: '#6B7280' }, paused: { bg: '#FEF3C7', color: '#D97706' } }

export default function DomwitLandlord() {
  const [activeTab, setActiveTab] = useState('listings')

  const stats = [
    { label: 'Объявлений', value: '3', sub: '2 активных', color: '#2563EB' },
    { label: 'Откликов', value: '12', sub: 'За 30 дней', color: '#7C3AED' },
    { label: 'Просмотров', value: '90', sub: 'За 30 дней', color: '#059669' },
    { label: 'Показов', value: '2', sub: 'Запланировано', color: '#D97706' },
  ]

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
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1B365D', margin: '0 0 6px' }}>Кабинет арендодателя</h1>
            <p style={{ fontSize: 15, color: '#6B7280', margin: 0 }}>Добро пожаловать, Алексей</p>
          </div>
          <a href="/create-listing" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#059669', color: '#FFFFFF', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>
            + Новое объявление
          </a>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, padding: '24px 20px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1B365D', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E8E8E4', marginBottom: 28, gap: 4 }}>
          {[['listings', 'Объявления'], ['responses', 'Отклики'], ['viewings', 'Показы']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{ padding: '10px 20px', border: 'none', background: 'none', fontSize: 15, fontWeight: activeTab === key ? 700 : 500, color: activeTab === key ? '#2563EB' : '#6B7280', borderBottom: activeTab === key ? '2px solid #2563EB' : '2px solid transparent', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', marginBottom: -1 }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'listings' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 80px 120px 100px', gap: 16, padding: '14px 24px', background: '#F9FAFB', borderBottom: '1px solid #E8E8E4' }}>
              {['Объявление', 'Цена', 'Просмотры', 'Отклики', 'Статус', ''].map(h => (
                <span key={h} style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</span>
              ))}
            </div>
            {LISTINGS.map((l, idx) => (
              <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 80px 120px 100px', gap: 16, padding: '20px 24px', borderBottom: idx < LISTINGS.length - 1 ? '1px solid #F3F4F6' : 'none', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1B365D', marginBottom: 2 }}>{l.title}</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>{l.address}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1B365D' }}>{l.price.toLocaleString('ru-RU')} ₽</div>
                <div style={{ fontSize: 15, color: '#374151' }}>{l.views}</div>
                <div style={{ fontSize: 15, color: '#374151' }}>{l.responses}</div>
                <div>
                  <span style={{ background: STATUS_COLOR[l.status].bg, color: STATUS_COLOR[l.status].color, fontSize: 13, fontWeight: 600, padding: '4px 10px', borderRadius: 6 }}>
                    {STATUS_LABEL[l.status]}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ background: 'none', border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151', fontFamily: 'Manrope, sans-serif' }}>Ред.</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'responses' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { name: 'Мария Иванова', listing: '2-комн. на Тверской', score: 94, date: '2 ч назад', status: 'new' },
              { name: 'Дмитрий Козлов', listing: 'Студия у Чистых прудов', score: 87, date: '5 ч назад', status: 'viewed' },
              { name: 'Анна Смирнова', listing: '2-комн. на Тверской', score: 91, date: '1 день назад', status: 'viewed' },
            ].map((r, idx, arr) => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', borderBottom: idx < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#2563EB', flexShrink: 0 }}>
                  {r.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1B365D' }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>{r.listing} · {r.date}</div>
                </div>
                <div style={{ background: '#ECFDF5', color: '#059669', fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 6 }}>TS {r.score}</div>
                {r.status === 'new' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB', flexShrink: 0 }} />}
                <button style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>Ответить</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'viewings' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { name: 'Мария Иванова', listing: '2-комн. на Тверской', date: '25 июля, 15:00', status: 'confirmed' },
              { name: 'Дмитрий Козлов', listing: 'Студия у Чистых прудов', date: '26 июля, 11:00', status: 'pending' },
            ].map((v, idx, arr) => (
              <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', borderBottom: idx < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#2563EB', flexShrink: 0 }}>
                  {v.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1B365D' }}>{v.name}</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>{v.listing}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>{v.date}</div>
                <span style={{ background: v.status === 'confirmed' ? '#ECFDF5' : '#FEF3C7', color: v.status === 'confirmed' ? '#059669' : '#D97706', fontSize: 13, fontWeight: 600, padding: '4px 10px', borderRadius: 6 }}>
                  {v.status === 'confirmed' ? 'Подтверждён' : 'Ожидает'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
