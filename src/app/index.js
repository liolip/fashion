// index.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// Подключение к MongoDB
mongoose
	.connect('mongodb://127.0.0.1:27017/genealogy', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB подключен'))
	.catch(err => console.error('Ошибка MongoDB:', err))

// Роуты
const personRoutes = require('./routes/personRoutes')
app.use('/api/person', personRoutes)

// Запуск сервера
const PORT = 5000
app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
