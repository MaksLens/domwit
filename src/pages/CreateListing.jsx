import React, { useState } from 'react'

const STEPS = [
  'Тип жилья',
  'Адрес',
  'Параметры',
  'Описание',
  'Удобства',
  'Фотографии',
  'Условия',
  'Требования',
  'Публикация',
]

export default function DomwitCreateListing() {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [area, setArea] = useState('')
  const [rooms, setRooms] = useState('')

  const progress = Math.round((step / STEPS.length) * 100)

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #E8E8E4',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 15,
    fontFamily: 'Manrope, sans-serif',
    outline: 'none',
    color: '#1B365D',
    boxSizing: 'border-box',
    background: '#FFFFFF',
  }

  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Тип жилья</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Выберите, что вы сдаёте</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[['🏢', 'Квартира'], ['🏠', 'Дом'], ['🛏', 'Комната'], ['🏙', 'Апартаменты'], ['🏡', 'Дача'], ['🏗', 'Новостройка']].map(([icon, type]) => (
                <button
                  key={type}
                  onClick={() => setPropertyType(type)}
                  style={{ background: propertyType === type ? '#EFF6FF' : '#FFFFFF', border: '1.5px solid', borderColor: propertyType === type ? '#2563EB' : '#E8E8E4', borderRadius: 14, padding: '20px 16px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', textAlign: 'center' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: propertyType === type ? '#2563EB' : '#374151' }}>{type}</div>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Адрес</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Укажите точный адрес объекта</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div><label style={labelStyle}>Город</label><input type="text" placeholder="Москва" style={inputStyle} /></div>
              <div><label style={labelStyle}>Улица</label><input type="text" placeholder="ул. Тверская" style={inputStyle} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div><label style={labelStyle}>Дом</label><input type="text" placeholder="18" style={inputStyle} /></div>
                <div><label style={labelStyle}>Корпус</label><input type="text" placeholder="2" style={inputStyle} /></div>
                <div><label style={labelStyle}>Квартира</label><input type="text" placeholder="5" style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Метро / ориентир</label><input type="text" placeholder="Тверская, 5 мин пешком" style={inputStyle} /></div>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Параметры</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Основные характеристики квартиры</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={labelStyle}>Комнат</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Студия', '1', '2', '3', '4+'].map(r => (
                    <button key={r} onClick={() => setRooms(r)} style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: '1.5px solid', borderColor: rooms === r ? '#2563EB' : '#E8E8E4', background: rooms === r ? '#EFF6FF' : '#FFFFFF', color: rooms === r ? '#2563EB' : '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>{r}</button>
                  ))}
                </div>
              </div>
              <div><label style={labelStyle}>Площадь, м²</label><input type="number" value={area} onChange={e => setArea(e.target.value)} placeholder="54" style={inputStyle} /></div>
              <div><label style={labelStyle}>Этаж</label><input type="number" placeholder="5" style={inputStyle} /></div>
              <div><label style={labelStyle}>Этажей в доме</label><input type="number" placeholder="9" style={inputStyle} /></div>
              <div><label style={labelStyle}>Год постройки</label><input type="number" placeholder="2005" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Тип дома</label>
                <select style={{ ...inputStyle }}>
                  <option>Панельный</option>
                  <option>Кирпичный</option>
                  <option>Монолитный</option>
                  <option>Деревянный</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Описание</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Расскажите о квартире подробнее</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Заголовок объявления</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="2-комнатная квартира в центре Москвы" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Подробное описание</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Расскажите о ремонте, мебели, виде из окна, соседях и удобстве расположения…"
                  rows={6}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>{description.length} / 2000 символов</span>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Удобства</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Отметьте всё, что есть в квартире</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {['Интернет', 'Кондиционер', 'Стиральная машина', 'Посудомойка', 'Холодильник', 'Телевизор', 'Балкон / лоджия', 'Парковка', 'Консьерж', 'Лифт', 'Можно с детьми', 'Можно с питомцами'].map(a => (
                <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: '1.5px solid #E8E8E4', borderRadius: 10, cursor: 'pointer', background: '#FFFFFF', fontSize: 14, color: '#374151', fontWeight: 500 }}>
                  <input type="checkbox" style={{ accentColor: '#2563EB', width: 16, height: 16 }} />
                  {a}
                </label>
              ))}
            </div>
          </div>
        )
      case 6:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Фотографии</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Добавьте минимум 5 фотографий — это увеличивает число заявок на 70%</p>
            <div style={{ border: '2px dashed #DBEAFE', borderRadius: 16, padding: '48px 24px', textAlign: 'center', background: '#F0F7FF', cursor: 'pointer', marginBottom: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📷</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1B365D', marginBottom: 6 }}>Перетащите фотографии сюда</div>
              <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>или нажмите для выбора файлов</div>
              <button style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
                Выбрать файлы
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ aspectRatio: '4/3', background: '#E5E7EB', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>Фото {i}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 7:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Условия аренды</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Укажите стоимость и условия</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Арендная плата, ₽/мес</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="85 000" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Залог</label>
                  <select style={{ ...inputStyle }}>
                    <option>1 месяц</option>
                    <option>2 месяца</option>
                    <option>Без залога</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Мин. срок аренды</label>
                  <select style={{ ...inputStyle }}>
                    <option>3 месяца</option>
                    <option>6 месяцев</option>
                    <option>1 год</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Коммунальные услуги</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['Включены в стоимость', 'Оплачиваются отдельно'].map(o => (
                    <label key={o} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #E8E8E4', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', background: '#FFFFFF', fontSize: 14, fontWeight: 500, color: '#374151' }}>
                      <input type="radio" name="utilities" style={{ accentColor: '#2563EB' }} />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Возможная дата заезда</label>
                <input type="date" style={inputStyle} />
              </div>
            </div>
          </div>
        )
      case 8:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B365D', marginBottom: 8 }}>Требования к арендатору</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Укажите предпочтения (необязательно)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Мин. Trust Score арендатора</label>
                <select style={{ ...inputStyle }}>
                  <option>Не важно</option>
                  <option>60+</option>
                  <option>75+</option>
                  <option>90+</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Предпочтения по арендатору</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {['Семья с детьми', 'Без детей', 'С животными', 'Без животных', 'Не курящий', 'Работающий'].map(p => (
                    <label key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: '1.5px solid #E8E8E4', borderRadius: 10, cursor: 'pointer', background: '#FFFFFF', fontSize: 14, color: '#374151' }}>
                      <input type="checkbox" style={{ accentColor: '#2563EB' }} />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Дополнительные пожелания</label>
                <textarea placeholder="Например: только для семейных пар…" rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
              </div>
            </div>
          </div>
        )
      case 9:
        return (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1B365D', marginBottom: 12 }}>Готово к публикации!</h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>
              Проверьте данные и опубликуйте объявление. Первые заявки обычно приходят в течение 24 часов.
            </p>
            <div style={{ background: '#F9FAFB', border: '1px solid #E8E8E4', borderRadius: 16, padding: '24px 28px', textAlign: 'left', marginBottom: 28 }}>
              {[['Тип', propertyType || 'Квартира'], ['Площадь', area ? `${area} м²` : '54 м²'], ['Цена', price ? `${Number(price).toLocaleString('ru-RU')} ₽/мес` : '85 000 ₽/мес'], ['Статус', 'Готово к публикации']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: 14, color: '#6B7280' }}>{k}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1B365D' }}>{v}</span>
                </div>
              ))}
            </div>
            <button style={{ background: '#059669', color: '#FFFFFF', border: 'none', borderRadius: 10, padding: '14px 40px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
              Опубликовать объявление
            </button>
          </div>
        )
      default:
        return null
    }
  }

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

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        {/* Progress header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#6B7280' }}>Шаг {step} из {STEPS.length}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#2563EB' }}>{progress}%</span>
          </div>
          {/* Progress bar */}
          <div style={{ height: 6, background: '#E8E8E4', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#2563EB', borderRadius: 3, transition: 'width 0.3s ease' }} />
          </div>
          {/* Step labels */}
          <div style={{ display: 'flex', marginTop: 16, gap: 4, overflowX: 'auto' }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i + 1 < step ? '#059669' : i + 1 === step ? '#2563EB' : '#E8E8E4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: i + 1 <= step ? '#FFFFFF' : '#9CA3AF', marginBottom: 4, flexShrink: 0 }}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 10, color: i + 1 === step ? '#2563EB' : '#9CA3AF', textAlign: 'center', fontWeight: i + 1 === step ? 700 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 64 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E4', borderRadius: 20, padding: '40px 36px', marginBottom: 24 }}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            style={{ background: '#FFFFFF', color: '#1B365D', border: '1.5px solid #E8E8E4', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: step === 1 ? 'default' : 'pointer', opacity: step === 1 ? 0.4 : 1, fontFamily: 'Manrope, sans-serif' }}
          >
            ← Назад
          </button>
          {step < STEPS.length && (
            <button
              onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
              style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
            >
              Далее →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
