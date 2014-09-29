'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Alert Schema
 */
var AlertSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Alert name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Alert', AlertSchema);