import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FleetSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const faqData = [
    {
      question: "Как присоединиться к сервису?",
      answer: "Для присоединения заполните заявку на нашем сайте, пройдите проверку документов и обучение."
    },
    {
      question: "Какие основные требования к водителю?",
      answer: "Водительские права категории B, стаж вождения от 3 лет, отсутствие серьезных нарушений ПДД."
    },
    {
      question: "Какой автомобиль подойдет для работы?",
      answer: "Автомобили не старше 10 лет, в исправном состоянии, с кондиционером и объемом двигателя не менее 1.6 л."
    },
    {
      question: "Бонусы от сотрудничества с Центром подключения водителей",
      answer: "Повышенные тарифы в часы пик, бонусы за выполнение заказов, круглосуточная поддержка."
    },
    {
      question: "Если нет своего автомобиля",
      answer: "Мы предлагаем автомобили в аренду на выгодных условиях от нашего партнерского автопарка."
    }
  ];

  return (
    <section 
      id="faq" 
      className="bg-white pt-[120px] pb-6 md:pt-[180px] md:pb-12"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-12 text-center"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight md:text-3xl md:mb-6">
            Подключаем, помогаем, обучаем — всегда рядом!
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="hidden md:block flex-1">
            <div className="text-gray-600 text-lg leading-relaxed space-y-6 pr-8">
              <p>Мы современный парк с многоуровневой профессиональной поддержкой водителей и лояльным отношением к разным категориям водителей,</p>
              <p>Помощь в вопросах, консультации круглосуточно — входит в обслуживание, бесплатно!</p>
              <p>Обучение: прохождение тестов в премиальных тарифах ультима, прохождение видеоинтервью, консультации по работе в премиальных тарифах ультима, взаимодействие с агрегатором такси. Консультации по документам, разрешениям, консультации по ИП, самозанятости и ОСТОП.</p>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            <div className="text-gray-600 text-xs leading-relaxed space-y-2">
              <p>Мы современный парк с профессиональной поддержкой водителей.</p>
              <p>Помощь в вопросах, консультации круглосуточно – бесплатно!</p>
            </div>

            <div className="space-y-1">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-gray-200 pb-1"
                >
                  <button
                    className="w-full flex justify-between items-center text-left py-1.5"
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  >
                    <span className="font-medium text-xs text-gray-900 pr-2">
                      {item.question}
                    </span>
                    <span className="text-gray-500 text-base flex-shrink-0">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-1 text-gray-600 text-xs">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-md">
            <div className="space-y-6">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  <button
                    className="w-full flex justify-between items-center text-left group"
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  >
                    <span className="font-medium text-xl text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {item.question}
                    </span>
                    <span className="text-gray-500 text-2xl transform transition-transform duration-300">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden pt-3"
                    >
                      <div className="text-gray-600 text-lg">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;