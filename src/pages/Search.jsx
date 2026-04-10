import React, { useState } from 'react'

const LISTINGS = [
  { id: 1, title: '2-комн. квартира на Тверской', address: 'Москва, Тверская ул., 18', price: 85000, rooms: 2, area: 54, floor: '5/9', score: 92 },
  { id: 2, title: 'Студия у метро Чистые пруды', address: 'Москва, Чистопрудный б-р, 3', price: 55000, rooms: 0, area: 31, floor: '3/12', score: 88 },
  { id: 3, title: '1-комн. квартира в Хамовниках', address: 'Москва, Комсомольский пр., 42', price: 70000, rooms: 1, area: 40, floor: '2/6', score: 95 },
  { id: 4, title: '3-комн. квартира на Арбате', address: 'Москва, Арбат ул., 29', price: 130000, rooms: 3, area: 87, floor: '4/7', score: 90 },
  { id: 5, title: 'Студия в Москва-Сити', address: 'Москва, Пресненская наб., 6', price: 95000, rooms: 0, area: 38, floor: '18/55', score: 97 },
]

export default function DomwitSearch() {
  const [priceMax, setPriceMax] = useState('')
  const [rooms, setRooms] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  return (
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E8E4', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ fontWeight: 800, fontSize: 20, color: '#1B365D', textDecoration: 'none' }}>DomWit</a>
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/search" style={{ color: '#2563EB', textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Поиск</a>
          <a href="/chat" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Чат</a>
          <a href="/notifications" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Уведомления</a>
          <a href="/auth" style={{ background: '#2563EB', color: '#FFFFFF', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Войти</a>
        </nav>
      </header>

      {/* Search bar row */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E8E4', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="text"
            defaultValue="Москва"
            placeholder="Город или район…"
            style={{ flex: 1, border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '10px 16px', fontSize: 15, fontFamily: 'Manrope, sans-serif', outline: 'none', color: '#1B365D' }}
          />
          <button style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
            Найти
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        {/* Sidebar filters */}
        <aside style={{ width: 260, flexShrink: 0, background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, padding: '28px 24px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1B365D', margin: '0 0 24px' }}>Фильтры</h3>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 8 }}>Комнат</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Студия', '1', '2', '3+'].map(r => (
                <button
                  key={r}
                  onClick={() => setRooms(r === rooms ? '' : r)}
                  style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid', borderColor: rooms === r ? '#2563EB' : '#E8E8E4', background: rooms === r ? '#EFF6FF' : '#FFFFFF', color: rooms === r ? '#2563EB' : '#374151', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 8 }}>Макс. цена, ₽/мес</label>
            <input
              type="number"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
              placeholder="150 000"
              style={{ width: '100%', border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '10px 14px', fontSize: 15, fontFamily: 'Manrope, sans-serif', outline: 'none', boxSizing: 'border-box', color: '#1B365D' }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 8 }}>Мин. площадь, м²</label>
            <input
              type="number"
              placeholder="30"
              style={{ width: '100%', border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '10px 14px', fontSize: 15, fontFamily: 'Manrope, sans-serif', outline: 'none', boxSizing: 'border-box', color: '#1B365D' }}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 8 }}>Trust Score арендатора</label>
            <select style={{ width: '100%', border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '10px 14px', fontSize: 15, fontFamily: 'Manrope, sans-serif', outline: 'none', color: '#1B365D', background: '#FFFFFF' }}>
              <option>Любой</option>
              <option>70+</option>
              <option>85+</option>
              <option>95+</option>
            </select>
          </div>

          <button style={{ width: '100%', background: '#1B365D', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '12px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
            Применить
          </button>
        </aside>

        {/* Listings grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 15, color: '#6B7280' }}>Найдено <strong style={{ color: '#1B365D' }}>5</strong> объявлений</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '8px 14px', fontSize: 14, fontFamily: 'Manrope, sans-serif', outline: 'none', color: '#1B365D', background: '#FFFFFF' }}
            >
              <option value="relevance">По релевантности</option>
              <option value="price_asc">Цена ↑</option>
              <option value="price_desc">Цена ↓</option>
              <option value="newest">Новые</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {LISTINGS.map(l => (
              <a
                key={l.id}
                href={`/listing/${l.id}`}
                style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, overflow: 'hidden', textDecoration: 'none', display: 'block' }}
              >
                <div style={{ height: 180, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 13, color: '#9CA3AF' }}>Фото</span>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1B365D', margin: 0, lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{l.title}</h4>
                    <div style={{ background: '#ECFDF5', color: '#059669', fontSize: 13, fontWeight: 700, padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>
                      TS {l.score}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 12px' }}>{l.address}</p>
                  <div style={{ display: 'flex', gap: 12, fontSize: 13, color: '#6B7280', marginBottom: 14 }}>
                    <span>{l.area} м²</span>
                    <span>·</span>
                    <span>Этаж {l.floor}</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#1B365D' }}>
                    {l.price.toLocaleString('ru-RU')} ₽<span style={{ fontSize: 13, fontWeight: 400, color: '#9CA3AF' }}>/мес</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
