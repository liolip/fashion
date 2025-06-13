console.log('🔁 server.js запускается...')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose
	.connect(
		'mongodb+srv://weelppak:GIKC0HLgPQJvmxsD@fashion.u8r5edh.mongodb.net/fashiondb?retryWrites=true&w=majority&appName=fashion',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('✅ Подключено к MongoDB'))
	.catch(err => console.error('❌ Ошибка подключения:', err))

const personSchema = new mongoose.Schema({
	name: String,
	description: String,
	imageUrl: String,
})

const Person = mongoose.model('Person', personSchema)

app.post('/api/person', async (req, res) => {
	try {
		const { name, description, imageUrl } = req.body
		const newPerson = new Person({ name, description, imageUrl })
		await newPerson.save()
		res.status(201).json(newPerson)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

app.get('/api/person', async (req, res) => {
	try {
		const people = await Person.find()
		res.json(people)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

const PORT = 5000
app.listen(PORT, () => {
	console.log(`🚀 Сервер работает на http://localhost:${PORT}`)
})
