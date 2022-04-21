const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
	name: {
		type: String,
		unique: false,
		required: true
	},
	jpname: {
		type: String,
		unique: false,
		required: false
	},
	image: {
		type: String,
		unique: false,
		required: true
	},
	platform: {
		type: String,
		unique: false,
		required: true
	},
	region: {
		type: String,
		unique: false,
		required: true
	},
	condition: {
		type: String,
		unique: false,
		required: false
	},
	kit: {
		type: [ String ],
		unique: false,
		required: false
	},
	note: {
		type: String,
		unique: false,
		required: false
	}
}, {
	timestamps: true
});

module.exports = model('Game', GameSchema);
