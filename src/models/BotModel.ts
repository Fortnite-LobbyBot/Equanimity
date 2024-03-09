import { Schema, model } from 'mongoose';

const schema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
		index: true
	},
	parent: { type: Schema.Types.ObjectId, ref: 'category', index: true },
	nickname: { type: String, required: true, trim: true },
	type: { type: Number, required: true, index: true },
	email: {
		type: String,
		required: true,
		unique: true,
		dropDups: true,
		lowercase: true
	},
	deviceAuth: {
		accountId: {
			type: String,
			required: true,
			unique: true,
			dropDups: true,
			lowercase: true,
			trim: true
		},
		deviceId: { type: String, required: true, lowercase: true, trim: true },
		secret: { type: String, required: true, trim: true }
	}
});

schema.set('toJSON', {
	transform: (_, returnedObject) => {
		returnedObject['id'] = returnedObject['_id'];
		delete returnedObject['_id'];
		delete returnedObject['__v'];
	}
});

export const botModel = model('bot', schema);
