import React, { useState } from 'react'

const NOTIFICATIONS = [
  { id: 1, icon: '✓', title: 'Заявка одобрена', body: 'Алексей Петров одобрил вашу заявку на студию у метро Чистые пруды.', time: '2 ч назад', read: false, color: '#059669' },
  { id: 2, icon: '💬', title: 'Новое сообщение', body: 'Мария Иванова ответила на ваше сообщение.', time: '5 ч назад', read: false, color: '#2563EB' },
  { id: 3, icon: '👁', title: 'Просмотр профиля', body: 'Арендодатель просмотрел ваш профиль.', time: '1 день назад', read: true, color: '#7C3AED' },
  { id: 4, icon: '⭐', title: 'Trust Score вырос', body: 'Ваш Trust Score повысился до 78 баллов.', time: '2 дня назад', read: true, color: '#D97706' },
  { id: 5, icon: '🏠', title: 'Новое объявление', body: 'Появилось новое объявление, соответствующее вашим критериям поиска.', time: '3 дня назад', read: true, color: '#6B7280' },
]

export default function DomwitNotifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FAFAF8', minHeight: '100vh' }}>
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E8E4', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ fontWeight: 800, fontSize: 20, color: '#1B365D', textDecoration: 'none' }}>DomWit</a>
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/search" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Поиск</a>
          <a href="/chat" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 15 }}>Чат</a>
          <a href="/notifications" style={{ color: '#2563EB', textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Уведомления</a>
          <a href="/auth" style={{ background: '#2563EB', color: '#FFFFFF', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Войти</a>
        </nav>
      </header>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1B365D', margin: '0 0 4px' }}>Уведомления</h1>
            {unreadCount > 0 && <span style={{ fontSize: 14, color: '#6B7280' }}>{unreadCount} непрочитанных</span>}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} style={{ background: 'none', border: '1.5px solid #E8E8E4', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151', fontFamily: 'Manrope, sans-serif' }}>
              Прочитать все
            </button>
          )}
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 16, overflow: 'hidden' }}>
          {notifications.map((n, idx) => (
            <div
              key={n.id}
              style={{ display: 'flex', gap: 16, padding: '20px 24px', borderBottom: idx < notifications.length - 1 ? '1px solid #F3F4F6' : 'none', background: n.read ? '#FFFFFF' : '#F0F7FF', cursor: 'pointer' }}
              onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))}
            >
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${n.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {n.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#1B365D' }}>{n.title}</span>
                  <span style={{ fontSize: 12, color: '#9CA3AF', flexShrink: 0, marginLeft: 12 }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 14, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{n.body}</p>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 6 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
