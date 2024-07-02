# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

RUN npx prisma migrate deploy

RUN npx prisma generate

# Команда для запуска приложения в режиме разработки
CMD ["npm", "run", "dev"]

# Указываем порт
EXPOSE 5050