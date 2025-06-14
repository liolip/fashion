const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB подключен'))
	.catch(err => console.error('Ошибка MongoDB:', err))

app.use('/api/person', require('./routes/personRoutes'))

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
