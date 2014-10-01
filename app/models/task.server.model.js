'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Task Schema
 */
var TaskSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Task name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true,
	},
	status: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	stars: {
		type: Number,
		default: 0
	},
	awarded:{
		type: Boolean
	},
	alert: [{
		type: Schema.ObjectId,
		ref: 'Alert'
	}],
	owner: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Task', TaskSchema);
