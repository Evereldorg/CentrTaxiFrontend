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
COPY --from=builder /app/dist /usr/share/nginx/html
# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Открываем порт
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]