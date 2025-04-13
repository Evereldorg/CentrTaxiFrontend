# Шаг 1: Сборка приложения
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Шаг 2: Запуск через Nginx
FROM nginx:alpine
# Копируем собранный проект
COPY --from=builder /app/build /usr/share/nginx/html
# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf
# Заменяем переменную PORT во время сборки
RUN envsubst '\$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.tmp && \
    mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf
# Открываем порт (Railway сам подставит нужный)
EXPOSE $PORT
# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]