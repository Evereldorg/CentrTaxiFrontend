import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaTelegram, FaTimes, FaVk } from 'react-icons/fa';

const ContactSection = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const benefits = [
    "Экономить на аренде и направлять эти средства на улучшение сервиса для наших водителей",
    "Работать быстрее и удобнее - все вопросы решаются дистанционно",
    "Следовать мировым трендам цифровизации услуг"
  ];

  const contacts = [
    {
      number: "+7 921 993-00-06", 
      role: "Алексей",
      telegram: "https://t.me/KMixali4"
    },
    {
      number: "+7 965 016 71 88",
      role: "Олег",
      telegram: "https://t.me/tutolog"
    }
  ];

  const socialLinks = [
    {
      name: "ВКонтакте",
      url: "https://vk.com/dccspb?from=groups",
      icon: <FaVk size={32} />,
      color: "text-blue-600"
    },
    {
      name: "Telegram-канал",
      url: "https://t.me/+qpZJmUZ0QcJjZTIy",
      icon: <FaTelegram size={32} />,
      color: "text-blue-500"
    }
  ];

  const handleCallClick = (number, index, isMobile = false) => {
    if (isMobile) {
      window.location.href = `tel:${number.replace(/\D/g, '')}`;
    } else {
      navigator.clipboard.writeText(number.replace(/\D/g, ''));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const openMessenger = (url) => {
    window.open(url, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8 
      } 
    }
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const viewportSettings = {
    once: true,
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  };

  return (
    <section 
      id="contact"
      className="w-full min-h-screen snap-start bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col pt-16"
    >
      {/* Мобильная версия (до 768px) */}
      <div className="md:hidden flex-1 w-full px-4 py-2 overflow-y-auto">
        <motion.div
          className="text-center mb-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInVariants}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-1">Связаться с нами</h2>
          <p className="text-gray-600 text-xs">
            <span className="text-yellow-500">Центр подключения</span> работает полностью онлайн.
          </p>
          <p className="text-gray-600 text-xs"><b>Это позволяет нам:</b></p>
        </motion.div>

        <motion.ul 
          className="mb-4 space-y-1 text-xs px-1"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={containerVariants}
        >
          {benefits.map((item, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              variants={itemVariants}
            >
              <span className="text-yellow-500 mr-1 mt-0.5">•</span>
              <span className="text-gray-700">{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div 
          className="space-y-2 mb-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={containerVariants}
        >
          {contacts.map((contact, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg shadow-xs p-2 border border-gray-200"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-gray-500 text-2xs">{contact.role}</span>
                <div className="flex gap-1">
                  <button onClick={() => openMessenger(contact.telegram)}>
                    <FaTelegram className="text-blue-500" size={20} />
                  </button>
                  <button onClick={() => openMessenger(`https://wa.me/${contact.number.replace(/\D/g, '')}`)}>
                    <FaWhatsapp className="text-green-500" size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{contact.number}</span>
                <button 
                  className="bg-yellow-400 text-gray-900 text-2xs py-0.5 px-2 rounded flex items-center"
                  onClick={() => handleCallClick(contact.number, index, true)}
                >
                  <FaPhoneAlt size={10} className="mr-0.5" />
                  <span>Позвонить</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-xs p-1 border border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={itemVariants}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-semibold text-gray-900 mb-1 text-sm text-center">Мы в соцсетях</h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center ${social.color}`}
                whileHover={{ y: -3 }}
              >
                <div className="mb-1">{React.cloneElement(social.icon, { size: 20 })}</div>
                <span className="text-black hover:text-yellow-500 transition-colors text-xs">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Версия для ноутбуков (768px-1279px) */}
      <div className="hidden md:block lg:hidden w-full px-5 py-4 flex-1 flex flex-col">
        <div className="container mx-auto max-w-3xl h-full flex flex-col">
          <motion.div 
            className="text-center mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Связаться с нами</h2>
            <p className="text-gray-600 text-sm">
              <span className="text-yellow-500 font-medium">Центр подключения водителей</span> работает полностью онлайн. Это позволяет нам:
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-3 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={containerVariants}
          >
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-xs p-3 border border-gray-200"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start">
                  <span className="text-yellow-500 font-bold mr-2 text-sm">{index + 1}.</span>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={containerVariants}
            transition={{ delay: 0.3 }}
          >
            {contacts.map((contact, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-xs p-3 border border-gray-200"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-gray-500 text-xs">{contact.role}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openMessenger(contact.telegram)}>
                      <FaTelegram className="text-blue-500" size={24} />
                    </button>
                    <button onClick={() => openMessenger(`https://wa.me/${contact.number.replace(/\D/g, '')}`)}>
                      <FaWhatsapp className="text-green-500" size={24} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-900">{contact.number}</span>
                  <button 
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs py-1 px-3 rounded flex items-center"
                    onClick={() => handleCallClick(contact.number, index)}
                  >
                    <FaPhoneAlt size={12} className="mr-1" />
                    {copiedIndex === index ? (
                      <span className="text-xs">Скопировано</span>
                    ) : (
                      <span>Позвонить</span>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-xs p-2 border border-gray-200 mt-auto mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={itemVariants}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -2 }}
          >
            <h3 className="font-semibold text-gray-900 mb-1 text-center">Мы в социальных сетях</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center ${social.color}`}
                  whileHover={{ y: -3 }}
                >
                  <div className="mb-1">{React.cloneElement(social.icon, { size: 24 })}</div>
                  <span className="text-black hover:text-yellow-500 transition-colors text-sm">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ПК версия (1280px+) */}
      <div className="hidden lg:block w-full px-8 py-8 flex-1 flex flex-col">
        <div className="container mx-auto max-w-5xl h-full flex flex-col">
          <motion.div 
            className="text-center mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInVariants}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Связаться с нами</h2>
            <p className="text-xl text-gray-600">
              <span className="text-yellow-500 font-medium">Центр подключения водителей</span> работает полностью онлайн. Это позволяет нам:
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={containerVariants}
          >
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-yellow-500 text-xl font-bold mb-2">{index + 1}.</div>
                <p className="text-gray-700">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInVariants}
          >
            <div className="relative inline-block">
              <p className="text-xl text-gray-600 relative z-10">
                Связаться с нами можно <span className="font-medium relative">во всех мессенджерах
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 rounded-full w-full origin-left"
                  variants={underlineVariants}
                  style={{ bottom: '-4px' }}
                /></span> по следующим номерам:
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6 mt-auto mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={containerVariants}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-3 border border-gray-200"
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{contact.role}</h3>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => openMessenger(contact.telegram)}>
                        <FaTelegram className="text-blue-500 hover:text-blue-600 transition-colors" size={30} />
                      </button>
                      <button onClick={() => openMessenger(`https://wa.me/${contact.number.replace(/\D/g, '')}`)}>
                        <FaWhatsapp className="text-green-500 hover:text-green-600 transition-colors" size={30} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{contact.number}</span>
                    <button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-3 rounded-lg flex items-center gap-2"
                      onClick={() => handleCallClick(contact.number, index)}
                    >
                      <FaPhoneAlt size={14} />
                      {copiedIndex === index ? (
                        <span className="text-sm">Скопировано</span>
                      ) : (
                        <span>Позвонить</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col"
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Мы в социальных сетях</h3>
              <div className="flex flex-col gap-6 flex-1 px-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-start gap-6 p-4 rounded-lg hover:bg-gray-50 transition-all`}
                    whileHover={{ 
                      y: -3,
                      backgroundColor: '#fef3c7'
                    }}
                  >
                    <div className={`${social.color} flex-shrink-0`}>
                      {social.icon}
                    </div>
                    <span className="text-black hover:text-yellow-500 transition-colors text-xl font-medium">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Футер для всех версий */}
      <footer className="bg-gray-800 text-white w-full py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="md:hidden">
            <div className="flex flex-col items-center text-center text-xs space-y-2">
              <p>© {new Date().getFullYear()} Центр подключения водителей</p>
              <div className="flex justify-center items-center space-x-2">
                <span>Все права защищены</span>
                <span>|</span>
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Политика конфиденциальности
                </button>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href="https://t.me/+qpZJmUZ0QcJjZTIy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 hover:text-yellow-400 transition-colors"
                >
                  <FaTelegram size={14} />
                  <span>Наш Telegram-канал</span>
                </a>
                <span>|</span>
                <a 
                  href="https://t.me/Evereldorg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Разработка сайтов
                </a>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-sm md:text-base">
              <p>© {new Date().getFullYear()} Центр подключения водителей</p>
              <div className="hidden md:block h-4 w-px bg-gray-500"></div>
              <p>Все права защищены</p>
              <div className="hidden md:block h-4 w-px bg-gray-500"></div>
              <button 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-yellow-400 transition-colors"
              >
                Политика конфиденциальности
              </button>
              <div className="hidden md:block h-4 w-px bg-gray-500"></div>
              <a 
                href="https://t.me/+qpZJmUZ0QcJjZTIy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
              >
                <FaTelegram size={18} />
                <span>Наш Telegram-канал</span>
              </a>
              <div className="hidden md:block h-4 w-px bg-gray-500"></div>
              <a 
                href="https://t.me/Evereldorg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors flex items-center gap-1"
              >
                <span>Разработка сайтов</span>
                <span className="text-yellow-400"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальное окно политики конфиденциальности */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-24 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Политика конфиденциальности</h2>
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6 text-sm">
              <h3 className="font-bold mb-2">1. Общие положения</h3>
              <p className="mb-4">
                Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Центром подключения водителей (далее – Оператор).
              </p>

              <h3 className="font-bold mb-2">2. Основные понятия</h3>
              <p className="mb-4">
                Оператор - Центр подключения водителей, осуществляющий обработку персональных данных.
                Персональные данные - любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).
              </p>

              <h3 className="font-bold mb-2">3. Обрабатываемые данные</h3>
              <p className="mb-4">
                Мы обрабатываем только те персональные данные, которые вы предоставляете нам при заполнении форм на сайте: номер телефона, имя (если указано). Данные используются исключительно для связи с вами по вопросам подключения к Яндекс Такси.
              </p>

              <h3 className="font-bold mb-2">4. Цели обработки данных</h3>
              <p className="mb-4">
                Ваши персональные данные используются для:
                <br />- Обратной связи и консультации по услугам
                <br />- Информирования о специальных предложениях
                <br />- Заключения договора при вашем согласии
              </p>

              <h3 className="font-bold mb-2">5. Правовые основания обработки</h3>
              <p className="mb-4">
                Обработка персональных данных осуществляется на основе согласия субъекта персональных данных на обработку его персональных данных.
              </p>

              <h3 className="font-bold mb-2">6. Безопасность данных</h3>
              <p className="mb-4">
                Мы принимаем необходимые организационные и технические меры для защиты ваших персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
              </p>

              <h3 className="font-bold mb-2">7. Контактная информация</h3>
              <p>
                По всем вопросам вы можете обратиться по телефону: +7 921 993-00-06 или электронной почте: info@taxi-center.ru
              </p>
            </div>
            
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;