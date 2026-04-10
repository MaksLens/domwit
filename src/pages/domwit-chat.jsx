import React, { useState } from 'react'

export default function DomwitChat() {
  const [message, setMessage] = useState('')

  return (
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E8E4', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ fontWeight: 800, fontSize: 20, color: '#1B365D', textDecoration: 'none' }}>DomWit</a>
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/search" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Поиск</a>
          <a href="/chat" style={{ color: '#2563EB', textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Чат</a>
          <a href="/notifications" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Уведомления</a>
          <a href="/auth" style={{ background: '#2563EB', color: '#FFFFFF', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Войти</a>
        </nav>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1B365D', margin: '0 0 24px' }}>Чат</h1>
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, flex: 1, display: 'flex', overflow: 'hidden', minHeight: 480 }}>
          {/* Conversations list */}
          <div style={{ width: 300, borderRight: '1px solid #E8E8E4', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6' }}>
              <input type="text" placeholder="Поиск чатов…" style={{ width: '100%', border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'Manrope, sans-serif', outline: 'none', boxSizing: 'border-box', color: '#1B365D' }} />
            </div>
            {[
              { name: 'Алексей Петров', preview: 'Добрый день! Квартира ещё…', time: '10:32', unread: 2 },
              { name: 'Мария Иванова', preview: 'Спасибо за ответ', time: 'Вчера', unread: 0 },
            ].map(c => (
              <div key={c.name} style={{ display: 'flex', gap: 12, padding: '16px', cursor: 'pointer', borderBottom: '1px solid #F9FAFB', alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#2563EB', flexShrink: 0 }}>{c.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1B365D' }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>{c.time}</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.preview}</span>
                </div>
                {c.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#2563EB', color: '#FFFFFF', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.unread}</div>}
              </div>
            ))}
          </div>

          {/* Message area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#2563EB' }}>А</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1B365D' }}>Алексей Петров</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>2-комн. квартира на Тверской</div>
              </div>
            </div>

            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
              <div style={{ maxWidth: '70%', alignSelf: 'flex-start' }}>
                <div style={{ background: '#F3F4F6', borderRadius: '0 12px 12px 12px', padding: '10px 14px', fontSize: 14, color: '#374151', lineHeight: 1.5 }}>Добрый день! Квартира ещё свободна?</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>10:30</div>
              </div>
              <div style={{ maxWidth: '70%', alignSelf: 'flex-end' }}>
                <div style={{ background: '#2563EB', borderRadius: '12px 0 12px 12px', padding: '10px 14px', fontSize: 14, color: '#FFFFFF', lineHeight: 1.5 }}>Да, свободна! Когда удобно посмотреть?</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, textAlign: 'right' }}>10:32</div>
              </div>
            </div>

            <div style={{ padding: '16px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: 12 }}>
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Написать сообщение…" style={{ flex: 1, border: '1.5px solid #E8E8E4', borderRadius: 10, padding: '10px 16px', fontSize: 15, fontFamily: 'Manrope, sans-serif', outline: 'none', color: '#1B365D' }} />
              <button style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
