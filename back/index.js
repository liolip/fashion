import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/genealogy', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Схема и модель
const personSchema = new mongoose.Schema({
	name: String,
	description: String,
	parentId: String,
})

const Person = mongoose.model('Person', personSchema)

// Роут для создания нового человека
app.post('/api/people', async (req, res) => {
	try {
		const newPerson = new Person(req.body)
		await newPerson.save()
		res.status(201).json(newPerson)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при создании' })
	}
})

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
app.use(
	cors({
		origin: 'http://localhost:5173', // адрес вашего фронтенда
		credentials: true, // если нужны куки/авторизация
	})
)
