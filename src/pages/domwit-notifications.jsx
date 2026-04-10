import React, { useState } from 'react'
import { Bell, MessageSquare, FileText, CreditCard, Clock, CheckCircle, ChevronRight, X, Settings, Check, Home, User, Star } from 'lucide-react'

const initialNotifications = [
  {
    id: 1, group: 'today', type: 'message', read: false,
    title: 'Новое сообщение',
    body: 'Марина Соколова: Когда можно посмотреть квартиру?',
    time: '10 мин назад',
    link: '2-комн, ул. Льва Толстого, 12',
    extra: null,
  },
  {
    id: 2, group: 'today', type: 'application', read: false,
    title: 'Новый отклик',
    body: 'Дмитрий Волков подал заявку на вашу квартиру',
    time: '45 мин назад',
    extra: { kind: 'trust', value: 'Trust Score 84' },
  },
  {
    id: 3, group: 'today', type: 'deal-status', read: true,
    title: 'Изменение статуса сделки',
    body: 'Договор аренды подписан обеими сторонами',
    time: '2 часа назад',
    extra: { kind: 'pill-green', value: 'Договор подписан' },
  },
  {
    id: 4, group: 'yesterday', type: 'payment', read: false,
    title: 'Напоминание об оплате',
    body: 'Срок оплаты аренды — 15 апреля. Осталось 3 дня',
    time: 'Вчера, 18:00',
    extra: { kind: 'amount', value: '85 000 ₽' },
  },
  {
    id: 5, group: 'yesterday', type: 'listing-expiry', read: true,
    title: 'Истекает объявление',
    body: 'Ваше объявление «ул. Арбат, 34» истекает через 5 дней',
    time: 'Вчера, 09:30',
    extra: { kind: 'action', value: 'Продлить' },
  },
  {
    id: 6, group: 'yesterday', type: 'verification', read: true,
    title: 'Верификация пройдена ✓',
    body: 'Паспорт арендатора верифицирован через Госуслуги',
    time: 'Вчера, 08:15',
    extra: { kind: 'pill-green', value: 'Верифицировано' },
  },
  {
    id: 7, group: 'earlier', type: 'message', read: true,
    title: 'Новое сообщение',
    body: 'Анна Петрова: Отличные условия, рассматриваем ваше предложение',
    time: '3 апр',
    extra: null,
  },
  {
    id: 8, group: 'earlier', type: 'application', read: true,
    title: 'Новый отклик',
    body: 'Елена Морозова подала заявку. Trust Score 92',
    time: '1 апр',
    extra: null,
  },
  {
    id: 9, group: 'earlier', type: 'deal-status', read: true,
    title: 'Сделка завершена',
    body: 'Аренда квартиры на Кутузовском пр-те успешно оформлена',
    time: '28 мар',
    extra: { kind: 'pill-gray', value: 'Завершено' },
  },
  {
    id: 10, group: 'earlier', type: 'review', read: true,
    title: 'Новый отзыв',
    body: 'Дмитрий Волков оставил отзыв: «Отличный собственник, всё честно»',
    time: '25 мар',
    extra: { kind: 'stars', value: 5 },
  },
]

const initialSettings = {
  application: { push: true,  email: true,  inapp: true  },
  messages:    { push: true,  email: false, inapp: true  },
  deals:       { push: true,  email: true,  inapp: true  },
  payment:     { push: false, email: true,  inapp: true  },
  listings:    { push: true,  email: false, inapp: true  },
}

const categoryLabels = {
  application: 'Отклики',
  messages:    'Сообщения',
  deals:       'Сделки',
  payment:     'Оплата',
  listings:    'Объявления',
}

const groupLabels = { today: 'Сегодня', yesterday: 'Вчера', earlier: 'Ранее' }

function getIconMeta(type) {
  switch (type) {
    case 'message':        return { Icon: MessageSquare, color: '#2563EB', bg: '#EFF6FF' }
    case 'application':    return { Icon: User,          color: '#2563EB', bg: '#EFF6FF' }
    case 'deal-status':    return { Icon: FileText,      color: '#059669', bg: '#ECFDF5' }
    case 'payment':        return { Icon: CreditCard,    color: '#D97706', bg: '#FEF3C7' }
    case 'listing-expiry': return { Icon: Clock,         color: '#DC2626', bg: '#FEF2F2' }
    case 'verification':   return { Icon: CheckCircle,   color: '#059669', bg: '#ECFDF5' }
    case 'review':         return { Icon: Star,          color: '#D97706', bg: '#FEF3C7' }
    default:               return { Icon: Home,          color: '#1B365D', bg: '#EFF6FF' }
  }
}

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: on ? '#2563EB' : '#E5E7EB',
        position: 'relative', padding: 0, flexShrink: 0,
        transition: 'background 0.2s ease',
      }}
      aria-pressed={on}
    >
      <span style={{
        position: 'absolute', top: 2,
        left: on ? 22 : 2,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
        transition: 'left 0.2s ease',
        display: 'block',
      }} />
    </button>
  )
}

const notifModes = [
  { id: 'all',       label: 'Все уведомления',  desc: 'Получать уведомления в режиме реального времени' },
  { id: 'important', label: 'Только важные',     desc: 'Отклики, сделки и оплата' },
  { id: 'silent',    label: 'Не беспокоить',     desc: 'Только срочные: оплата' },
]

export default function DomwitNotifications() {
  const [activeTab, setActiveTab]       = useState('all')
  const [notifications, setNotifications] = useState(initialNotifications)
  const [settings, setSettings]         = useState(initialSettings)
  const [notifMode, setNotifMode]       = useState('all')
  const [hoveredId, setHoveredId]       = useState(null)

  const unreadCount = notifications.filter(n => !n.read).length

  function markAsRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function markAllAsRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function toggleSetting(category, channel) {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [channel]: !prev[category][channel] },
    }))
  }

  const groups = ['today', 'yesterday', 'earlier']

  return (
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FAFAF8', minHeight: '100vh', paddingBottom: 64 }}>

      {/* Top nav */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F3F4F6', padding: '0 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, background: '#1B365D', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Home size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#1B365D', letterSpacing: '-0.3px' }}>DomWit</span>
          </a>
          <Bell size={20} color="#9CA3AF" />
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#1B365D', letterSpacing: '-0.5px' }}>Уведомления</h1>
            {unreadCount > 0 && (
              <span style={{
                background: '#EFF6FF', color: '#2563EB', fontSize: 12, fontWeight: 600,
                padding: '3px 10px', borderRadius: 20, border: '1px solid #BFDBFE',
              }}>
                {unreadCount} новых
              </span>
            )}
          </div>
          {activeTab === 'all' && unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                background: '#fff', border: '1px solid #2563EB', color: '#2563EB',
                fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 8,
                cursor: 'pointer', transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#2563EB' }}
            >
              Прочитать все
            </button>
          )}
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'inline-flex', background: '#F3F4F6', borderRadius: 8, padding: 4, marginBottom: 24,
        }}>
          {[{ id: 'all', label: 'Все' }, { id: 'settings', label: 'Настройки' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '7px 20px', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600,
                background: activeTab === tab.id ? '#fff' : 'transparent',
                color: activeTab === tab.id ? '#1B365D' : '#6B7280',
                boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.10)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── VIEW 1: Notification list ── */}
        {activeTab === 'all' && (
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {groups.map(group => {
              const items = notifications.filter(n => n.group === group)
              if (!items.length) return null
              return (
                <div key={group}>
                  <div style={{
                    padding: '14px 24px 6px',
                    fontSize: 11, fontWeight: 700, color: '#9CA3AF',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    background: '#FAFAF8', borderBottom: '1px solid #F3F4F6',
                  }}>
                    {groupLabels[group]}
                  </div>
                  {items.map((notif, idx) => {
                    const { Icon, color, bg } = getIconMeta(notif.type)
                    const isLast = idx === items.length - 1
                    const isHovered = hoveredId === notif.id
                    return (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        onMouseEnter={() => setHoveredId(notif.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 14,
                          padding: '16px 24px',
                          borderBottom: isLast ? 'none' : '1px solid #F3F4F6',
                          cursor: 'pointer',
                          background: isHovered ? '#F9FAFB' : '#fff',
                          borderLeft: !notif.read ? '3px solid #2563EB' : '3px solid transparent',
                          transition: 'background 0.12s ease',
                          position: 'relative',
                        }}
                      >
                        {/* Unread dot */}
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: !notif.read ? '#2563EB' : 'transparent',
                          flexShrink: 0, marginTop: 16,
                        }} />

                        {/* Icon circle */}
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Icon size={18} color={color} />
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 15, fontWeight: 600, color: '#1B365D' }}>{notif.title}</span>
                            <span style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{notif.time}</span>
                          </div>
                          <p style={{
                            margin: '0 0 6px', fontSize: 14, color: '#6B7280', lineHeight: '1.45',
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          }}>
                            {notif.body}
                          </p>

                          {/* Linked property */}
                          {notif.link && (
                            <span style={{ fontSize: 12, color: '#2563EB', fontWeight: 500 }}>📍 {notif.link}</span>
                          )}

                          {/* Extras */}
                          {notif.extra?.kind === 'trust' && (
                            <span style={{
                              display: 'inline-block', background: '#FFFBEB', color: '#92400E',
                              fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                              border: '1px solid #FDE68A',
                            }}>{notif.extra.value}</span>
                          )}
                          {notif.extra?.kind === 'pill-green' && (
                            <span style={{
                              display: 'inline-block', background: '#ECFDF5', color: '#059669',
                              fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                              border: '1px solid #A7F3D0',
                            }}>{notif.extra.value}</span>
                          )}
                          {notif.extra?.kind === 'pill-gray' && (
                            <span style={{
                              display: 'inline-block', background: '#F3F4F6', color: '#6B7280',
                              fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                            }}>{notif.extra.value}</span>
                          )}
                          {notif.extra?.kind === 'amount' && (
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#1B365D' }}>{notif.extra.value}</span>
                          )}
                          {notif.extra?.kind === 'action' && (
                            <button
                              onClick={e => e.stopPropagation()}
                              style={{
                                background: '#2563EB', color: '#fff', border: 'none',
                                fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 7,
                                cursor: 'pointer',
                              }}
                            >
                              {notif.extra.value}
                            </button>
                          )}
                          {notif.extra?.kind === 'stars' && (
                            <span style={{ fontSize: 14, color: '#F59E0B', letterSpacing: 1 }}>
                              {'★'.repeat(notif.extra.value)}
                            </span>
                          )}
                        </div>

                        <ChevronRight size={16} color="#D1D5DB" style={{ flexShrink: 0, marginTop: 12 }} />
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Empty state */}
            {unreadCount === 0 && notifications.every(n => n.read) && notifications.length > 0 && (
              <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                <CheckCircle size={32} color="#059669" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontSize: 14, color: '#6B7280' }}>Все уведомления прочитаны</p>
              </div>
            )}
          </div>
        )}

        {/* ── VIEW 2: Settings ── */}
        {activeTab === 'settings' && (
          <div>

            {/* Toggle matrix */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ padding: '20px 24px 12px' }}>
                <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: '#1B365D' }}>Настройки уведомлений</h2>
              </div>

              {/* Table header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px',
                padding: '10px 24px', borderBottom: '1px solid #F3F4F6',
                background: '#FAFAF8',
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Категория</span>
                {['Push', 'Email', 'In-app'].map(h => (
                  <span key={h} style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              {Object.entries(categoryLabels).map(([key, label], idx, arr) => (
                <div
                  key={key}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px',
                    padding: '14px 24px', alignItems: 'center',
                    borderBottom: idx < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#1B365D' }}>{label}</span>
                  {['push', 'email', 'inapp'].map(ch => (
                    <div key={ch} style={{ display: 'flex', justifyContent: 'center' }}>
                      <Toggle
                        on={settings[key][ch]}
                        onToggle={() => toggleSetting(key, ch)}
                      />
                    </div>
                  ))}
                </div>
              ))}

              <div style={{ padding: '14px 24px', borderTop: '1px solid #F3F4F6', background: '#FAFAF8' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#9CA3AF', lineHeight: '1.6' }}>
                  Push-уведомления требуют разрешения браузера. Email отправляются на адрес из профиля.
                </p>
              </div>
            </div>

            {/* Notification mode */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px 12px', borderBottom: '1px solid #F3F4F6' }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1B365D' }}>Режим уведомлений</h2>
              </div>
              <div style={{ padding: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {notifModes.map(mode => {
                  const active = notifMode === mode.id
                  return (
                    <div
                      key={mode.id}
                      onClick={() => setNotifMode(mode.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                        borderRadius: 10, cursor: 'pointer',
                        border: active ? '1.5px solid #2563EB' : '1.5px solid #F3F4F6',
                        background: active ? '#EFF6FF' : '#FAFAF8',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                        border: active ? '2px solid #2563EB' : '2px solid #D1D5DB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: active ? '#2563EB' : '#fff',
                      }}>
                        {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1B365D', marginBottom: 2 }}>{mode.label}</div>
                        <div style={{ fontSize: 12, color: '#6B7280' }}>{mode.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
