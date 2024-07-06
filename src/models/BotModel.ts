import { Schema, model } from 'mongoose';
import { SchemaUtil } from '../classes/SchemaUtil';

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
		lowercase: true
	},
	deviceAuth: {
		required: true,
		type: {
			accountId: {
				type: String,
				required: true,
				unique: true,
				lowercase: true,
				trim: true
			},
			deviceId: { type: String, required: true, lowercase: true, trim: true },
			secret: { type: String, required: true, trim: true }
		}
	}
});

schema.set('toJSON', {
	transform: SchemaUtil.transformSchemaToJSON
});

export const BotModel = model('bot', schema);
