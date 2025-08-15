import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaCar, FaHandshake, FaClock, FaExchangeAlt, FaSearch, FaChevronDown } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RentSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const stepsRef = useRef(null);

  // Данные для шагов
  const steps = [
    { 
      id: 1, 
      icon: <FaSearch className="text-yellow-600" />, 
      title: "Сделать запрос", 
      description: "При подключении к парку сообщите о необходимости аренды" 
    },
    { 
      id: 2, 
      icon: <FaHandshake className="text-yellow-600" />, 
      title: "Получить предложения", 
      description: "Персональные варианты авто по вашим тарифам" 
    },
    { 
      id: 3, 
      icon: <FaCar className="text-yellow-600" />, 
      title: "Проверить авто", 
      description: "Проверка на соответствие требованиям" 
    },
    { 
      id: 4, 
      icon: <FaClock className="text-yellow-600" />, 
      title: "Заключить договор", 
      description: "Связь с владельцем для оформления" 
    },
    { 
      id: 5, 
      icon: <FaExchangeAlt className="text-yellow-600" />, 
      title: "Сменить авто", 
      description: "Поможем подобрать новый вариант" 
    },
  ];

  // Настройки слайдера для мобильной версии
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    centerPadding: "20px",
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-yellow-500 scale-125' : 'bg-gray-300'}`} />
    ),
    appendDots: dots => (
      <div className="mt-2">
        <ul className="flex justify-center gap-1">{dots}</ul>
      </div>
    )
  };

  // Анимации
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
    hidden: { y: 20, opacity: 0 },
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

  // Прокрутка к шагам
  const scrollToSteps = () => {
    stepsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section 
      id="аренда-авто"
      className="relative w-full min-h-screen snap-start bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ paddingTop: '80px' }}
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Десктоп версия */}
        <div className="hidden md:block">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-8 text-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              Аренда автомобиля для такси
            </motion.h2>
            
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.p 
                className="text-lg text-gray-700 leading-tight"
              >
                <span className="text-yellow-500 font-semibold">Бесплатный подбор</span> автомобилей от проверенных арендодателей
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-200"
            >
              <p className="text-gray-700 mb-4 text-base">
                <strong>Услуга по подбору и аренде автомобиля доступна только для водителей, работающих в нашем парке!</strong>
              </p>
              <p className="text-gray-600 mb-4 text-base">
                Эта услуга для наших водителей абсолютно бесплатна: мы не взимаем никаких дополнительных комиссий за подбор автомобиля.
              </p>
              <p className="text-gray-600 text-base">
                Мы сотрудничаем только с проверенными арендодателями и экономим ваше время, проверяя авто на соответствие выбранным тарифам.
              </p>
            </motion.div>

            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-gray-900 mb-6 text-center"
            >
              Как арендовать автомобиль через наш центр
            </motion.h3>
            
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.4
                  }
                }
              }}
              className="grid grid-cols-5 gap-3"
            >
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
                >
                  <div className="bg-yellow-100 w-12 h-12 p-3 rounded-full mb-3 mx-auto flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-center mb-1 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 text-center text-xs">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-6 bg-yellow-50 p-5 rounded-lg border border-yellow-200"
            >
              <p className="text-gray-700 italic text-sm mb-1">
                *В нашей базе всегда доступен широкий выбор автомобилей для работы в такси от экономики до премиальных тарифов.
              </p>
              <p className="text-gray-700 italic text-sm">
                Список автомобилей регулярно обновляется. Условия аренды и стоимость могут отличаться.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-sm transition-all text-base"
            >
              Подключиться
            </button>
          </motion.div>
        </div>

        {/* Мобильная версия */}
        <div className="md:hidden">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-4 px-2"
          >
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              Аренда автомобиля для такси
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              <span className="text-yellow-500 font-medium">Бесплатный подбор</span> от проверенных арендодателей
            </p>
          </motion.div>

          {/* Основной текст с плавным раскрытием */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-4 rounded-xl shadow-xs mb-4 mx-2 border border-gray-100"
          >
            <p className="text-gray-800 text-sm font-medium leading-snug">
              Услуга доступна только для водителей нашего парка!
            </p>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                  Эта услуга для наших водителей абсолютно бесплатна: мы не взимаем никаких дополнительных комиссий за подбор автомобиля.
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Мы сотрудничаем только с проверенными арендодателями и экономим ваше время, проверяя авто на соответствие выбранным тарифам.
                </p>
              </div>
            </motion.div>

            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-yellow-500 text-xs font-medium mt-2 flex items-center justify-center w-full"
            >
              {isExpanded ? 'Скрыть подробности' : 'Показать подробности'}
              <FaChevronDown 
                className={`ml-1.5 h-3 w-3 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </motion.div>

          {/* Шаги аренды */}
          <div 
            ref={stepsRef}
            className="px-1 pb-16"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg font-semibold text-center mb-3 px-2"
            >
              Процесс аренды
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Slider {...sliderSettings}>
                {steps.map((step) => (
                  <div key={step.id} className="px-1 outline-none">
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="bg-white p-4 rounded-xl shadow-xs h-[160px] border border-gray-100 flex flex-col items-center justify-center"
                    >
                      <div className="bg-yellow-50 w-10 h-10 p-2 rounded-full mb-3 flex items-center justify-center shadow-inner">
                        {step.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-center mb-1 text-gray-800">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-xs text-center px-2 leading-tight">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>

          {/* Фиксированная кнопка подключения */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="fixed bottom-4 left-0 right-0 px-4 z-10"
          >
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-full shadow-md transition-colors text-sm"
            >
              Подключиться к парку
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RentSection;