import React, { useState } from 'react'

export default function DomwitListing() {
  const [activePhoto, setActivePhoto] = useState(0)
  const [applied, setApplied] = useState(false)

  const photos = ['Фото 1', 'Фото 2', 'Фото 3', 'Фото 4']

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

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24 }}>
          <a href="/search" style={{ color: '#2563EB', textDecoration: 'none' }}>Поиск</a>
          {' / '}
          <span>2-комн. квартира на Тверской</span>
        </div>

        {/* Photo gallery */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 40, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ background: '#E5E7EB', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 16, color: '#9CA3AF' }}>{photos[activePhoto]}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 12 }}>
            {photos.slice(1).map((p, i) => (
              <div
                key={i}
                onClick={() => setActivePhoto(i + 1)}
                style={{ background: activePhoto === i + 1 ? '#DBEAFE' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 4 }}
              >
                <span style={{ fontSize: 13, color: '#9CA3AF' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'flex-start' }}>
          {/* Listing details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1B365D', margin: 0 }}>2-комнатная квартира на Тверской</h1>
            </div>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 24 }}>📍 Москва, Тверская ул., 18, этаж 5/9</p>

            {/* Key params */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
              {[['54 м²', 'Площадь'], ['2', 'Комнаты'], ['5/9', 'Этаж'], ['2019', 'Год постройки'], ['Есть', 'Парковка']].map(([val, lbl]) => (
                <div key={lbl} style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 12, padding: '14px 20px', textAlign: 'center', minWidth: 80 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1B365D' }}>{val}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B365D', marginBottom: 12 }}>Описание</h2>
            <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, marginBottom: 32 }}>
              Просторная светлая квартира в самом центре Москвы. Свежий ремонт, вся необходимая мебель и техника.
              Рядом станции метро Тверская и Пушкинская, рестораны, магазины. Тихий двор. Сдаётся напрямую от собственника без комиссии агентам.
            </p>

            {/* Amenities */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B365D', marginBottom: 16 }}>Удобства</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
              {['Интернет', 'Стиральная машина', 'Посудомойка', 'Кондиционер', 'Балкон', 'Холодильник', 'Телевизор', 'Можно с питомцами'].map(a => (
                <span key={a} style={{ background: '#F9FAFB', border: '1px solid #E8E8E4', borderRadius: 8, padding: '6px 14px', fontSize: 14, color: '#374151' }}>
                  {a}
                </span>
              ))}
            </div>

            {/* Landlord */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B365D', marginBottom: 16 }}>Собственник</h2>
            <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#2563EB' }}>А</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1B365D' }}>Алексей Петров</div>
                <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>На платформе с 2022 · 8 успешных сделок</div>
              </div>
              <div style={{ marginLeft: 'auto', background: '#ECFDF5', color: '#059669', fontSize: 14, fontWeight: 700, padding: '6px 14px', borderRadius: 8 }}>
                TS 96
              </div>
            </div>
          </div>

          {/* Sticky price card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 20, padding: '28px 24px', position: 'sticky', top: 84 }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#1B365D', marginBottom: 4 }}>
              85 000 ₽
            </div>
            <div style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 24 }}>в месяц · без комиссии</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, fontSize: 14, color: '#4B5563' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Залог</span><strong>85 000 ₽</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Коммунальные</span><strong>~5 000 ₽</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Мин. срок</span><strong>6 мес.</strong>
              </div>
            </div>

            <button
              onClick={() => setApplied(true)}
              style={{
                width: '100%',
                background: applied ? '#059669' : '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 10,
                padding: '14px',
                fontSize: 16,
                fontWeight: 700,
                cursor: applied ? 'default' : 'pointer',
                fontFamily: 'Manrope, sans-serif',
                marginBottom: 12,
              }}
            >
              {applied ? '✓ Заявка отправлена' : 'Подать заявку'}
            </button>
            <button style={{ width: '100%', background: '#FFFFFF', color: '#1B365D', border: '1.5px solid #E8E8E4', borderRadius: 10, padding: '13px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
              Написать собственнику
            </button>

            <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
              Заявка будет рассмотрена в течение 24 часов. Данные в безопасности.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
