import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search, Send, Paperclip, ChevronLeft, MoreVertical, Phone, Calendar, FileText, CheckCheck, Check, AlertTriangle, Info, X, Home, MapPin, Train, Star, Clock, Eye, ShieldCheck, Smile, Image, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react'

// ─── helpers ─────────────────────────────────────────────────────────────────
function hashColor(str) {
  const palette = ['#1B365D','#2563EB','#059669','#7C3AED','#B45309','#0891B2','#BE185D','#4338CA']
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0xffffffff
  return palette[Math.abs(h) % palette.length]
}

function truncate(str, n) {
  return str && str.length > n ? str.slice(0, n) + '…' : str
}

const FRAUD_PATTERNS = [
  /(\+7|8)[\s\-]?\(?\d{3}\)?/,
  /telegram|whatsapp|viber|вотсап|вотсапп|ватсап|ватсапп|телеграм|вайбер/i,
  /предоплата|переведите|аванс|задаток/i,
]

function checkFraud(text) {
  return FRAUD_PATTERNS.some(p => p.test(text))
}

// ─── mock data ────────────────────────────────────────────────────────────────
const DIALOGS = [
  {
    id: 0,
    name: 'Марина Соколова',
    initials: 'МС',
    trustScore: 4.8,
    isOnline: true,
    lastMessage: 'Когда можно посмотреть квартиру?',
    time: '10:24',
    unread: 0,
    listing: { address: 'ул. Льва Толстого, 12', rooms: '2-комн.', price: '85 000 ₽/мес', metro: 'Парк Культуры', color: '#2563EB' },
  },
  {
    id: 1,
    name: 'Дмитрий Волков',
    initials: 'ДВ',
    trustScore: 4.2,
    isOnline: false,
    lastMessage: 'Спасибо, всё понял!',
    time: '09:15',
    unread: 2,
    listing: { address: 'ул. Арбат, 34', rooms: '1-комн.', price: '65 000 ₽/мес', metro: 'Арбатская', color: '#059669' },
  },
  {
    id: 2,
    name: 'Анна Петрова',
    initials: 'АП',
    trustScore: 4.9,
    isOnline: false,
    lastMessage: 'Отличные условия, рассматриваем ваше предложение',
    time: 'Вчера',
    unread: 0,
    listing: { address: 'Кутузовский пр-т, 50', rooms: '3-комн.', price: '150 000 ₽/мес', metro: 'Кутузовская', color: '#7C3AED' },
  },
  {
    id: 3,
    name: 'Сергей Иванов',
    initials: 'СИ',
    trustScore: 3.7,
    isOnline: true,
    lastMessage: 'Добрый день! Есть ли место для парковки?',
    time: 'Вчера',
    unread: 1,
    listing: { address: 'ул. Пресненская наб., 6', rooms: '1-комн.', price: '90 000 ₽/мес', metro: 'Деловой центр', color: '#B45309' },
  },
  {
    id: 4,
    name: 'Елена Морозова',
    initials: 'ЕМ',
    trustScore: 4.6,
    isOnline: false,
    lastMessage: 'Договор подписан ✓',
    time: 'Пн',
    unread: 0,
    listing: { address: 'Нагатинская наб., 14', rooms: '2-комн.', price: '75 000 ₽/мес', metro: 'Коломенская', color: '#0891B2' },
  },
  {
    id: 5,
    name: 'Алексей Новиков',
    initials: 'АН',
    trustScore: 4.1,
    isOnline: false,
    lastMessage: 'Интересует ли вас долгосрочная аренда?',
    time: 'Вс',
    unread: 3,
    listing: { address: 'ул. Тверская, 18', rooms: 'Студия', price: '55 000 ₽/мес', metro: 'Тверская', color: '#BE185D' },
  },
]

const INITIAL_MESSAGES = {
  0: [
    { id: 1, from: 'other', text: 'Добрый день! Меня интересует ваша квартира на Льва Толстого. Расскажите подробнее об условиях аренды?', time: '09:00', read: true },
    { id: 2, from: 'me', text: 'Здравствуйте! Квартира сдаётся на длительный срок, от 12 месяцев. Есть всё необходимое для проживания: мебель, техника, интернет.', time: '09:05', read: true },
    { id: 3, from: 'other', text: 'Отлично! А как насчёт домашних животных? У меня кошка.', time: '09:08', read: true },
    { id: 4, type: 'ai-hint', text: 'Арендатор спрашивает про животных — у вас указано «кошки ок»', time: '09:08' },
    { id: 5, from: 'me', text: 'Да, кошки разрешены! В объявлении указано — никаких проблем.', time: '09:10', read: true },
    { id: 6, from: 'other', text: 'Замечательно! Какой депозит?', time: '09:12', read: true },
    { id: 7, from: 'me', text: 'Депозит — 1 месяц аренды, то есть 85 000 ₽. Можно оплатить через безопасную сделку DomWit.', time: '09:14', read: true },
    { id: 8, type: 'action-card', actionType: 'viewing-request', from: 'other', time: '09:20', status: 'pending', text: 'Запрос на просмотр', date: '15 апреля, 18:00' },
    { id: 9, from: 'me', text: 'Хорошо, 15 апреля в 18:00 мне подходит. Подтверждаю просмотр!', time: '09:22', read: true },
    { id: 10, type: 'date-divider', text: 'Сегодня' },
    { id: 11, from: 'other', text: 'Кстати, можно ли оплачивать на карту напрямую? Мой номер +7 916', time: '10:20', read: true },
    { id: 12, type: 'fraud-warning', text: 'Осторожно: переводы вне платформы не защищены. Используйте безопасную сделку DomWit.' },
    { id: 13, from: 'me', text: 'Только через платформу DomWit — так безопаснее для обеих сторон!', time: '10:22', read: true },
    { id: 14, from: 'other', text: 'Когда можно посмотреть квартиру?', time: '10:24', read: false },
  ],
  1: [
    { id: 1, from: 'other', text: 'Здравствуйте! Квартира ещё свободна?', time: '08:50', read: true },
    { id: 2, from: 'me', text: 'Да, квартира свободна. Что вас интересует?', time: '08:55', read: true },
    { id: 3, from: 'other', text: 'Отлично, спасибо за быстрый ответ!', time: '09:10', read: true },
    { id: 4, from: 'other', text: 'Спасибо, всё понял!', time: '09:15', read: false },
  ],
  2: [
    { id: 1, from: 'other', text: 'Добрый день! Интересует трёхкомнатная на Кутузовском.', time: 'Вчера, 14:00', read: true },
    { id: 2, from: 'me', text: 'Здравствуйте, рады вашему интересу! Могу рассказать подробнее.', time: 'Вчера, 14:05', read: true },
    { id: 3, from: 'other', text: 'Отличные условия, рассматриваем ваше предложение', time: 'Вчера, 14:30', read: true },
  ],
  3: [
    { id: 1, from: 'other', text: 'Добрый день! Есть ли место для парковки?', time: 'Вчера, 18:42', read: false },
  ],
  4: [
    { id: 1, from: 'me', text: 'Присылаю вам договор аренды на подпись.', time: 'Пн, 11:00', read: true },
    { id: 2, from: 'other', text: 'Договор подписан ✓', time: 'Пн, 13:00', read: true },
  ],
  5: [
    { id: 1, from: 'other', text: 'Интересует ли вас долгосрочная аренда?', time: 'Вс, 20:10', read: false },
  ],
}

const AUTO_RESPONSES = [
  'Спасибо за ответ! Уточню ещё пару деталей.',
  'Понял, благодарю за информацию.',
  'Отлично, буду на связи.',
  'Хорошо, рассмотрю ваш вариант.',
  'Договорились, жду подтверждения.',
]

// ─── sub-components ───────────────────────────────────────────────────────────
function Avatar({ initials, name, size = 40, online = false }) {
  const bg = hashColor(name)
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: size * 0.33, letterSpacing: 0.5,
        userSelect: 'none',
      }}>
        {initials}
      </div>
      {online && (
        <div style={{
          position: 'absolute', bottom: 1, right: 1,
          width: 10, height: 10, borderRadius: '50%',
          background: '#059669', border: '2px solid #fff',
        }} />
      )}
    </div>
  )
}

function TrustBadge({ score }) {
  const color = score >= 4.5 ? '#059669' : score >= 4.0 ? '#D97706' : '#EF4444'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, color, fontWeight: 600 }}>
      <Star size={11} fill={color} color={color} /> {score.toFixed(1)}
    </span>
  )
}

function UnreadBadge({ count }) {
  if (!count) return null
  return (
    <div style={{
      minWidth: 20, height: 20, borderRadius: 10, background: '#2563EB',
      color: '#fff', fontSize: 11, fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 5px', flexShrink: 0,
    }}>
      {count}
    </div>
  )
}

function ListingMini({ listing, compact = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: compact ? 2 : 0 }}>
      <div style={{
        width: compact ? 20 : 24, height: compact ? 14 : 16, borderRadius: 3,
        background: listing.color + '22', border: `1px solid ${listing.color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Home size={compact ? 9 : 10} color={listing.color} />
      </div>
      <span style={{ fontSize: compact ? 11 : 12, color: '#6B7280', lineHeight: 1.3 }}>
        {truncate(listing.address, 26)} · {listing.price}
      </span>
    </div>
  )
}

function DateDivider({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
      <span style={{
        background: '#F3F4F6', color: '#9CA3AF', fontSize: 12, fontWeight: 500,
        padding: '3px 12px', borderRadius: 20,
      }}>
        {text}
      </span>
    </div>
  )
}

function FraudWarning({ text }) {
  return (
    <div style={{
      margin: '4px 16px 8px', background: '#FEF3C7', border: '1px solid #FCD34D',
      borderRadius: 10, padding: '10px 14px',
      display: 'flex', alignItems: 'flex-start', gap: 8,
    }}>
      <AlertTriangle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 13, color: '#92400E', lineHeight: 1.5 }}>{text}</span>
        {' '}
        <a href="#" style={{ fontSize: 12, color: '#D97706', fontWeight: 600, textDecoration: 'none' }}>Подробнее</a>
      </div>
      <ShieldCheck size={15} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
    </div>
  )
}

function ActionCard({ msg, onAccept, onDecline }) {
  const confirmed = msg.status === 'confirmed'
  const declined = msg.status === 'declined'
  return (
    <div style={{
      maxWidth: 300,
      alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start',
      background: '#FFFFFF', border: '1px solid #E5E7EB',
      borderRadius: 12, padding: '12px 14px', margin: '2px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ background: '#EFF6FF', borderRadius: 8, padding: 6 }}>
          <Calendar size={16} color="#2563EB" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 13, color: '#1B365D' }}>{msg.text}</span>
      </div>
      <div style={{ fontSize: 13, color: '#374151', marginBottom: 10 }}>
        <Clock size={12} color="#9CA3AF" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
        {msg.date}
      </div>
      {confirmed && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669', fontSize: 12, fontWeight: 600 }}>
          <CheckCheck size={14} /> Подтверждён
        </div>
      )}
      {declined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', fontSize: 12, fontWeight: 600 }}>
          <X size={14} /> Отклонён
        </div>
      )}
      {!confirmed && !declined && (
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={onAccept} style={{
            flex: 1, background: '#2563EB', color: '#fff', border: 'none',
            borderRadius: 7, padding: '6px 0', fontSize: 12, fontWeight: 600,
            cursor: 'pointer',
          }}>Принять</button>
          <button onClick={onDecline} style={{
            flex: 1, background: '#F3F4F6', color: '#374151', border: 'none',
            borderRadius: 7, padding: '6px 0', fontSize: 12, fontWeight: 600,
            cursor: 'pointer',
          }}>Отклонить</button>
        </div>
      )}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px 2px', alignSelf: 'flex-start' }}>
      <div style={{ background: '#F3F4F6', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', display: 'flex', gap: 4 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: '#9CA3AF',
            animation: 'bounce 1.2s infinite',
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────
export default function DomwitChat() {
  const [activeDialog, setActiveDialog] = useState(0)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [mobileView, setMobileView] = useState('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAiHint, setShowAiHint] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [listingCardOpen, setListingCardOpen] = useState(true)
  const [hoveredDialog, setHoveredDialog] = useState(null)
  const messagesEndRef = useRef(null)
  const messagesAreaRef = useRef(null)
  const inputRef = useRef(null)
  const nextIdRef = useRef(100)

  const dialog = DIALOGS[activeDialog]
  const currentMessages = messages[activeDialog] || []

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  useEffect(() => { scrollToBottom() }, [currentMessages, isTyping, scrollToBottom])

  const handleScroll = useCallback(() => {
    const el = messagesAreaRef.current
    if (!el) return
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 120)
  }, [])

  const addMessage = useCallback((dialogId, msg) => {
    setMessages(prev => ({
      ...prev,
      [dialogId]: [...(prev[dialogId] || []), { id: nextIdRef.current++, ...msg }],
    }))
  }, [])

  const handleSend = useCallback(() => {
    const text = inputText.trim()
    if (!text) return
    setInputText('')
    if (inputRef.current) { inputRef.current.style.height = 'auto' }

    addMessage(activeDialog, { from: 'me', text, time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }), read: false })

    if (checkFraud(text)) {
      setTimeout(() => {
        addMessage(activeDialog, {
          type: 'fraud-warning',
          text: 'Осторожно: обмен контактами и оплата вне платформы не защищены. Используйте безопасную сделку DomWit.',
        })
      }, 300)
      return
    }

    setIsTyping(true)
    const delay = 1500 + Math.random() * 1500
    setTimeout(() => {
      setIsTyping(false)
      addMessage(activeDialog, {
        from: 'other',
        text: AUTO_RESPONSES[Math.floor(Math.random() * AUTO_RESPONSES.length)],
        time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      })
    }, delay)
  }, [inputText, activeDialog, addMessage])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }, [handleSend])

  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }, [])

  const handleViewingRequest = useCallback(() => {
    const date = new Date()
    const formatted = date.toLocaleDateString('ru', { day: 'numeric', month: 'long' }) + ', 18:00'
    addMessage(activeDialog, {
      type: 'action-card', actionType: 'viewing-request', from: 'me',
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending', text: 'Запрос на просмотр', date: formatted,
    })
  }, [activeDialog, addMessage])

  const handleConditions = useCallback(() => {
    addMessage(activeDialog, {
      type: 'action-card', actionType: 'conditions', from: 'me',
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending', text: 'Предложение условий', date: 'Аренда от 12 мес., депозит 1 мес.',
    })
  }, [activeDialog, addMessage])

  const handleCardAction = useCallback((msgId, action) => {
    setMessages(prev => ({
      ...prev,
      [activeDialog]: prev[activeDialog].map(m =>
        m.id === msgId ? { ...m, status: action } : m
      ),
    }))
  }, [activeDialog])

  const handleSelectDialog = useCallback((id) => {
    setActiveDialog(id)
    setMobileView('chat')
    setShowAiHint(id === 0)
    setListingCardOpen(true)
    setIsTyping(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const totalUnread = DIALOGS.reduce((s, d) => s + d.unread, 0)
  const filteredDialogs = DIALOGS.filter(d =>
    !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.listing.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const aiHintText = activeDialog === 0
    ? 'Арендатор спрашивает про животных — у вас указано «кошки ок»'
    : 'Подтвердите условия аренды, чтобы перейти к договору'

  // ── sidebar ────────────────────────────────────────────────────────────────
  const sidebar = (
    <div style={{
      width: 340, minWidth: 340, height: '100%',
      borderRight: '1px solid #E8E8E4', background: '#FFFFFF',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* sidebar header */}
      <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#1B365D' }}>Сообщения</h2>
            {totalUnread > 0 && (
              <div style={{
                background: '#2563EB', color: '#fff', borderRadius: 10,
                fontSize: 12, fontWeight: 700, padding: '2px 8px',
              }}>{totalUnread}</div>
            )}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={15} color="#9CA3AF" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск по диалогам…"
            style={{
              width: '100%', boxSizing: 'border-box',
              background: '#F9FAFB', border: '1px solid #E5E7EB',
              borderRadius: 10, padding: '9px 12px 9px 32px',
              fontSize: 14, color: '#374151', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* dialog list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filteredDialogs.map(d => {
          const active = d.id === activeDialog
          const hovered = d.id === hoveredDialog
          return (
            <div
              key={d.id}
              onClick={() => handleSelectDialog(d.id)}
              onMouseEnter={() => setHoveredDialog(d.id)}
              onMouseLeave={() => setHoveredDialog(null)}
              style={{
                padding: '12px 16px', cursor: 'pointer', position: 'relative',
                borderLeft: active ? '3px solid #2563EB' : '3px solid transparent',
                background: active ? '#EFF6FF' : hovered ? '#F9FAFB' : '#FFFFFF',
                transition: 'background 0.12s',
              }}
            >
              <div style={{ display: 'flex', gap: 10 }}>
                <Avatar initials={d.initials} name={d.name} size={44} online={d.isOnline} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#1B365D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
                      <TrustBadge score={d.trustScore} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: '#9CA3AF' }}>{d.time}</span>
                      <UnreadBadge count={d.unread} />
                    </div>
                  </div>
                  <p style={{ margin: '2px 0 4px', fontSize: 13, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {truncate(d.lastMessage, 36)}
                  </p>
                  <ListingMini listing={d.listing} compact />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // ── chat panel ─────────────────────────────────────────────────────────────
  const chatPanel = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: '#FAFAF8' }}>
      {/* chat header */}
      <div style={{
        background: '#FFFFFF', borderBottom: '1px solid #E8E8E4',
        padding: '12px 20px', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button
          onClick={() => setMobileView('list')}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, color: '#374151',
            // shown via media query equivalent via JS below
          }}
          className="mobile-back-btn"
        >
          <ChevronLeft size={22} />
        </button>

        <Avatar initials={dialog.initials} name={dialog.name} size={42} online={dialog.isOnline} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1B365D' }}>{dialog.name}</span>
            <TrustBadge score={dialog.trustScore} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
            {dialog.isOnline
              ? <span style={{ fontSize: 12, color: '#059669', fontWeight: 500 }}>● онлайн</span>
              : <span style={{ fontSize: 12, color: '#9CA3AF' }}>был(а) 5 мин назад</span>
            }
            <span style={{ color: '#D1D5DB', fontSize: 12 }}>·</span>
            <ListingMini listing={dialog.listing} compact />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 8, borderRadius: 8, display: 'flex' }}>
            <Phone size={18} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 8, borderRadius: 8, display: 'flex' }}>
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* collapsible listing card */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #F0F0EC', flexShrink: 0 }}>
        <div
          onClick={() => setListingCardOpen(v => !v)}
          style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
        >
          <div style={{
            width: 36, height: 26, borderRadius: 6,
            background: dialog.listing.color + '22',
            border: `1px solid ${dialog.listing.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Home size={14} color={dialog.listing.color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1B365D' }}>
              {dialog.listing.address} · {dialog.listing.rooms}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 1 }}>
              <span style={{ fontSize: 12, color: '#2563EB', fontWeight: 600 }}>{dialog.listing.price}</span>
              <span style={{ color: '#D1D5DB' }}>·</span>
              <span style={{ fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 3 }}>
                <Train size={10} /> {dialog.listing.metro}
              </span>
            </div>
          </div>
          {listingCardOpen ? <ChevronUp size={16} color="#9CA3AF" /> : <ChevronDown size={16} color="#9CA3AF" />}
        </div>
        {listingCardOpen && (
          <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8 }}>
            {[
              { icon: <Calendar size={13} />, label: 'Запросить просмотр', action: handleViewingRequest },
              { icon: <FileText size={13} />, label: 'Предложить условия', action: handleConditions },
              { icon: <FileText size={13} />, label: 'К договору', action: () => alert('Переход к договору') },
            ].map(({ icon, label, action }) => (
              <button key={label} onClick={action} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: '#F8FAFF', border: '1px solid #DBEAFE',
                borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600,
                color: '#2563EB', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {icon} {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* messages area */}
      <div
        ref={messagesAreaRef}
        onScroll={handleScroll}
        style={{ flex: 1, overflowY: 'auto', padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {currentMessages.map((msg, idx) => {
          if (msg.type === 'date-divider') return <DateDivider key={msg.id ?? idx} text={msg.text} />
          if (msg.type === 'fraud-warning') return <FraudWarning key={msg.id ?? idx} text={msg.text} />
          if (msg.type === 'ai-hint') return null // rendered in input bar only for last hint
          if (msg.type === 'action-card') {
            return (
              <ActionCard
                key={msg.id ?? idx}
                msg={msg}
                onAccept={() => handleCardAction(msg.id, 'confirmed')}
                onDecline={() => handleCardAction(msg.id, 'declined')}
              />
            )
          }
          const isMe = msg.from === 'me'
          return (
            <div key={msg.id ?? idx} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: isMe ? 'flex-end' : 'flex-start',
              padding: '2px 16px',
            }}>
              <div style={{
                maxWidth: '72%',
                background: isMe ? '#2563EB' : '#FFFFFF',
                color: isMe ? '#FFFFFF' : '#1F2937',
                border: isMe ? 'none' : '1px solid #E5E7EB',
                borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '10px 14px',
                fontSize: 14, lineHeight: 1.5,
                boxShadow: isMe ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
              }}>
                {checkFraud(msg.text) && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#D97706', marginBottom: 4, fontWeight: 600 }}>
                    <AlertTriangle size={11} /> Обнаружены контактные данные
                  </span>
                )}
                {msg.text}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{msg.time}</span>
                {isMe && (
                  msg.read
                    ? <CheckCheck size={13} color="#2563EB" />
                    : <Check size={13} color="#9CA3AF" />
                )}
              </div>
            </div>
          )
        })}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* scroll to bottom FAB */}
      {showScrollBtn && (
        <button
          onClick={() => scrollToBottom()}
          style={{
            position: 'absolute', bottom: 90, right: 24,
            width: 36, height: 36, borderRadius: '50%',
            background: '#2563EB', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(37,99,235,0.35)',
          }}
        >
          <ArrowDown size={16} color="#fff" />
        </button>
      )}

      {/* input bar */}
      <div style={{
        background: '#FFFFFF', borderTop: '1px solid #E8E8E4',
        flexShrink: 0,
      }}>
        {/* AI hint strip */}
        {showAiHint && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#EFF6FF', borderBottom: '1px solid #DBEAFE',
            padding: '8px 16px',
          }}>
            <Info size={14} color="#2563EB" style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 12, color: '#1D4ED8', lineHeight: 1.4 }}>
              <strong>AI-подсказка:</strong> {aiHintText}
            </span>
            <button
              onClick={() => setShowAiHint(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#93C5FD', padding: 2, display: 'flex' }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: '12px 16px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4, flexShrink: 0, display: 'flex' }}>
            <Paperclip size={20} />
          </button>
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Написать сообщение…"
            style={{
              flex: 1, border: '1px solid #E5E7EB', borderRadius: 12,
              padding: '10px 14px', fontSize: 14, lineHeight: 1.5,
              fontFamily: 'inherit', color: '#1F2937', background: '#F9FAFB',
              outline: 'none', resize: 'none', overflow: 'hidden',
              minHeight: 40, maxHeight: 100,
            }}
          />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4, flexShrink: 0, display: 'flex' }}>
            <Smile size={20} />
          </button>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none',
              background: inputText.trim() ? '#2563EB' : '#E5E7EB',
              cursor: inputText.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background 0.15s',
            }}
          >
            <Send size={17} color={inputText.trim() ? '#fff' : '#9CA3AF'} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
        @media (max-width: 767px) {
          .chat-sidebar { display: none !important; }
          .chat-panel { display: flex !important; }
          .mobile-back-btn { display: flex !important; }
        }
      `}</style>

      <div style={{ fontFamily: 'Manrope, sans-serif', background: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* top nav */}
        <header style={{
          background: '#FFFFFF', borderBottom: '1px solid #E8E8E4',
          padding: '0 24px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 200, flexShrink: 0,
        }}>
          <a href="/" style={{ fontWeight: 800, fontSize: 20, color: '#1B365D', textDecoration: 'none', letterSpacing: -0.5 }}>DomWit</a>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a href="/search" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 14 }}>Поиск</a>
            <a href="/chat" style={{ color: '#2563EB', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Чат</a>
            <a href="/notifications" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 14 }}>Уведомления</a>
            <a href="/auth" style={{ background: '#1B365D', color: '#fff', padding: '7px 18px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Войти</a>
          </nav>
        </header>

        {/* chat shell */}
        <div style={{ flex: 1, display: 'flex', maxWidth: 1200, margin: '0 auto', width: '100%', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
          {/* sidebar — hidden on mobile when mobileView=chat */}
          <div
            className="chat-sidebar"
            style={{
              display: mobileView === 'list' ? 'flex' : 'none',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            {sidebar}
          </div>

          {/* chat panel */}
          <div
            className="chat-panel"
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              height: '100%', overflow: 'hidden',
              position: 'relative',
            }}
          >
            {chatPanel}
          </div>
        </div>
      </div>
    </>
  )
}
