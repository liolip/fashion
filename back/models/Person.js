// const mongoose = require('mongoose')

// const personSchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	description: { type: String },
// 	parentId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: 'Person',
// 		required: false, // Разрешаем отсутствие для корневых элементов
// 	},
// 	level: {
// 		type: Number,
// 		required: true,
// 		default: 0, // Значение по умолчанию
// 	},
// })

// module.exports = mongoose.model('Person', personSchema)

// const mongoose = require('mongoose')

// const personSchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	description: { type: String },
// 	parentId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: 'Person',
// 		required: false, // Разрешаем null для корневых элементов
// 	},
// 	level: {
// 		type: Number,
// 		required: true,
// 		default: 0, // Значение по умолчанию
// 	},
// })

// module.exports = mongoose.model('Person', personSchema)
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person',
		required: false, // разрешаем null для корневых узлов
	},
	level: {
		type: Number,
		required: true,
		default: 0, // уровень по умолчанию
	},
})

module.exports = mongoose.model('Person', personSchema)
