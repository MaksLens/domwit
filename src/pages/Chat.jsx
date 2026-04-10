import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Send, Paperclip, ArrowLeft, Phone, Calendar, FileText, Image,
  CheckCheck, Check, ChevronDown, ChevronUp, X, Home, MapPin, Clock,
  Shield, MessageCircle, HelpCircle, DollarSign, Sparkles, File as FileIcon
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   DESIGN TOKENS — DomWit Design System
   ═══════════════════════════════════════════════════════════════════════ */
const T = {
  navy: '#1B365D',
  accent: '#2563EB',
  accentLight: '#EFF6FF',
  accentDark: '#1D4ED8',
  success: '#059669',
  successLight: '#ECFDF5',
  warn: '#D97706',
  warnLight: '#FFFBEB',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F5F3',
  bg: '#FAFAF8',
  border: '#E8E8E4',
  borderLight: '#F0F0EC',
  textPrimary: '#1B365D',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  radius: 12,
  radiusSm: 8,
  radiusXl: 16,
  font: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
};

/* ═══════════════════════════════════════════════════════════════════════
   MOCK DATA — 4 dialogs with diverse messages
   ═══════════════════════════════════════════════════════════════════════ */
const today = new Date();
const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
const twoDaysAgo = new Date(today); twoDaysAgo.setDate(today.getDate() - 2);

function dt(day, h, m) {
  const d = new Date(day);
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

const MOCK_DIALOGS = [
  {
    id: 'c1',
    name: 'Елена Морозова',
    role: 'Собственник',
    trustScore: 87,
    online: true,
    lastSeen: null,
    listing: {
      title: '2-комн. квартира в Хамовниках',
      address: 'Комсомольский пр-т, 42',
      price: '85 000 ₽/мес',
      photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=120&fit=crop',
    },
    messages: [
      { id: 'm1', from: 'them', type: 'text', text: 'Здравствуйте! Увидела вашу заявку на квартиру в Хамовниках. Квартира свободна, можем обсудить детали.', ts: dt(yesterday, 10, 15), status: 'read' },
      { id: 'm2', from: 'me', type: 'text', text: 'Добрый день! Да, очень заинтересован. Квартира выглядит замечательно. Подскажите, когда можно посмотреть?', ts: dt(yesterday, 10, 22), status: 'read' },
      { id: 'm3', from: 'them', type: 'text', text: 'Можно в любой день, кроме понедельника. Вам удобно вечером или в выходные?', ts: dt(yesterday, 10, 30), status: 'read' },
      { id: 'm4', from: 'me', type: 'text', text: 'Давайте в субботу, часов в 14:00?', ts: dt(yesterday, 11, 5), status: 'read' },
      { id: 'm5', from: 'system', type: 'system', text: 'Просмотр назначен: суббота, 14:00', ts: dt(yesterday, 11, 6) },
      { id: 'm6', from: 'them', type: 'photo', text: 'Вот фото кухни после ремонта', photoUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', ts: dt(today, 9, 10), status: 'read' },
      { id: 'm7', from: 'them', type: 'text', text: 'Кстати, коммунальные включены в стоимость, кроме электричества. Интернет тоже подключён — 500 Мбит.', ts: dt(today, 9, 12), status: 'read' },
      { id: 'm8', from: 'me', type: 'text', text: 'Отлично, спасибо! А с животными можно? У меня кот.', ts: dt(today, 9, 20), status: 'delivered' },
      { id: 'm9', from: 'them', type: 'text', text: 'Да, кот — не проблема, главное чтобы мебель была в порядке 😊', ts: dt(today, 9, 25), status: 'read' },
      { id: 'm10', from: 'them', type: 'text', text: 'Когда хотите заехать, если всё устроит?', ts: dt(today, 9, 30), status: 'read' },
    ],
    aiSuggestions: ['С 1-го числа следующего месяца', 'Как можно скорее', 'Нужно обсудить с семьёй'],
  },
  {
    id: 'c2',
    name: 'Алексей Петров',
    role: 'Собственник',
    trustScore: 92,
    online: false,
    lastSeen: '2 ч назад',
    listing: {
      title: '3-комн. квартира на Арбате',
      address: 'Арбат ул., 29',
      price: '130 000 ₽/мес',
      photo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=120&fit=crop',
    },
    messages: [
      { id: 'm11', from: 'me', type: 'text', text: 'Здравствуйте! Интересует квартира на Арбате. Она ещё свободна?', ts: dt(twoDaysAgo, 14, 0), status: 'read' },
      { id: 'm12', from: 'them', type: 'text', text: 'Добрый день! Да, квартира доступна. Что хотели бы узнать?', ts: dt(twoDaysAgo, 14, 30), status: 'read' },
      { id: 'm13', from: 'me', type: 'text', text: 'Какой залог и на какой срок минимальная аренда?', ts: dt(twoDaysAgo, 14, 45), status: 'read' },
      { id: 'm14', from: 'them', type: 'text', text: 'Залог — один месяц. Минимальный срок — 11 месяцев. Оплата помесячная, на карту.', ts: dt(twoDaysAgo, 15, 10), status: 'read' },
      { id: 'm15', from: 'them', type: 'document', text: 'Договор_аренды_шаблон.pdf', ts: dt(yesterday, 16, 0), status: 'read' },
      { id: 'm16', from: 'system', type: 'system', text: 'Договор отправлен на проверку', ts: dt(yesterday, 16, 1) },
      { id: 'm17', from: 'me', type: 'text', text: 'Спасибо, изучу договор и вернусь с вопросами.', ts: dt(yesterday, 18, 0), status: 'read' },
      { id: 'm18', from: 'them', type: 'text', text: 'Хорошо, если что — пишите. Возможен ли небольшой торг по цене?', ts: dt(today, 8, 0), status: 'read' },
    ],
    aiSuggestions: ['Да, хотел бы обсудить цену', 'Цена устраивает', 'Какая минимальная цена?'],
  },
  {
    id: 'c3',
    name: 'Ирина Козлова',
    role: 'Арендатор',
    trustScore: 78,
    online: true,
    lastSeen: null,
    listing: {
      title: 'Студия на Чистых прудах',
      address: 'Чистопрудный б-р, 3',
      price: '55 000 ₽/мес',
      photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=120&fit=crop',
    },
    messages: [
      { id: 'm19', from: 'them', type: 'text', text: 'Здравствуйте! Мне очень понравилась ваша студия. Можно записаться на просмотр?', ts: dt(today, 11, 0), status: 'read' },
      { id: 'm20', from: 'me', type: 'text', text: 'Добрый день! Конечно, когда вам удобно?', ts: dt(today, 11, 15), status: 'read' },
      { id: 'm21', from: 'them', type: 'text', text: 'Завтра после 18:00 было бы идеально', ts: dt(today, 11, 20), status: 'read' },
      { id: 'm22', from: 'me', type: 'text', text: 'Отлично, давайте в 18:30. Адрес: Чистопрудный бульвар, 3, подъезд 2, этаж 3.', ts: dt(today, 11, 25), status: 'delivered' },
      { id: 'm23', from: 'system', type: 'system', text: 'Просмотр назначен: завтра, 18:30', ts: dt(today, 11, 26) },
      { id: 'm24', from: 'them', type: 'text', text: 'Спасибо! А коммунальные входят в стоимость?', ts: dt(today, 11, 30), status: 'read' },
    ],
    aiSuggestions: ['Да, всё включено', 'Только вода и электричество отдельно', 'Давайте обсудим при встрече'],
  },
  {
    id: 'c4',
    name: 'Виктор Сидоров',
    role: 'Арендатор',
    trustScore: 65,
    online: false,
    lastSeen: '1 д назад',
    listing: {
      title: '1-комн. квартира на Тверской',
      address: 'Тверская ул., 18',
      price: '75 000 ₽/мес',
      photo: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200&h=120&fit=crop',
    },
    messages: [
      { id: 'm25', from: 'them', type: 'text', text: 'Добрый день, квартира ещё сдаётся?', ts: dt(twoDaysAgo, 20, 0), status: 'read' },
    ],
    aiSuggestions: ['Да, квартира свободна!', 'К сожалению, уже сдана', 'Да, давайте обсудим детали'],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════ */
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function formatDateLabel(ts) {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yest.toDateString();
  if (isToday) return 'Сегодня';
  if (isYesterday) return 'Вчера';
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

function groupMessagesByDay(messages) {
  const groups = [];
  let currentLabel = null;
  for (const msg of messages) {
    const label = formatDateLabel(msg.ts);
    if (label !== currentLabel) {
      groups.push({ type: 'date', label, ts: msg.ts });
      currentLabel = label;
    }
    groups.push(msg);
  }
  return groups;
}

function getDialogLastTime(dialog) {
  if (!dialog.messages.length) return '';
  const last = dialog.messages[dialog.messages.length - 1];
  const d = new Date(last.ts);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return formatTime(last.ts);
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  if (d.toDateString() === yest.toDateString()) return 'Вчера';
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function getUnreadCount(dialog) {
  let count = 0;
  for (let i = dialog.messages.length - 1; i >= 0; i--) {
    const m = dialog.messages[i];
    if (m.from === 'them' && m.status !== 'read') count++;
    else if (m.from === 'them') break;
  }
  return count;
}

/* ═══════════════════════════════════════════════════════════════════════
   TRUST SCORE RING — SVG mini ring
   ═══════════════════════════════════════════════════════════════════════ */
function TrustRing({ score, size = 32 }) {
  const r = (size - 4) / 2;
  const c = Math.PI * 2 * r;
  const pct = score / 100;
  const color = score >= 80 ? T.success : score >= 60 ? T.warn : '#EF4444';
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.borderLight} strokeWidth={2.5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={2.5}
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: size * 0.32, fontWeight: 700, fill: T.navy, fontFamily: T.font }}>
        {score}
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AVATAR COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
function Avatar({ name, size = 44, online, showOnline = true }) {
  const letter = name.charAt(0).toUpperCase();
  const colors = ['#1B365D', '#2563EB', '#059669', '#7C3AED', '#B45309', '#0891B2', '#BE185D'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  const bg = colors[Math.abs(h) % colors.length];
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: size * 0.4, fontFamily: T.font,
        userSelect: 'none',
      }}>
        {letter}
      </div>
      {showOnline && online && (
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: size * 0.3, height: size * 0.3, borderRadius: '50%',
          background: T.success, border: `2px solid ${T.surface}`,
        }} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MESSAGE STATUS ICONS
   ═══════════════════════════════════════════════════════════════════════ */
function MessageStatus({ status }) {
  if (status === 'sent') return <Check size={14} color={T.textMuted} />;
  if (status === 'delivered') return <CheckCheck size={14} color={T.textMuted} />;
  if (status === 'read') return <CheckCheck size={14} color={T.accent} />;
  return null;
}

/* ═══════════════════════════════════════════════════════════════════════
   TYPING INDICATOR — animated dots
   ═══════════════════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
      background: T.surfaceAlt, borderRadius: `${T.radiusSm}px ${T.radius}px ${T.radius}px 4px`,
      maxWidth: 120, marginTop: 4,
    }}>
      <span style={{ fontSize: 13, color: T.textSecondary, fontFamily: T.font }}>печатает</span>
      <span className="dw-typing-dots">
        <span className="dw-dot" />
        <span className="dw-dot" />
        <span className="dw-dot" />
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function DomWitChat() {
  // ─── State ──────────────────────────────────────────────────────────
  const [dialogs, setDialogs] = useState(MOCK_DIALOGS);
  const [activeId, setActiveId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | tenant | owner
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [showListingCard, setShowListingCard] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showQuestionMenu, setShowQuestionMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatAreaRef = useRef(null);

  const activeDialog = dialogs.find(d => d.id === activeId);

  // ─── Mobile detection ──────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ─── Auto-scroll ──────────────────────────────────────────────────
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeDialog?.messages?.length, isTyping]);

  // ─── Load AI suggestions when dialog changes ─────────────────────
  useEffect(() => {
    if (activeDialog) {
      const lastMsg = [...activeDialog.messages].reverse().find(m => m.from === 'them' && m.type === 'text');
      if (lastMsg) {
        setAiSuggestions(activeDialog.aiSuggestions || []);
      } else {
        setAiSuggestions([]);
      }
    }
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Send message ──────────────────────────────────────────────────
  const sendMessage = useCallback((text, type = 'text', extra = {}) => {
    if (!text.trim() && type === 'text') return;
    if (!activeId) return;

    const newMsg = {
      id: `m${Date.now()}`,
      from: 'me',
      type,
      text: text.trim(),
      ts: Date.now(),
      status: 'sent',
      ...extra,
    };

    setDialogs(prev => prev.map(d =>
      d.id === activeId
        ? { ...d, messages: [...d.messages, newMsg] }
        : d
    ));
    setInputText('');
    setAiSuggestions([]);
    setShowAttachMenu(false);
    setShowQuestionMenu(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }

    // Simulate delivery after 1s, read after 2s
    setTimeout(() => {
      setDialogs(prev => prev.map(d =>
        d.id === activeId
          ? { ...d, messages: d.messages.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m) }
          : d
      ));
    }, 1000);

    setTimeout(() => {
      setDialogs(prev => prev.map(d =>
        d.id === activeId
          ? { ...d, messages: d.messages.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m) }
          : d
      ));
    }, 2500);

    // Simulate typing + auto response for the first dialog
    setTimeout(() => setIsTyping(true), 3000);
    setTimeout(() => {
      setIsTyping(false);
      const autoReply = {
        id: `m${Date.now() + 1}`,
        from: 'them',
        type: 'text',
        text: getAutoReply(text),
        ts: Date.now(),
        status: 'read',
      };
      setDialogs(prev => prev.map(d =>
        d.id === activeId
          ? { ...d, messages: [...d.messages, autoReply], aiSuggestions: generateSuggestions(autoReply.text) }
          : d
      ));
      setAiSuggestions(generateSuggestions(autoReply.text));
    }, 5500);
  }, [activeId]);

  function getAutoReply(text) {
    const lower = text.toLowerCase();
    if (lower.includes('просмотр') || lower.includes('посмотреть')) return 'Отлично! Давайте согласуем время. Мне удобно завтра после 14:00 или в выходные.';
    if (lower.includes('цен') || lower.includes('торг') || lower.includes('стоимость')) return 'По цене можем обсудить, если планируете долгосрочную аренду (от года). Какой срок рассматриваете?';
    if (lower.includes('животн') || lower.includes('кот') || lower.includes('собак')) return 'Небольшие животные допускаются. Пожалуйста, укажите это в вашем арендном паспорте.';
    if (lower.includes('коммуналь') || lower.includes('платеж')) return 'Коммунальные включены, кроме электричества. В среднем выходит 2000-3000₽ в месяц.';
    if (lower.includes('заехать') || lower.includes('заселени')) return 'Заезд возможен с первого числа следующего месяца. Нужно будет подписать договор и внести залог.';
    return 'Понял, спасибо за информацию! Давайте обсудим детали. Есть ещё вопросы по квартире?';
  }

  function generateSuggestions(text) {
    const lower = text.toLowerCase();
    if (lower.includes('время') || lower.includes('когда') || lower.includes('удобно')) return ['Завтра в 14:00', 'В субботу утром', 'Сегодня вечером'];
    if (lower.includes('срок') || lower.includes('долгосроч')) return ['Планирую на год', 'На 6 месяцев', 'Пока не определился'];
    if (lower.includes('паспорт') || lower.includes('укажите')) return ['Уже заполнил паспорт', 'Сейчас заполню', 'Где это можно сделать?'];
    if (lower.includes('вопрос') || lower.includes('ещё')) return ['Можно ли с детьми?', 'Есть ли парковка?', 'Всё понятно, спасибо!'];
    if (lower.includes('договор') || lower.includes('залог')) return ['Согласен с условиями', 'Когда можно подписать?', 'Хочу уточнить детали'];
    return ['Спасибо!', 'Хорошо, договорились', 'Есть ещё вопрос'];
  }

  // ─── Handle key press ──────────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  // ─── Auto-resize textarea ─────────────────────────────────────────
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    const el = e.target;
    el.style.height = '44px';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  // ─── Open dialog ──────────────────────────────────────────────────
  const openDialog = (id) => {
    setActiveId(id);
    setMobileShowChat(true);
    setShowAttachMenu(false);
    setShowQuestionMenu(false);
    setIsTyping(false);
    // Load AI suggestions
    const dialog = dialogs.find(d => d.id === id);
    if (dialog) {
      const lastIncoming = [...dialog.messages].reverse().find(m => m.from === 'them' && m.type === 'text');
      if (lastIncoming) setAiSuggestions(dialog.aiSuggestions || []);
      else setAiSuggestions([]);
    }
  };

  const goBack = () => {
    setMobileShowChat(false);
    setActiveId(null);
  };

  // ─── Quick Actions ────────────────────────────────────────────────
  const quickActions = [
    {
      icon: <Calendar size={15} />, label: 'Назначить просмотр',
      action: () => setInputText('Здравствуйте! Хотел бы назначить просмотр квартиры. Мне удобно: '),
    },
    {
      icon: <Shield size={15} />, label: 'Отправить паспорт',
      action: () => {
        const sysMsg = {
          id: `m${Date.now()}`, from: 'system', type: 'system',
          text: '📋 Арендный паспорт отправлен собеседнику', ts: Date.now(),
        };
        setDialogs(prev => prev.map(d =>
          d.id === activeId ? { ...d, messages: [...d.messages, sysMsg] } : d
        ));
      },
    },
    {
      icon: <DollarSign size={15} />, label: 'Обсудить цену',
      action: () => setInputText('Здравствуйте! Хотел бы обсудить условия аренды. Возможен ли торг по цене?'),
    },
    {
      icon: <HelpCircle size={15} />, label: 'Задать вопрос',
      action: () => setShowQuestionMenu(!showQuestionMenu),
    },
  ];

  const frequentQuestions = [
    'Можно ли с животными?',
    'Входят ли коммунальные в стоимость?',
    'Возможен ли торг?',
    'Когда можно заехать?',
  ];

  // ─── Filtering and sorting ────────────────────────────────────────
  const filteredDialogs = dialogs
    .filter(d => {
      if (filter === 'tenant') return d.role === 'Арендатор';
      if (filter === 'owner') return d.role === 'Собственник';
      return true;
    })
    .filter(d => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.listing.title.toLowerCase().includes(q) || d.listing.address.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const ua = getUnreadCount(a);
      const ub = getUnreadCount(b);
      if (ua > 0 && ub === 0) return -1;
      if (ub > 0 && ua === 0) return 1;
      const la = a.messages[a.messages.length - 1]?.ts || 0;
      const lb = b.messages[b.messages.length - 1]?.ts || 0;
      return lb - la;
    });

  // ═══════════════════════════════════════════════════════════════════
  // RENDER: Sidebar — Dialog List
  // ═══════════════════════════════════════════════════════════════════
  const renderSidebar = () => (
    <div style={{
      width: isMobile ? '100%' : 360, minWidth: isMobile ? '100%' : 360,
      borderRight: isMobile ? 'none' : `1px solid ${T.border}`,
      background: T.surface, display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px', borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: T.navy, fontFamily: T.font, margin: 0 }}>Сообщения</h2>
        <div style={{
          background: T.accentLight, color: T.accent, borderRadius: 20,
          padding: '2px 10px', fontSize: 13, fontWeight: 600, fontFamily: T.font,
        }}>
          {dialogs.reduce((sum, d) => sum + getUnreadCount(d), 0) || ''}
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '12px 20px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: T.surfaceAlt, borderRadius: T.radiusSm, padding: '8px 12px',
          border: `1px solid ${T.borderLight}`,
        }}>
          <Search size={16} color={T.textMuted} />
          <input
            type="text" placeholder="Поиск по диалогам..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: 14, fontFamily: T.font, color: T.navy, width: '100%',
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, padding: '4px 20px 12px' }}>
        {[
          { key: 'all', label: 'Все' },
          { key: 'owner', label: 'Собственники' },
          { key: 'tenant', label: 'Арендаторы' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            border: 'none', cursor: 'pointer', fontFamily: T.font,
            padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
            background: filter === f.key ? T.accent : T.surfaceAlt,
            color: filter === f.key ? '#fff' : T.textSecondary,
            transition: 'all 0.2s ease',
          }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Dialog list */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {filteredDialogs.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: 40, color: T.textMuted, textAlign: 'center',
          }}>
            <MessageCircle size={48} color={T.borderLight} style={{ marginBottom: 12 }} />
            <p style={{ fontSize: 15, fontWeight: 500, fontFamily: T.font, margin: 0 }}>Нет диалогов</p>
            <p style={{ fontSize: 13, fontFamily: T.font, marginTop: 4 }}>Начните общение с собственником или арендатором</p>
          </div>
        ) : (
          filteredDialogs.map(d => {
            const unread = getUnreadCount(d);
            const lastMsg = d.messages[d.messages.length - 1];
            const isActive = d.id === activeId;
            return (
              <div key={d.id} onClick={() => openDialog(d.id)} style={{
                display: 'flex', gap: 12, padding: '14px 20px', cursor: 'pointer',
                background: isActive ? T.accentLight : 'transparent',
                borderLeft: isActive ? `3px solid ${T.accent}` : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = T.surfaceAlt; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <Avatar name={d.name} size={48} online={d.online} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: T.navy, fontFamily: T.font }}>{d.name}</span>
                    <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font, flexShrink: 0 }}>
                      {getDialogLastTime(d)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{
                      fontSize: 11, color: T.textMuted, fontFamily: T.font,
                      background: T.surfaceAlt, padding: '1px 6px', borderRadius: 4,
                    }}>{d.role}</span>
                    <TrustRing score={d.trustScore} size={20} />
                  </div>
                  <div style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.font, marginBottom: 3 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Home size={11} color={T.textMuted} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {d.listing.title}
                      </span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 13, color: unread > 0 ? T.navy : T.textMuted,
                      fontWeight: unread > 0 ? 500 : 400, fontFamily: T.font,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200,
                    }}>
                      {lastMsg?.from === 'me' && <span style={{ color: T.textMuted }}>Вы: </span>}
                      {lastMsg?.type === 'photo' ? '📷 Фото' : lastMsg?.type === 'document' ? '📎 Документ' : lastMsg?.type === 'system' ? `ℹ️ ${lastMsg.text}` : lastMsg?.text || ''}
                    </span>
                    {unread > 0 && (
                      <span style={{
                        background: T.accent, color: '#fff', borderRadius: 10,
                        padding: '2px 7px', fontSize: 11, fontWeight: 700,
                        fontFamily: T.font, flexShrink: 0, minWidth: 18, textAlign: 'center',
                      }}>{unread}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // RENDER: Chat Area
  // ═══════════════════════════════════════════════════════════════════
  const renderChat = () => {
    if (!activeDialog) {
      return (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: T.bg, color: T.textMuted, textAlign: 'center', padding: 40,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: T.accentLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          }}>
            <MessageCircle size={36} color={T.accent} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: T.navy, fontFamily: T.font, margin: 0, marginBottom: 8 }}>
            Выберите диалог
          </h3>
          <p style={{ fontSize: 14, fontFamily: T.font, maxWidth: 280, lineHeight: 1.5, margin: 0 }}>
            Выберите собеседника из списка слева, чтобы начать общение
          </p>
        </div>
      );
    }

    const grouped = groupMessagesByDay(activeDialog.messages);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.bg, height: '100%', overflow: 'hidden' }}>
        {/* ─── Chat Header ─────────────────────────────────────────── */}
        <div style={{
          background: T.surface, borderBottom: `1px solid ${T.border}`,
          padding: '12px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isMobile && (
              <button onClick={goBack} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                display: 'flex', alignItems: 'center',
              }}>
                <ArrowLeft size={22} color={T.navy} />
              </button>
            )}
            <Avatar name={activeDialog.name} size={40} online={activeDialog.online} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: T.navy, fontFamily: T.font }}>{activeDialog.name}</span>
                <TrustRing score={activeDialog.trustScore} size={24} />
              </div>
              <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>
                {activeDialog.online ? 'онлайн' : activeDialog.lastSeen ? `был(а) ${activeDialog.lastSeen}` : 'не в сети'}
              </span>
            </div>
            <button onClick={() => setShowListingCard(!showListingCard)} style={{
              background: T.surfaceAlt, border: `1px solid ${T.borderLight}`, borderRadius: T.radiusSm,
              padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13, color: T.textSecondary, fontFamily: T.font, fontWeight: 500,
            }}>
              <Home size={14} />
              {showListingCard ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Mini listing card */}
          {showListingCard && (
            <div style={{
              marginTop: 10, display: 'flex', gap: 12, padding: 10,
              background: T.surfaceAlt, borderRadius: T.radiusSm,
              border: `1px solid ${T.borderLight}`,
              animation: 'dw-slideDown 0.2s ease',
            }}>
              <img src={activeDialog.listing.photo} alt="" style={{
                width: 72, height: 48, objectFit: 'cover', borderRadius: 6, flexShrink: 0,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, fontFamily: T.font,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {activeDialog.listing.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <MapPin size={11} color={T.textMuted} />
                  <span style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.font }}>
                    {activeDialog.listing.address}
                  </span>
                </div>
              </div>
              <div style={{
                fontSize: 14, fontWeight: 700, color: T.accent, fontFamily: T.font,
                flexShrink: 0, whiteSpace: 'nowrap',
              }}>
                {activeDialog.listing.price}
              </div>
            </div>
          )}
        </div>

        {/* ─── Messages Area ──────────────────────────────────────── */}
        <div ref={chatAreaRef} style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '16px 20px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {grouped.map((item, idx) => {
            if (item.type === 'date') {
              return (
                <div key={`date-${idx}`} style={{
                  textAlign: 'center', margin: '16px 0 8px',
                }}>
                  <span style={{
                    background: T.surfaceAlt, borderRadius: 12, padding: '4px 14px',
                    fontSize: 12, color: T.textMuted, fontWeight: 500, fontFamily: T.font,
                    border: `1px solid ${T.borderLight}`,
                  }}>
                    {item.label}
                  </span>
                </div>
              );
            }

            // System message
            if (item.type === 'system') {
              return (
                <div key={item.id} style={{
                  textAlign: 'center', margin: '8px 0',
                  animation: 'dw-fadeUp 0.3s ease',
                }}>
                  <span style={{
                    background: T.accentLight, borderRadius: T.radiusSm, padding: '6px 16px',
                    fontSize: 13, color: T.accent, fontWeight: 500, fontFamily: T.font,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    <Sparkles size={14} />
                    {item.text}
                  </span>
                </div>
              );
            }

            const isMe = item.from === 'me';

            // Photo message
            if (item.type === 'photo') {
              return (
                <div key={item.id} style={{
                  display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                  marginTop: 4, animation: 'dw-fadeUp 0.3s ease',
                }}>
                  <div style={{ maxWidth: isMobile ? '85%' : '50%' }}>
                    <img src={item.photoUrl} alt="" style={{
                      width: '100%', maxWidth: 320, borderRadius: T.radius,
                      display: 'block', cursor: 'pointer',
                    }} />
                    {item.text && (
                      <div style={{
                        fontSize: 13, color: T.textSecondary, fontFamily: T.font,
                        marginTop: 4, paddingLeft: 4,
                      }}>{item.text}</div>
                    )}
                    <div style={{
                      display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                      alignItems: 'center', gap: 4, marginTop: 4, paddingRight: 4,
                    }}>
                      <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font }}>
                        {formatTime(item.ts)}
                      </span>
                      {isMe && <MessageStatus status={item.status} />}
                    </div>
                  </div>
                </div>
              );
            }

            // Document message
            if (item.type === 'document') {
              return (
                <div key={item.id} style={{
                  display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                  marginTop: 4, animation: 'dw-fadeUp 0.3s ease',
                }}>
                  <div style={{
                    background: isMe ? T.accent : T.surface,
                    borderRadius: isMe ? `${T.radius}px 4px ${T.radius}px ${T.radius}px` : `4px ${T.radius}px ${T.radius}px ${T.radius}px`,
                    padding: '10px 14px', maxWidth: isMobile ? '85%' : '50%',
                    border: isMe ? 'none' : `1px solid ${T.borderLight}`,
                    display: 'flex', alignItems: 'center', gap: 10,
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: isMe ? 'rgba(255,255,255,0.2)' : T.accentLight,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FileIcon size={18} color={isMe ? '#fff' : T.accent} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: 13, fontWeight: 500, color: isMe ? '#fff' : T.navy,
                        fontFamily: T.font, marginBottom: 2,
                      }}>
                        {item.text}
                      </div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        <span style={{ fontSize: 11, color: isMe ? 'rgba(255,255,255,0.7)' : T.textMuted, fontFamily: T.font }}>
                          {formatTime(item.ts)}
                        </span>
                        {isMe && <MessageStatus status={item.status} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Text message
            return (
              <div key={item.id} style={{
                display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                marginTop: 4, animation: 'dw-fadeUp 0.3s ease',
              }}>
                <div style={{
                  background: isMe ? T.accent : T.surface,
                  color: isMe ? '#fff' : T.navy,
                  borderRadius: isMe
                    ? `${T.radius}px 4px ${T.radius}px ${T.radius}px`
                    : `4px ${T.radius}px ${T.radius}px ${T.radius}px`,
                  padding: '10px 14px', maxWidth: isMobile ? '85%' : '55%',
                  border: isMe ? 'none' : `1px solid ${T.borderLight}`,
                  boxShadow: isMe ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.5, fontFamily: T.font, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {item.text}
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                    gap: 4, marginTop: 4,
                  }}>
                    <span style={{
                      fontSize: 11, fontFamily: T.font,
                      color: isMe ? 'rgba(255,255,255,0.7)' : T.textMuted,
                    }}>
                      {formatTime(item.ts)}
                    </span>
                    {isMe && <MessageStatus status={item.status} />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 4 }}>
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ─── AI Suggestions ────────────────────────────────────── */}
        {aiSuggestions.length > 0 && (
          <div style={{
            padding: '8px 20px 0', background: T.bg,
            display: 'flex', gap: 6, flexWrap: 'wrap',
            animation: 'dw-fadeUp 0.3s ease',
          }}>
            <Sparkles size={14} color={T.accent} style={{ marginTop: 5 }} />
            {aiSuggestions.map((s, i) => (
              <button key={i} onClick={() => { setInputText(s); setAiSuggestions([]); }} style={{
                background: T.surface, border: `1px solid ${T.accent}33`,
                borderRadius: 20, padding: '6px 14px', cursor: 'pointer',
                fontSize: 13, color: T.accent, fontFamily: T.font, fontWeight: 500,
                transition: 'all 0.15s ease', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = T.accentLight; e.currentTarget.style.borderColor = T.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.borderColor = `${T.accent}33`; }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ─── Quick Actions ─────────────────────────────────────── */}
        <div style={{
          padding: '8px 20px', background: T.bg,
          display: 'flex', gap: 6, overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          {quickActions.map((qa, i) => (
            <button key={i} onClick={qa.action} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: T.surface, border: `1px solid ${T.borderLight}`,
              borderRadius: 20, padding: '6px 14px', cursor: 'pointer',
              fontSize: 12, color: T.textSecondary, fontFamily: T.font, fontWeight: 500,
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.borderLight; e.currentTarget.style.color = T.textSecondary; }}
            >
              {qa.icon}
              {qa.label}
            </button>
          ))}
        </div>

        {/* Question submenu */}
        {showQuestionMenu && (
          <div style={{
            padding: '0 20px 8px', display: 'flex', gap: 6, flexWrap: 'wrap',
            animation: 'dw-fadeUp 0.2s ease',
          }}>
            {frequentQuestions.map((q, i) => (
              <button key={i} onClick={() => { setInputText(q); setShowQuestionMenu(false); }} style={{
                background: T.accentLight, border: `1px solid ${T.accent}22`,
                borderRadius: 16, padding: '5px 12px', cursor: 'pointer',
                fontSize: 12, color: T.accent, fontFamily: T.font, fontWeight: 500,
                whiteSpace: 'nowrap', transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${T.accent}22`; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.accentLight; }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* ─── Input Area ────────────────────────────────────────── */}
        <div style={{
          padding: '10px 20px 16px', background: T.surface,
          borderTop: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'flex-end', gap: 8,
          position: 'relative',
        }}>
          {/* Attach button */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowAttachMenu(!showAttachMenu)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: showAttachMenu ? T.accent : T.textMuted,
              transition: 'color 0.15s ease',
            }}>
              <Paperclip size={20} />
            </button>
            {showAttachMenu && (
              <div style={{
                position: 'absolute', bottom: 40, left: 0,
                background: T.surface, borderRadius: T.radiusSm,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: `1px solid ${T.border}`,
                padding: 4, minWidth: 160, zIndex: 10,
                animation: 'dw-fadeUp 0.2s ease',
              }}>
                {[
                  { icon: <Image size={16} />, label: 'Фото', action: () => { sendMessage('📷 Фото отправлено', 'photo', { photoUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop' }); setShowAttachMenu(false); } },
                  { icon: <FileIcon size={16} />, label: 'Документ', action: () => { sendMessage('Документ.pdf', 'document'); setShowAttachMenu(false); } },
                ].map((item, i) => (
                  <button key={i} onClick={item.action} style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px',
                    borderRadius: 6, fontSize: 14, color: T.navy, fontFamily: T.font,
                    textAlign: 'left', transition: 'background 0.1s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.surfaceAlt; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Напишите сообщение..."
            rows={1}
            style={{
              flex: 1, resize: 'none', border: `1.5px solid ${T.borderLight}`,
              borderRadius: T.radius, padding: '10px 14px',
              fontSize: 14, fontFamily: T.font, color: T.navy,
              outline: 'none', background: T.surfaceAlt, height: 44, maxHeight: 120,
              lineHeight: 1.5,
              transition: 'border-color 0.15s ease',
            }}
            onFocus={e => { e.target.style.borderColor = T.accent; }}
            onBlur={e => { e.target.style.borderColor = T.borderLight; }}
          />

          {/* Send button */}
          <button onClick={() => sendMessage(inputText)} disabled={!inputText.trim()} style={{
            background: inputText.trim() ? T.accent : T.surfaceAlt,
            border: 'none', borderRadius: '50%', width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'default',
            transition: 'all 0.2s ease', flexShrink: 0,
          }}>
            <Send size={18} color={inputText.trim() ? '#fff' : T.textMuted} />
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // RENDER: Main
  // ═══════════════════════════════════════════════════════════════════
  return (
    <>
      <style>{`
        @keyframes dw-fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dw-slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 100px; }
        }
        @keyframes dw-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        .dw-typing-dots {
          display: inline-flex;
          gap: 3px;
          align-items: center;
        }
        .dw-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${T.textMuted};
          animation: dw-bounce 1.2s infinite;
        }
        .dw-dot:nth-child(2) { animation-delay: 0.2s; }
        .dw-dot:nth-child(3) { animation-delay: 0.4s; }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.borderLight}; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.textMuted}; }
      `}</style>

      <div style={{
        fontFamily: T.font, background: T.bg, height: '100vh',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* ─── Top Header ──────────────────────────────────────────── */}
        <header style={{
          background: T.surface, borderBottom: `1px solid ${T.border}`,
          padding: '0 24px', height: 56, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexShrink: 0,
        }}>
          <a href="/" style={{ fontWeight: 800, fontSize: 20, color: T.navy, textDecoration: 'none', fontFamily: T.font }}>
            DomWit
          </a>
          <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href="/search" style={{ color: T.textSecondary, textDecoration: 'none', fontSize: 14, fontFamily: T.font }}>Поиск</a>
            <a href="/chat" style={{ color: T.accent, textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: T.font }}>Чат</a>
            <a href="/auth" style={{
              background: T.accent, color: '#fff', padding: '7px 18px', borderRadius: T.radiusSm,
              textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: T.font,
            }}>Войти</a>
          </nav>
        </header>

        {/* ─── Main Content ────────────────────────────────────────── */}
        <div style={{
          flex: 1, display: 'flex', overflow: 'hidden',
          maxWidth: 1400, width: '100%', margin: '0 auto',
          background: T.surface, borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`,
        }}>
          {/* Sidebar — hide on mobile when chat is open */}
          {(!isMobile || !mobileShowChat) && renderSidebar()}

          {/* Chat — hide on mobile when sidebar is shown */}
          {(!isMobile || mobileShowChat) && renderChat()}
        </div>
      </div>
    </>
  );
}
