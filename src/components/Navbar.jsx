import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Функция для обработки клика по пункту меню
  const handleMenuClick = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* Верхняя чёрная полоса */}
      <div className="bg-black text-white py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Левый блок - Лого + Название */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <img 
              src="/logo.png" 
              alt="Центр подключения водителей" 
              className="h-6 sm:h-8 w-auto flex-shrink-0" 
            />
            {/* Название компании */}
            <span className="text-[11px] xs:text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:text-base md:text-lg sm:whitespace-normal sm:overflow-visible">
              ЦЕНТР ПОДКЛЮЧЕНИЯ ВОДИТЕЛЕЙ
            </span>
          </div>
          
          {/* Центральный блок - Статус */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <span className="text-xs bg-yellow-500 text-black px-3 py-1 rounded font-bold">
              СЕРТИФИЦИРОВАННЫЙ ПАРТНЁР ЯНДЕКС ТАКСИ
            </span>
            <span className="text-xs font-medium">
              ▶ Работаем по всей РФ
            </span>
          </div>

          {/* Правый блок - Телефон */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a 
              href="tel:+79219930006" 
              className="text-[11px] xs:text-xs sm:text-sm font-bold hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              +7 921 993-00-06
            </a>
            <span className="text-[10px] xs:text-[0.65rem] sm:text-xs hidden xs:inline-block">
              обратная связь 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Нижняя белая полоса с меню */}
      <div className="bg-white py-2 sm:py-3 px-3 sm:px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Десктопное меню */}
          <div className="hidden md:flex space-x-6 w-full justify-between">
            {[
              { text: "ПОЧЕМУ МЫ", section: "hero" },
              { text: "ТАРИФЫ", section: "services" }, 
              { text: "УСЛУГИ / ИНФОРМАЦИЯ", section: "fleet" },
              { text: "АРЕНДА АВТО", section: "about" },
              { text: "РЕФЕРАЛЬНАЯ ПРОГРАММА", section: "referal" },
              { text: "КОНТАКТЫ", section: "contact" }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.section)}
                className="text-xs font-bold uppercase hover:text-yellow-500 transition-colors whitespace-nowrap"
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* Мобильное меню - кнопка бургера */}
          <button
            className="md:hidden text-gray-700 focus:outline-none flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Меню"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню - содержимое */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg px-4 py-3 border-t"
          >
            <div className="flex flex-col space-y-2">
              {[
                { text: "ПОЧЕМУ МЫ", section: "hero" },
                { text: "ТАРИФЫ", section: "services" }, 
                { text: "УСЛУГИ / ИНФОРМАЦИЯ", section: "fleet" },
                { text: "АРЕНДА АВТО", section: "about" },
                { text: "РЕФЕРАЛЬНАЯ ПРОГРАММА", section: "referal" },
                { text: "КОНТАКТЫ", section: "contact" }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item.section)}
                  className="text-sm font-bold uppercase py-1.5 hover:text-yellow-500 border-b border-gray-100 text-left"
                >
                  {item.text}
                </button>
              ))}
              <div className="pt-2">
                <a 
                  href="tel:+79219930006" 
                  className="text-sm font-bold text-yellow-600 hover:text-yellow-800"
                >
                  +7 921 993-00-06
                </a>
                <p className="text-xs text-gray-500">
                  обратная связь 24/7
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;