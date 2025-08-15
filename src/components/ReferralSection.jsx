import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaApple, FaGooglePlay, FaDownload, FaTimes, FaMobile, FaUserFriends, FaMoneyBillWave, FaGift } from 'react-icons/fa';

const ReferralSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeModal, setActiveModal] = useState(null);

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
        stiffness: 120,
        damping: 10
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  const referralBenefits = [
    {
      icon: <FaMoneyBillWave className="text-yellow-500 text-xl" />,
      title: "До 50 000₽ за друга",
      description: "Максимальный бонус за каждого приглашенного"
    },
    {
      icon: <FaUserFriends className="text-yellow-500 text-xl" />,
      title: "Пожизненный процент",
      description: "До 5% от заработка каждого приглашенного"
    },
    {
      icon: <FaGift className="text-yellow-500 text-xl" />,
      title: "Бонусы за активность",
      description: "Дополнительные вознаграждения"
    }
  ];

  const instructionContent = {
    instruction: {
      title: "Как пригласить друга и зарабатывать",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="font-medium">Пошаговая инструкция:</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Откройте приложение Taxi Jump</li>
              <li>Перейдите в раздел "Реферальная программа"</li>
              <li>Скопируйте вашу уникальную ссылку</li>
              <li>Поделитесь ссылкой с другом любым удобным способом</li>
              <li>После регистрации друга по вашей ссылке вы начнете получать бонусы</li>
            </ol>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold mb-2">Важные условия:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Друг должен пройти полную регистрацию</li>
              <li>Минимальное количество выполненных заказов - 50</li>
              <li>Бонусы начисляются после первой недели работы</li>
            </ul>
          </div>
        </div>
      )
    },
    download: {
      title: "Скачайте приложение для участия",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="https://apps.apple.com/ru/app/jump-taxi/id1504305203" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors border border-gray-200"
            >
              <FaApple className="text-gray-800 text-2xl" />
              <div>
                <p className="font-medium">App Store</p>
                <p className="text-xs text-gray-500">Для iPhone и iPad</p>
              </div>
            </a>
            
            <a 
              href="https://play.google.com/store/apps/details?id=cards.baranka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors border border-gray-200"
            >
              <FaGooglePlay className="text-green-600 text-2xl" />
              <div>
                <p className="font-medium">Google Play</p>
                <p className="text-xs text-gray-500">Для Android устройств</p>
              </div>
            </a>
            
            <a 
              href="https://appgallery.huawei.ru/app/C104339375" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors border border-gray-200"
            >
              <FaMobile className="text-red-500 text-2xl" />
              <div>
                <p className="font-medium">AppGallery</p>
                <p className="text-xs text-gray-500">Для Huawei/Honor</p>
              </div>
            </a>
            
            <a 
              href="https://store.nashstore.ru/store/628634c9fb3ed3501d52b7df" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors border border-gray-200"
            >
              <FaDownload className="text-blue-500 text-2xl" />
              <div>
                <p className="font-medium">NashStore</p>
                <p className="text-xs text-gray-500">Российский магазин</p>
              </div>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">Выберите подходящий магазин приложений для вашего устройства</p>
          </div>
        </div>
      )
    }
  };

  return (
    <section 
      id="referral"
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-white"
      ref={ref}
      style={{ 
        paddingTop: '120px',
        paddingBottom: '60px'
      }}
    >
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
          {/* Мобильная версия (без изменений) */}
          <div className="md:hidden">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={containerVariants}
              className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center"
            >
              <div className="lg:w-1/2 px-2 sm:px-0 z-10">
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900"
                >
                  Как пригласить друга и <span className="sm:text-white text-yellow-500">зарабатывать</span> на этом!
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600 leading-relaxed"
                >
                  Получайте процент от заработка привлеченных вами друзей
                </motion.p>

                <motion.div 
                  variants={containerVariants}
                  className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-10"
                >
                  {[
                    { 
                      text: "Подробная инструкция", 
                      type: "instruction",
                      icon: "📝"
                    },
                    { 
                      text: "Как скачать приложение", 
                      type: "download",
                      icon: "📲"
                    }
                  ].map((item, index) => (
                    <motion.button 
                      key={index}
                      variants={itemVariants}
                      className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-black rounded-xl p-4 transition-all cursor-pointer text-left shadow-sm"
                      onClick={() => openModal(item.type)}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium text-base">{item.text}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              <motion.div 
                variants={itemVariants}
                className="hidden sm:block lg:w-1/2 z-10 h-full"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg h-full border-2 border-black">
                  <img 
                    src="/taxi-background.jpg" 
                    alt="Реферальная программа" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Десктоп версия (поднятый контент) */}
          <div className="hidden md:block">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={containerVariants}
              className="flex flex-col items-center justify-center"
            >
              <motion.div 
                variants={itemVariants}
                className="text-center max-w-3xl mb-12"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Наша <span className="text-yellow-500">реферальная</span> программа
                </h1>
                <p className="text-xl text-gray-600">
                  Приглашайте друзей и получайте до <span className="font-bold text-yellow-600">50 000₽</span> за каждого
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
              >
                {/* Блок с преимуществами */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Ваши выгоды
                  </h2>
                  
                  <div className="space-y-6">
                    {referralBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-gray-700 text-sm">
                      *Бонусы начисляются после выполнения условий программы. Подробности уточняйте у менеджера.
                    </p>
                  </div>
                </motion.div>

                {/* Блок с инструкцией */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Как это работает
                  </h2>
                  
                  <div className="flex-grow space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-full flex-shrink-0">
                        <span className="text-gray-800 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Получите реферальную ссылку</h3>
                        <p className="text-gray-600">В личном кабинете водителя в приложении</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-full flex-shrink-0">
                        <span className="text-gray-800 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Поделитесь с друзьями</h3>
                        <p className="text-gray-600">Через соцсети, мессенджеры или лично</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-full flex-shrink-0">
                        <span className="text-gray-800 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Получайте бонусы</h3>
                        <p className="text-gray-600">После начала работы приглашенных друзей</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <button 
                      onClick={() => openModal('instruction')}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Подробная инструкция</span>
                    </button>
                    
                    <button 
                      onClick={() => openModal('download')}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                      <FaDownload />
                      <span>Скачать приложение</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: '120px' }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {instructionContent[activeModal].title}
                  </h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="text-gray-700">
                  {instructionContent[activeModal].content}
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Присоединяйтесь
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReferralSection;