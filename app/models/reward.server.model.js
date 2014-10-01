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
	stars: {
		type: Number,
		default: 0
	},
	awarded: {
		type: Boolean,
		default: false
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
