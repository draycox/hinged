'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Reward Schema
 */
var RewardSchema = new Schema({
	name: {
		type: String,
		default:"",
		trim: true
	},
	description: {
		type: String,
		default:"",
		trim: true
	},
	stars: {
		type: Number,
		default: 0
	},
	redeemed:{
		type: Boolean
	},
	created: {
		type: Date,
		default: Date.now
	},
	task: {
		type: Schema.ObjectId,
		ref: 'Task'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Reward', RewardSchema);
