import React, { useState, useEffect } from "react";
import { FaCarSide, FaMapMarkedAlt, FaHelicopter, FaShip, FaHandshake, FaPhone } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";

const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN || '7668503665:AAFw9X2UWS6bvZzU48HVuTDRmJbji-mFbeE';
const TELEGRAM_CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID || '-4774718414';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      type: "spring",
      stiffness: 80
    }
  })
};

const cardData = [
  {
    title: "VIP-трансферы",
    icon: <FaCarSide />,
    price: "от 1800 рублей",
    backText: "Встретим в аэропорту, на вокзале или границе. Ваш водитель с табличкой поможет с багажом и доставит без задержек.",
  },
  {
    title: "Эксклюзивные экскурсии",
    icon: <FaShip />,
    price: "от 10 000 рублей",
    backText: "Роскошные прогулки на катерах по знаменитым водным артериям города, где каждый маршрут создан с учетом ваших пожеланий.",
  },
  {
    title: "Полёты на вертолёте",
    icon: <FaHelicopter />,
    price: "от 50 000 рублей",
    backText: "Уникальная возможность увидеть северную столицу с высоты птичьего полета. Захватывающие виды города, залива и достопримечательностей.",
  },
  {
    title: "Выездные мероприятия",
    icon: <FaMapMarkedAlt />,
    price: "от 30 000 рублей",
    backText: "Сделаем любое событие незабываемым, предоставляя элегантные автомобили, водителей в форме и безупречный сервис.",
  },
  {
    title: "Обслуживание ПЭМФ",
    icon: <FaHandshake />,
    price: "цена обсуждается",
    backText: "Мы активно работаем на этом знаковом мероприятии, обеспечивая транспортное сопровождение делегатов, участников и гостей.",
  },
];

const FleetSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Хочу узнать подробнее про услугу!");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');
    
    // Позволяем редактировать любую часть номера
    if (digits.length <= 1) {
      setPhone(digits ? `+7 (${digits.slice(1)}` : '');
      return;
    }
    
    let formatted = '+7 (';
    
    if (digits.length > 1) {
      formatted += digits.slice(1, 4);
    }
    if (digits.length > 4) {
      formatted += `) ${digits.slice(4, 7)}`;
    }
    if (digits.length > 7) {
      formatted += ` ${digits.slice(7, 9)}`;
    }
    if (digits.length > 9) {
      formatted += `-${digits.slice(9, 11)}`;
    }
    
    setPhone(formatted);
  };

  const handlePhoneKeyDown = (e) => {
    // Разрешаем удаление символов Backspace и Delete
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const selectionStart = e.target.selectionStart;
      const selectionEnd = e.target.selectionEnd;
      
      // Если выделен текст - удаляем его
      if (selectionStart !== selectionEnd) {
        return;
      }
      
      // Если курсор находится после цифры - разрешаем удаление
      const charBeforeCursor = phone[selectionStart - 1];
      if (/\d/.test(charBeforeCursor)) {
        return;
      }
      
      // Иначе предотвращаем удаление разделителей
      e.preventDefault();
    }
  };

  const sendToTelegram = async (text) => {
    const botToken = TELEGRAM_BOT_TOKEN;
    const chatId = TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.error('Telegram credentials are not set');
      throw new Error('Telegram credentials are not set');
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    
    const now = Date.now();
    if (now - lastSubmissionTime < 300000) {
      setSubmitError("Вы можете отправлять заявку не чаще чем раз в 5 минут");
      return;
    }

    if (!phone || !selectedService) {
      setSubmitError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    const text = `
<b>Новая заявка на услугу</b>
📌 <b>Услуга:</b> ${selectedService}
📞 <b>Телефон:</b> ${phone}
✉️ <b>Сообщение:</b> ${message}
    `;
    
    try {
      await sendToTelegram(text);
      setIsSubmitted(true);
      setLastSubmissionTime(now);
      setTimeout(() => {
        setSelectedService(null);
        setPhone("");
        setMessage("Хочу узнать подробнее про услугу!");
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Ошибка:', error);
      setSubmitError("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.");
    }
  };

  return (
    <section id="fleet" className="snap-start h-screen flex flex-col overflow-hidden" ref={ref}>
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="bg-white w-full px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-4 flex-shrink-0"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl pt-8 font-bold mb-4 text-gray-900 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Центр подключения водителей<br className="hidden md:block" /> 
            <span className="text-yellow-500">— комфорт и качество в каждой поездке</span>
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            className="hidden md:block text-center w-full max-w-4xl"
          >
            <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-600 mb-2 leading-relaxed font-light">
              Мы предлагаем профессиональные услуги такси во всех тарифах: 
              <span className="font-medium"> Эконом</span>, 
              <span className="font-medium"> Комфорт</span>, 
              <span className="font-medium"> Комфорт+</span>, 
              <span className="font-medium"> Бизнес</span>, 
              <span className="font-medium"> Премьер</span>, 
              <span className="font-medium"> Элит</span>, 
              <span className="font-medium"> Минивэн</span>.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
              Мы создаем премиальный сервис перевозок с удобными, статусными и незабываемыми поездками.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="md:hidden max-w-xs mx-auto"
          >
            <motion.p variants={itemVariants} className="text-sm text-gray-600 mb-2 leading-snug">
              Услуги такси всех классов: 
              <span className="font-medium"> от Эконом до Элит</span>.
            </motion.p>
            <motion.p variants={itemVariants} className="text-sm text-gray-600 leading-snug">
              <span className="font-medium">Премиальный комфорт</span> в каждой поездке.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 w-full relative overflow-hidden">
        <div className="hidden md:flex w-full h-full justify-center items-center pb-6 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/fleet-desktop.jpg')" }}
          />
          
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative z-10 w-full max-w-[1800px] mx-auto grid grid-cols-5 gap-4 2xl:gap-8 px-4 2xl:px-8"
          >
            {cardData.map((card, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={cardVariants}
                className="w-full h-[26rem] perspective-1200 cursor-pointer"
                style={{ 
                  perspective: "1200px",
                  transformStyle: "preserve-3d"
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${hoveredCard === index ? 'rotate-y-180' : ''}`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: hoveredCard === index ? "rotateY(180deg)" : "rotateY(0deg)",
                    willChange: "transform"
                  }}
                >
                  <div 
                    className="absolute w-full h-full bg-white/60 backdrop-blur-md rounded-3xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  />

                  <div 
                    className="absolute w-full h-full border border-black/20 rounded-3xl flex flex-col items-center shadow-xl p-6 justify-center text-center ring-1 ring-black/10"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundColor: 'transparent'
                    }}
                  >
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="font-bold text-xl mb-4 text-gray-800"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.4 + index * 0.1,
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      {React.cloneElement(card.icon, { className: "text-yellow-500 text-5xl mb-4" })}
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-base font-semibold mt-2 bg-yellow-400/90 px-4 py-1.5 rounded-full text-gray-800 backdrop-blur-sm ring-1 ring-black/10"
                    >
                      {card.price}
                    </motion.p>
                  </div>

                  <div 
                    className="absolute w-full h-full bg-gray-800/70 backdrop-blur-md rounded-3xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  />

                  <div 
                    className="absolute w-full h-full border border-black/30 rounded-3xl flex flex-col items-center shadow-xl p-6 justify-center text-center ring-1 ring-black/20"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundColor: 'transparent'
                    }}
                  >
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-200 text-sm leading-relaxed px-2"
                    >
                      {card.backText}
                    </motion.p>
                    <motion.button
                      onClick={() => setSelectedService(card.title)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.4,
                        type: "spring"
                      }}
                      className="mt-4 bg-yellow-400/90 text-gray-800 px-4 py-1.5 rounded-full font-medium text-xs backdrop-blur-sm ring-1 ring-black/10 hover:bg-yellow-500 transition-colors"
                    >
                      Подробнее
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Оптимизированная мобильная версия rdrdrd*/}
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory h-full gap-3 px-4 pt-6 pb-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full absolute inset-0 bg-cover bg-center z-0"
            style={{ 
              backgroundImage: "url('/fleet-mobile.jpg')",
              backgroundPosition: "center center"
            }}
          />
          
          <div className="relative z-10 flex w-full h-full items-center pl-4">
            {cardData.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                custom={idx}
                className="flex-none w-64 h-[18rem] rounded-2xl border border-black/20 shadow-lg snap-center p-4 mx-1.5 flex flex-col ring-1 ring-black/10 relative"
              >
                <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-2xl" />
                <div className="flex-1 flex flex-col items-center justify-start text-center px-2 relative z-10">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="font-bold text-2sm text-gray-800 mb-4"
                  >
                    {card.title}
                  </motion.h3>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.4 + idx * 0.1,
                      type: "spring",
                      stiffness: 150
                    }}
                    className="my-1"
                  >
                    {React.cloneElement(card.icon, { className: "text-yellow-500 text-4xl" })}
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="text-xs font-semibold bg-yellow-400/90 px-2 py-1 mt-4 mb-4 rounded-full text-gray-800 backdrop-blur-sm ring-1 ring-black/10 mb-2"
                  >
                    {card.price}
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="text-xs text-gray-600 leading-tight line-clamp-4 mb-1"
                  >
                    {card.backText}
                  </motion.p>
                  
                  <motion.button
                    onClick={() => setSelectedService(card.title)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="bg-yellow-400/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ring-1 ring-black/10 hover:bg-yellow-500 transition-colors w-full mt-4"
                  >
                    Подробнее
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => {
                setSelectedService(null);
                setSubmitError("");
              }}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Заявка на услугу</h3>
            
            {submitError && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-lg">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phone">
                  Номер телефона
                </label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyDown={handlePhoneKeyDown}
                  placeholder="+7 (___) ___ __-__"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="service">
                  Услуга
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                >
                  {cardData.map((service, index) => (
                    <option key={index} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="message">
                  Дополнительная информация
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                disabled={isSubmitted}
              >
                <FaPhone />
                {isSubmitted ? "Отправлено!" : "Позвоните мне :)"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FleetSection;