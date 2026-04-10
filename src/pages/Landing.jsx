import React, { useState } from 'react'

export default function DomwitLanding() {
  const [query, setQuery] = useState('')

  const features = [
    {
      icon: '✦',
      title: 'Trust Score',
      desc: 'Каждый арендатор получает рейтинг надёжности на основе истории аренды и отзывов.',
    },
    {
      icon: '₽',
      title: 'Справедливая цена',
      desc: 'Мы показываем рыночную стоимость аренды, чтобы вы не переплачивали.',
    },
    {
      icon: '⚡',
      title: 'Быстрая заявка',
      desc: 'Подайте заявку на аренду в один клик — без лишних звонков и бумаг.',
    },
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

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '96px 24px 72px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#EFF6FF', color: '#2563EB', fontSize: 13, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 24 }}>
          Аренда без посредников
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 800, color: '#1B365D', lineHeight: 1.15, margin: '0 0 20px' }}>
          Найдите жильё<br />без посредников
        </h1>
        <p style={{ fontSize: 18, color: '#6B7280', lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
          DomWit соединяет арендаторов и собственников напрямую. Никаких комиссий агентам, только честные сделки.
        </p>

        {/* Search bar */}
        <div style={{ display: 'flex', background: '#FFFFFF', border: '1.5px solid #E8E8E4', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', maxWidth: 600, margin: '0 auto' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Город, район или адрес…"
            style={{ flex: 1, border: 'none', outline: 'none', padding: '16px 20px', fontSize: 16, fontFamily: 'Manrope, sans-serif', background: 'transparent', color: '#1B365D' }}
          />
          <button
            style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '0 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
          >
            Найти
          </button>
        </div>
        <p style={{ marginTop: 14, fontSize: 13, color: '#9CA3AF' }}>Москва · Санкт-Петербург · Казань · Екатеринбург</p>
      </section>

      {/* Feature highlights */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, padding: '36px 28px' }}>
              <div style={{ width: 48, height: 48, background: '#EFF6FF', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#2563EB', marginBottom: 20, fontWeight: 800 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1B365D', margin: '0 0 10px' }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: '#1B365D', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 32 }}>
          {[['12 000+', 'объявлений'], ['94%', 'сделок без посредников'], ['4.9 ★', 'средний рейтинг'], ['48 ч', 'среднее время заезда']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF' }}>{num}</div>
              <div style={{ fontSize: 14, color: '#93C5FD', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: '#1B365D', marginBottom: 16 }}>Сдаёте квартиру?</h2>
        <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Разместите объявление бесплатно и получайте заявки напрямую от проверенных арендаторов.
        </p>
        <a href="/create-listing" style={{ display: 'inline-block', background: '#059669', color: '#FFFFFF', padding: '14px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 16, fontWeight: 700 }}>
          Разместить объявление
        </a>
      </section>
    </div>
  )
}
