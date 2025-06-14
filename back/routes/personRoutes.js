const express = require('express')
const router = express.Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
	try {
		const { name, description, parentId } = req.body

		if (!name) {
			return res.status(400).json({ message: 'Имя обязательно' })
		}

		// Вычисляем уровень автоматически
		let level = 0
		if (parentId) {
			const parent = await Person.findById(parentId)
			if (parent) level = parent.level + 1
		}

		const newPerson = new Person({
			name,
			description,
			parentId: parentId || null,
			level, // Используем вычисленный уровень
		})

		await newPerson.save()
		res.status(201).json(newPerson)
	} catch (error) {
		console.error('Ошибка при сохранении:', error)
		res.status(500).json({ message: 'Ошибка сервера при сохранении' })
	}
})

module.exports = router
