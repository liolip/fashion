// const mongoose = require('mongoose')

// const personSchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	description: { type: String },
// 	parentId: { type: Number, required: true },
// 	level: { type: Number, required: true },
// })

// module.exports = mongoose.model('Person', personSchema)

const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person',
		required: false, // Разрешаем отсутствие для корневых элементов
	},
	level: {
		type: Number,
		required: true,
		default: 0, // Значение по умолчанию
	},
})

module.exports = mongoose.model('Person', personSchema)
