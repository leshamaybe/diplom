# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /src

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Строим приложение
RUN npm run build

# Команда для запуска приложения
CMD ["npm", "run", "start"]

# Указываем порт
EXPOSE 3001