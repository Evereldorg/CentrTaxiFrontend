import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaTimes, FaHeadset, FaClock, FaCheck, FaCarAlt, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import PrivacyModal from './PrivacyModal';

const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN || '7668503665:AAFw9X2UWS6bvZzU48HVuTDRmJbji-mFbeE';
const TELEGRAM_CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID || '-4774718414';

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => { 
    if (inView) controls.start('visible'); 
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120
      }
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');
    
    if (digits.length === 0) {
      setPhone('');
      return;
    }
    
    if (digits.length > 0 && !input.startsWith('+7') && !input.startsWith('7')) {
      const newDigits = '7' + digits;
      formatPhoneNumber(newDigits);
      return;
    }
    
    formatPhoneNumber(digits);
  };

  const formatPhoneNumber = (digits) => {
    let formatted = '+7 ';
    
    if (digits.length > 1) {
      formatted += `(${digits.slice(1, 4)}`;
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

  const validatePhone = (phoneNumber) => {
    const digits = phoneNumber.replace(/\D/g, '');
    return digits.length >= 11;
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

    if (!phone) {
      setSubmitError("Пожалуйста, введите номер телефона");
      return;
    }

    if (!validatePhone(phone)) {
      setSubmitError("Пожалуйста, введите корректный номер телефона");
      return;
    }

    const text = `
<b>Запрос на консультацию</b>
📞 <b>Телефон:</b> ${phone}
⏱ <b>Время:</b> ${new Date().toLocaleString()}
    `;
    
    try {
      await sendToTelegram(text);
      setIsSubmitted(true);
      setTimeout(() => {
        setPhone("");
        setIsSubmitted(false);
        setShowMobileForm(false);
      }, 3000);
    } catch (error) {
      console.error('Ошибка:', error);
      setSubmitError("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  };

  return (
    <section 
      id="hero"
      className="relative w-full min-h-[calc(100vh-140px)] sm:min-h-screen snap-start"
      ref={ref}
      style={{ 
        paddingTop: '80px',
        marginTop: '60px'
      }}
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          src="/taxi-background.jpg"
          alt="Такси на дороге" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Контентный блок */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start"
          >
            {/* Текстовый блок */}
            <div className="lg:w-1/2 text-white px-2 sm:px-0">
              <motion.h1 
                variants={itemVariants}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 leading-tight"
              >
                Станьте водителем Яндекс Такси с максимальной выгодой!
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg mb-4 sm:mb-8 text-gray-200 leading-relaxed"
              >
                Официальное подключение с персональным менеджером и самой выгодной комиссией в Санкт-Петербурге
              </motion.p>

              <motion.ul 
                variants={containerVariants}
                className="space-y-3 sm:space-y-4 mb-6 sm:mb-10"
              >
                {[
                  { text: "Комиссия от 5% с гарантией лучшей ставки", icon: <FaMoneyBillWave className="text-yellow-400" /> },
                  { text: "Персональный менеджер 24/7", icon: <FaHeadset className="text-yellow-400" /> },
                  { text: "Помощь в подборе и оформлении авто", icon: <FaCarAlt className="text-yellow-400" /> },
                  { text: "Обучение и поддержка для новичков", icon: <FaCheck className="text-yellow-400" /> },
                  { text: "Реферальная программа до 50 000₽", icon: <FaUsers className="text-yellow-400" /> },
                  { text: "Моментальные выплаты без задержек", icon: <FaClock className="text-yellow-400" /> }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base text-gray-100">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col xs:flex-row gap-3 sm:gap-4"
              >
                <button 
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 shadow-lg text-xs sm:text-sm md:text-base"
                >
                  Подключиться
                </button>
              </motion.div>
            </div>

            {/* Блок с формой обратной связи (только для ПК) */}
            <div className="hidden sm:block lg:w-[40%] self-stretch">
              <motion.div 
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 h-auto"
                style={{ minHeight: '500px' }}
              >
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Получите персональные условия
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Оставьте телефон — мы перезвоним в течение 15 минут
                  </p>
                  
                  <div className="bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full inline-block mb-6">
                    Бесплатная консультация
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-yellow-500 mt-0.5 text-base" />
                      <span className="text-gray-700 text-sm">Минимальная комиссия от 5% с гарантией лучшей ставки</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-yellow-500 mt-0.5 text-base" />
                      <span className="text-gray-700 text-sm">Полная помощь с оформлением всех документов</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-yellow-500 mt-0.5 text-base" />
                      <span className="text-gray-700 text-sm">Персональный менеджер для решения любых вопросов</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-yellow-500 mt-0.5 text-base" />
                      <span className="text-gray-700 text-sm">Обучение работе с приложением для новичков</span>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="mb-6 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-auto">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                      Ваш номер телефона *
                    </label>
                    <input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (___) ___ __-__"
                      className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-base transition-colors"
                    disabled={isSubmitted}
                  >
                    <FaPhone className="text-lg" />
                    {isSubmitted ? "Спасибо!" : "Получить консультацию"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-xs">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <button 
                      type="button" 
                      className="text-yellow-600 hover:underline"
                      onClick={() => setShowPrivacyModal(true)}
                    >
                      политикой конфиденциальности
                    </button>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Плавающая кнопка для мобильной формы */}
      <div className="sm:hidden fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setShowMobileForm(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-4 shadow-lg transition-all transform hover:scale-110 relative border-2 border-black"
          style={{ 
            boxShadow: '0 4px 15px rgba(234, 179, 8, 0.6)'
          }}
        >
          <FaPhone className="text-xl" />
        </button>
      </div>

      {/* Мобильная форма */}
      {showMobileForm && (
        <div className="sm:hidden fixed inset-0 z-[60] pt-20 pb-6 px-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-auto p-5 relative animate-fade-in-up">
            <button 
              onClick={() => setShowMobileForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Получите персональные условия</h3>
              <p className="text-gray-600 text-xs mb-3">
                Оставьте телефон — мы перезвоним в течение 15 минут
              </p>
              
              <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-block">
                Бесплатная консультация
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-2">
                <FaCheck className="text-yellow-500 mt-0.5 text-xs" />
                <span className="text-gray-700 text-xs">Как получить минимальную комиссию</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheck className="text-yellow-500 mt-0.5 text-xs" />
                <span className="text-gray-700 text-xs">Какие документы нужны</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheck className="text-yellow-500 mt-0.5 text-xs" />
                <span className="text-gray-700 text-xs">Как увеличить заработок</span>
              </div>
            </div>

            {submitError && (
              <div className="mb-3 p-2 bg-red-100 text-red-700 text-xs rounded-lg">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 text-xs font-medium mb-1" htmlFor="mobile-phone">
                  Ваш номер телефона *
                </label>
                <input
                  id="mobile-phone"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___ __-__"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                disabled={isSubmitted}
              >
                <FaPhone />
                {isSubmitted ? "Спасибо! Ждите звонка" : "Позвоните мне"}
              </button>
            </form>

            <div className="mt-3 text-center">
              <p className="text-gray-500 text-xxs">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <button 
                  type="button" 
                  className="text-yellow-600 hover:underline"
                  onClick={() => {
                    setShowMobileForm(false);
                    setShowPrivacyModal(true);
                  }}
                >
                  политикой конфиденциальности
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно политики конфиденциальности */}
      <PrivacyModal 
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </section>
  );
};

export default HeroSection;