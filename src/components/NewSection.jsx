import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const renderTextWithLinks = (text) => {
  if (!text) return null;
  
  const textWithoutHashtags = text.replace(/#[а-яА-ЯёЁa-zA-Z0-9_]+/g, '');
  
  return textWithoutHashtags.split('\n').map((paragraph, i) => {
    const parts = [];
    let remaining = paragraph;
    
    while (remaining.length > 0) {
      const urlMatch = remaining.match(/(https?:\/\/[^\s]+)/);
      
      if (urlMatch) {
        const before = remaining.slice(0, urlMatch.index);
        if (before) parts.push(before);
        
        parts.push(
          <a 
            key={`link-${i}-${parts.length}`}
            href={urlMatch[0]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {urlMatch[0]}
          </a>
        );
        
        remaining = remaining.slice(urlMatch.index + urlMatch[0].length);
      } else {
        parts.push(remaining);
        remaining = '';
      }
    }
    
    return <p key={`p-${i}`} className="mb-2 break-words">{parts}</p>;
  });
};

const NewSection = () => {
  const [news, setNews] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bodyRef = useRef(null);
  const modalRef = useRef(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://centrtaxibackend-production.up.railway.app/api/news');
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.response?.items) {
        throw new Error("Некорректный формат данных");
      }
      
      setNews(data.response.items);
    } catch (err) {
      console.error("Ошибка загрузки новостей:", err);
      setError("Не удалось загрузить новости. Пожалуйста, попробуйте позже.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bodyRef.current = document.body;
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeModal !== null) {
      bodyRef.current.style.overflow = 'hidden';
    } else {
      bodyRef.current.style.overflow = 'auto';
    }
  }, [activeModal]);

  const openModal = (index) => setActiveModal(index);
  const closeModal = () => setActiveModal(null);

  const renderAttachment = (attachment) => {
    if (!attachment) return null;
    
    switch(attachment.type) {
      case 'photo':
        return (
          <img
            src={attachment.photo.sizes[attachment.photo.sizes.length - 1].url}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
            onError={(e) => e.target.src = "https://placehold.co/1200x600?text=Фото+новости"}
          />
        );
      case 'video':
        return (
          <div className="relative pt-[56.25%]">
            <iframe
              src={`https://vk.com/video${attachment.video.owner_id}_${attachment.video.id}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
              title="Видео"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: Math.min(3, news.length),
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-100 font-sans pt-14 pb-8 md:pt-24 md:pb-12">
      <div className="w-full py-2 text-center bg-gray-900 text-white text-lg md:text-3xl font-bold fixed top-16 left-0 z-20 h-12 flex items-center justify-center">
        Новости
      </div>

      <div className="w-full h-full flex items-center justify-center px-4 pt-16 pb-12 md:pt-32 md:pb-16">
        <div className="w-full max-w-screen-xl relative">
          {loading && (
            <div className="text-center text-yellow-600 mb-4">
              Загрузка новостей...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 mb-4">
              {error}
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="text-center text-gray-500 mb-4">
              Новостей пока нет
            </div>
          )}

          {news.length > 0 && (
            <div className="py-2">
              <Slider {...settings}>
                {news.map((item, index) => (
                  <div key={item.id || index} className="px-2 h-full">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden p-4 flex flex-col h-[400px] md:h-[500px] mb-4 md:mb-8">
                      {item.attachments?.[0] && (
                        <div className="mb-2 flex-shrink-0 h-[180px] md:h-[280px]">
                          {renderAttachment(item.attachments[0])}
                        </div>
                      )}
                      
                      <div className="mt-1 text-xs text-gray-500">
                        {new Date(item.date * 1000).toLocaleDateString("ru-RU", {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                      
                      <div className="mt-2 text-base line-clamp-4 text-gray-800 flex-grow">
                        {renderTextWithLinks(item.text)}
                      </div>
                      
                      <button
                        className="mt-3 self-start px-4 py-2 text-sm font-medium rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition-colors"
                        onClick={() => openModal(index)}
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>

      {activeModal !== null && news[activeModal] && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20 overflow-y-auto"
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            className="bg-white max-w-2xl w-full rounded-xl p-6 relative my-8 max-h-[80vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <button
              className="absolute top-4 right-4 bg-yellow-400 hover:bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center z-50 shadow-lg border-2 border-white transform hover:scale-110 transition-transform"
              onClick={closeModal}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-800"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
            
            <div className="pr-2">
              {news[activeModal].attachments?.[0] && (
                <div className="mb-4 h-[200px] md:h-[350px]">
                  {renderAttachment(news[activeModal].attachments[0])}
                </div>
              )}
              
              <div className="text-sm text-gray-500 mb-2">
                {new Date(news[activeModal].date * 1000).toLocaleDateString("ru-RU", {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              
              <div className="text-base text-gray-700 whitespace-pre-line break-words">
                {renderTextWithLinks(news[activeModal].text)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewSection;