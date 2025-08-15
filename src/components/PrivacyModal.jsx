import React from 'react';
import { FaTimes } from 'react-icons/fa';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-24 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Политика конфиденциальности</h2>
          <button 
            onClick={onClose}
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
            onClick={onClose}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;