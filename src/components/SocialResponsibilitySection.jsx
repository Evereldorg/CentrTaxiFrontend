import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaComments, FaFileAlt, FaUserAlt, FaMoneyBillWave, FaCarSide } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SocialResponsibilitySection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const benefits = [
    { 
      id: 1, 
      icon: <FaComments size={17} className="text-yellow-600" />, 
      title: "Чат-поддержка 24/7", 
      description: "Всё можно решить без звонков" 
    },
    { 
      id: 2, 
      icon: <FaFileAlt size={17} className="text-yellow-600" />, 
      title: "Простая регистрация", 
      description: "Помощь с документами" 
    },
    { 
      id: 3, 
      icon: <FaUserAlt size={17} className="text-yellow-600" />, 
      title: "Индивидуальный подход", 
      description: "Понимание ваших особенностей" 
    },
    { 
      id: 4, 
      icon: <FaMoneyBillWave size={17} className="text-yellow-600" />, 
      title: "Прозрачные выплаты", 
      description: "Стабильный доход" 
    },
    { 
      id: 5, 
      icon: <FaCarSide size={17} className="text-yellow-600" />, 
      title: "Специальные значки", 
      description: "«Глухой водитель»" 
    },
  ];

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "10px",
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? 'bg-yellow-500' : 'bg-gray-300'}`} />
    ),
    appendDots: dots => (
      <div className="mt-1.5">
        <ul className="flex justify-center gap-1.5">{dots}</ul>
      </div>
    )
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }
  };

  return (
    <section 
      id="social"
      ref={ref}
      className="relative w-full min-h-screen snap-start bg-gradient-to-br from-gray-50 to-white"
      style={{ paddingTop: '80px' }}
    >
      <div className="container mx-auto px-3.5 sm:px-6 py-5 md:py-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-5 md:mb-10"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-[22px] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1.5 md:mb-2"
          >
            Наша социальная ответственность
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-[13px] md:text-lg lg:text-xl text-yellow-500 font-medium"
          >
            Мы слышим тех, кто не слышит. Мы рядом.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-5 md:gap-8">
          <motion.div
            className="hidden lg:flex flex-col lg:w-1/2"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="mt-[100px] space-y-4">
              <motion.p 
                variants={itemVariants}
                className="text-lg lg:text-xl text-gray-700 leading-relaxed"
              >
                В рамках нашей миссии по развитию доступной и справедливой среды для всех водителей, мы с гордостью поддерживаем глухих и слабослышащих водителей.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-lg lg:text-xl text-gray-700 leading-relaxed"
              >
                В Центре подключения водителей мы верим, что возможности не зависят от слуха. Мы с уважением относимся к глухим и слабослышащим водителям, которые каждый день помогают людям.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-col gap-4 w-1/2"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                custom={index}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-start gap-4"
              >
                <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg mb-1">{benefit.title}</h4>
                  <p className="text-gray-600 text-base">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="lg:hidden">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={containerVariants}
              className="space-y-2.5 mb-3.5"
            >
              <motion.p 
                variants={itemVariants}
                className="text-[12.5px] text-gray-700 leading-snug"
              >
                В рамках нашей миссии по развитию доступной и справедливой среды для всех водителей, мы с гордостью поддерживаем глухих и слабослышащих водителей.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-[12.5px] text-gray-700 leading-snug"
              >
                В Центре подключения водителей мы верим, что возможности не зависят от слуха.
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mb-3.5"
            >
              <Slider {...sliderSettings}>
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="px-0.5 outline-none">
                    <div className="bg-white p-3.5 rounded-lg shadow-sm h-[140px] w-full flex flex-col justify-center items-center border border-gray-200">
                      <div className="bg-yellow-100 w-9 h-9 p-1.5 rounded-full mb-2.5 flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <h3 className="text-[13px] font-semibold text-center mb-1 text-gray-800">
                        {benefit.title}
                      </h3>
                      <p className="text-[11.5px] text-gray-600 text-center px-1 leading-tight">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center mt-2.5"
            >
              <p className="text-[12.5px] text-gray-700 italic mb-1.5">
                Это не просто работа — это уважение и поддержка.
              </p>
              <p className="text-[12.5px] text-gray-700 font-medium mb-2.5">
                Если вы глухой или слабослышащий водитель — вы по адресу.
              </p>
              <button 
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1.5 px-5 rounded-full text-[12.5px] shadow-xs transition-colors"
              >
                Присоединяйтесь
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="hidden lg:block text-center mt-8"
        >
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-700 italic mb-3"
          >
            Это не просто работа — это уважение и поддержка.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 font-medium mb-4"
          >
            Если вы глухой или слабослышащий водитель — вы по адресу.
          </motion.p>
          <motion.div
            variants={itemVariants}
          >
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-8 rounded-full text-lg shadow-md"
            >
              Присоединяйтесь к нам
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialResponsibilitySection;