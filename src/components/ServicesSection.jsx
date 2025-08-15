import React from 'react';
import { FaCalendarAlt, FaTag, FaCity, FaStar } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const tariffs = [
  {
    title: 'ПОСУТОЧНЫЙ',
    price: '80 руб./сутки',
    description: [
      'Действует во всех городах кроме:',
      'Москвы, СПб, Новосибирска',
      'Екатеринбурга, Казани',
      '',
      'Списания только в дни работы',
      'Автовыплаты - без комиссии'
    ],
    icon: <FaCalendarAlt className="text-5xl md:text-7xl text-black mx-auto" />,
    isPopular: true,
    bgColor: 'bg-yellow-300',
  },
  {
    title: 'ФИКСИРОВАННЫЙ',
    price: '7 руб./с заказа',
    description: [
      '7 рублей с каждого заказа',
      'Действует во всех городах кроме:',
      'Москвы, СПб, Новосибирска',
      'Екатеринбурга, Казани',
      '',
      'Не зависит от суммы заказа',
      'Автовыплаты - без комиссии'
    ],
    icon: <FaTag className="text-5xl md:text-7xl text-black mx-auto" />,
    bgColor: 'bg-yellow-300',
  },
  {
    title: 'КРУПНЫЕ ГОРОДА',
    price: '3% с заказа',
    description: [
      'Действует в городах:',
      'Москва, Санкт-Петербург',
      'Екатеринбург, Казань',
      '',
      '3% от суммы каждого заказа',
      'Помощь с документами',
      'Автовыплаты - без комиссии'
    ],
    icon: <FaCity className="text-5xl md:text-7xl text-black mx-auto" />,
    bgColor: 'bg-yellow-300',
  },
];

const ServicesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (titleInView) {
      titleControls.start("visible");
    }
  }, [controls, inView, titleControls, titleInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        ease: "easeOut"
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

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#111827",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      backgroundColor: "#000000"
    }
  };

  return (
    <section
      id="services"
      className="w-full flex flex-col items-center justify-start px-4 md:px-10 pt-24 md:pt-28 pb-10 bg-white text-black"
      ref={ref}
    >
      <motion.div
        ref={titleRef}
        initial="hidden"
        animate={titleControls}
        className="mb-4 md:mb-16 text-center"
      >
        <motion.h2 
          variants={titleVariants}
          className="text-3xl md:text-5xl font-bold relative pb-2"
        >
          Тарифы и условия
          <motion.span
            variants={underlineVariants}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1.5 bg-yellow-400 rounded-full w-2/5 origin-center"
            style={{ bottom: '-4px' }}
          />
        </motion.h2>
      </motion.div>

      {/* Desktop Version */}
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="hidden md:flex w-full max-w-7xl h-full items-stretch justify-between gap-6"
        style={{ minHeight: '65vh' }}
      >
        {tariffs.map((tariff, index) => (
          <div 
            key={index}
            className="relative group flex-1 min-w-0"
          >
            {tariff.isPopular && (
              <motion.div 
                className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                initial={{ scale: 0.8 }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <FaStar className="text-yellow-400 stroke-black stroke-[3px] text-4xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
                <span className="text-sm font-bold text-black bg-white px-3 py-1 rounded-full shadow">ХИТ</span>
              </motion.div>
            )}
            <motion.div
              className={`${tariff.bgColor} rounded-2xl flex flex-col justify-between p-6 text-center shadow-xl w-full border border-black/10 h-full`}
              style={{ 
                backfaceVisibility: 'hidden',
                minHeight: '500px'
              }}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <motion.h3
                    variants={itemVariants}
                    className="text-xl font-semibold mb-1"
                  >
                    Тариф
                  </motion.h3>
                  <motion.h4
                    variants={itemVariants}
                    className="text-2xl font-bold mb-2"
                  >
                    «{tariff.title}»
                  </motion.h4>
                  <motion.p
                    variants={itemVariants}
                    className="text-xl font-bold mb-4 text-black/80"
                  >
                    {tariff.price}
                  </motion.p>
                </div>
                <motion.div
                  variants={itemVariants}
                  className="mb-4 px-2"
                >
                  <div className="text-center space-y-1">
                    {tariff.description.map((line, i) => (
                      <p 
                        key={i} 
                        className={`text-base ${line === '' ? 'h-4' : ''} ${line.includes('Автовыплаты') ? 'font-semibold' : ''}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center mb-4"
                >
                  {tariff.icon}
                </motion.div>
                <motion.a
                  href="https://my.jump.taxi/autoregistration/form/c32803?referrer_code=14515641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black text-white px-4 py-2 rounded-full mx-auto w-full max-w-xs hover:shadow-lg transition-all text-sm md:text-base"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  style={{ backgroundColor: '#000000' }}
                >
                  Подключиться
                </motion.a>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Mobile Carousel */}
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="md:hidden w-full overflow-x-auto no-scrollbar flex gap-4 snap-x snap-mandatory px-2 pb-2"
      >
        <div className="flex gap-4">
          {tariffs.map((tariff, index) => (
            <motion.div
              key={index}
              className={`relative ${tariff.bgColor} rounded-2xl w-[85vw] p-3 flex-shrink-0 text-center shadow-lg snap-center flex flex-col justify-between`}
              style={{ minHeight: '380px' }}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
            >
              {tariff.isPopular && (
                <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                  <FaStar className="text-yellow-400 stroke-black stroke-[2px] text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" />
                  <span className="text-xs font-bold text-black bg-white px-2 py-0.5 rounded-full">ХИТ</span>
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between">
                <div className="mt-1">
                  <h3 className="text-sm font-semibold">
                    Тариф
                  </h3>
                  <h4 className="text-base font-bold mt-1">
                    «{tariff.title}»
                  </h4>
                  <p className="text-base font-bold mt-1 text-black/80">
                    {tariff.price}
                  </p>
                </div>
                <div className="my-1 px-1">
                  <div className="text-center space-y-0.5 text-xs leading-tight">
                    {tariff.description.map((line, i) => (
                      <p 
                        key={i} 
                        className={`${line === '' ? 'h-1' : ''} ${line.includes('Автовыплаты') ? 'font-semibold' : ''}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center my-1">
                  {tariff.icon}
                </div>
                <a
                  href="https://my.jump.taxi/autoregistration/form/c32803?referrer_code=14515641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black text-white px-3 py-1 rounded-full mx-auto w-full max-w-[140px] active:shadow-md transition-all text-xs mt-1"
                >
                  Подключиться
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;