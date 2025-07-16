// const express = require('express')
// const router = express.Router()
// const Person = require('../models/Person')

// router.get('/', async (req, res) => {
// 	try {
// 		const people = await Person.find({})
// 		res.status(200).json(people)
// 	} catch (error) {
// 		console.error('Ошибка при получении людей:', error)
// 		res.status(500).json({ message: 'Ошибка сервера при получении данных' })
// 	}
// })

// router.post('/', async (req, res) => {
// 	try {
// 		const { name, description, parentId } = req.body

// 		if (!name) {
// 			return res.status(400).json({ message: 'Имя обязательно' })
// 		}

// 		// Вычисляем уровень автоматически
// 		let level = 0
// 		if (parentId) {
// 			const parent = await Person.findById(parentId)
// 			if (parent) level = parent.level + 1
// 		}

// 		const newPerson = new Person({
// 			name,
// 			description,
// 			parentId: parentId || null,
// 			level, // Используем вычисленный уровень
// 		})

// 		await newPerson.save()
// 		res.status(201).json(newPerson)
// 	} catch (error) {
// 		console.error('Ошибка при сохранении:', error)
// 		res.status(500).json({ message: 'Ошибка сервера при сохранении' })
// 	}
// })

// module.exports = router

// const express = require('express')
// const router = express.Router()
// const Person = require('../models/Person')
// const mongoose = require('mongoose')

// router.get('/', async (req, res) => {
// 	try {
// 		const people = await Person.find({})
// 		res.status(200).json(people)
// 	} catch (error) {
// 		console.error('Ошибка при получении людей:', error)
// 		res.status(500).json({ message: 'Ошибка сервера при получении данных' })
// 	}
// })

// // router.post('/', async (req, res) => {
// // 	try {
// // 		const { name, description, parentId } = req.body

// // 		if (!name) {
// // 			return res.status(400).json({ message: 'Имя обязательно' })
// // 		}

// // 		// Вычисляем уровень автоматически
// // 		let level = 0
// // 		if (parentId) {
// // 			const parent = await Person.findById(parentId)
// // 			if (parent) level = parent.level + 1
// // 		}

// // 		const newPerson = new Person({
// // 			name,
// // 			description,
// // 			parentId: parentId || null,
// // 			level, // Используем вычисленный уровень
// // 		})

// // 		await newPerson.save()
// // 		res.status(201).json(newPerson)
// // 	} catch (error) {
// // 		console.error('Ошибка при сохранении:', error)
// // 		res.status(500).json({ message: 'Ошибка сервера при сохранении' })
// // 	}
// // })

// router.post('/', async (req, res) => {
// 	try {
// 		const { name, description, parentId, level } = req.body
// 		console.log('Received data:', req.body) // Для отладки

// 		if (!name) {
// 			return res.status(400).json({ message: 'Имя обязательно' })
// 		}

// 		// Если parentId не передан, создаем корневой элемент
// 		let calculatedLevel = level || 0
// 		if (parentId) {
// 			const parent = await Person.findById(parentId)
// 			if (parent) calculatedLevel = parent.level + 1
// 		}

// 		const newPerson = new Person({
// 			name,
// 			description,
// 			parentId: parentId || null,
// 			level: calculatedLevel,
// 		})

// 		await newPerson.save()
// 		console.log('Saved person:', newPerson) // Для отладки
// 		res.status(201).json(newPerson)
// 	} catch (error) {
// 		console.error('Ошибка при сохранении:', error)
// 		res.status(500).json({
// 			message: 'Ошибка сервера при сохранении',
// 			error: error.message,
// 		})
// 	}
// })

// // Роут для удаления человека по ID
// router.delete('/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params

// 		// Проверяем валидность ID
// 		if (!mongoose.Types.ObjectId.isValid(id)) {
// 			return res.status(400).json({ message: 'Некорректный ID' })
// 		}

// 		// Удаляем человека и всех его потомков
// 		const deletePersonAndDescendants = async personId => {
// 			const person = await Person.findById(personId)
// 			if (!person) return

// 			// Находим всех потомков
// 			const descendants = await Person.find({ parentId: personId })

// 			// Рекурсивно удаляем потомков
// 			for (const descendant of descendants) {
// 				await deletePersonAndDescendants(descendant._id)
// 			}

// 			// Удаляем самого человека
// 			await Person.findByIdAndDelete(personId)
// 		}

// 		await deletePersonAndDescendants(id)

// 		res.status(200).json({ message: 'Человек и его потомки успешно удалены' })
// 	} catch (error) {
// 		console.error('Ошибка при удалении:', error)
// 		res.status(500).json({ message: 'Ошибка сервера при удалении' })
// 	}
// })

// module.exports = router
const express = require('express')
const router = express.Router()
const Person = require('../models/Person')
const mongoose = require('mongoose')

// Получить всех людей
router.get('/', async (req, res) => {
	try {
		const people = await Person.find({})
		res.status(200).json(people)
	} catch (error) {
		console.error('Ошибка при получении людей:', error)
		res.status(500).json({ message: 'Ошибка сервера при получении данных' })
	}
})

// Поиск по имени (GET /people/search?name=...)

router.get('/search', async (req, res) => {
	try {
		let nameQuery = req.query.name

		if (!nameQuery) {
			return res.status(400).json({ message: 'Параметр name обязателен' })
		}

		nameQuery = nameQuery.trim().normalize('NFC') // обрезаем пробелы и нормализуем юникод

		const regex = new RegExp(nameQuery, 'i')
		const people = await Person.find({ name: regex }).limit(10)

		console.log('Поиск по имени:', nameQuery, 'Найдено:', people.length)

		res.status(200).json(people)
	} catch (error) {
		console.error('Ошибка поиска:', error)
		res.status(500).json({ message: 'Ошибка сервера при поиске' })
	}
})

// router.get('/search', async (req, res) => {
// 	try {
// 		const nameQuery = req.query.name
// 		if (!nameQuery) {
// 			return res.status(400).json({ message: 'Параметр name обязателен' })
// 		}
// 		const regex = new RegExp(nameQuery, 'i') // регистронезависимый поиск
// 		const people = await Person.find({ name: regex }).limit(10)
// 		res.status(200).json(people)
// 	} catch (error) {
// 		console.error('Ошибка поиска:', error)
// 		res.status(500).json({ message: 'Ошибка сервера при поиске' })
// 	}
// })

// Создать нового человека
router.post('/', async (req, res) => {
	try {
		const { name, description, parentId, level } = req.body
		if (!name) {
			return res.status(400).json({ message: 'Имя обязательно' })
		}
		let calculatedLevel = level || 0
		if (parentId) {
			const parent = await Person.findById(parentId)
			if (parent) calculatedLevel = parent.level + 1
		}
		const newPerson = new Person({
			name,
			description,
			parentId: parentId || null,
			level: calculatedLevel,
		})
		await newPerson.save()
		res.status(201).json(newPerson)
	} catch (error) {
		console.error('Ошибка при сохранении:', error)
		res
			.status(500)
			.json({ message: 'Ошибка сервера при сохранении', error: error.message })
	}
})

// Удалить человека и его потомков
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: 'Некорректный ID' })
		}

		// Рекурсивное удаление потомков
		const deletePersonAndDescendants = async personId => {
			const person = await Person.findById(personId)
			if (!person) return
			const descendants = await Person.find({ parentId: personId })
			for (const descendant of descendants) {
				await deletePersonAndDescendants(descendant._id)
			}
			await Person.findByIdAndDelete(personId)
		}

		await deletePersonAndDescendants(id)

		res.status(200).json({ message: 'Человек и его потомки успешно удалены' })
	} catch (error) {
		console.error('Ошибка при удалении:', error)
		res.status(500).json({ message: 'Ошибка сервера при удалении' })
	}
})

module.exports = router
