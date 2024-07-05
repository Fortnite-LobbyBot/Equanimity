import type { IDBUser } from '@fnlb-project/shared/types';
import { Model, Schema, model } from 'mongoose';

interface IUserMethods {
	comparePassword(password: string): boolean;
}

type UserModelType = Model<IDBUser, {}, IUserMethods>;

const schema = new Schema<IDBUser, UserModelType, IUserMethods>({
	token: {
		type: String,
		required: true,
		unique: true
	},
	username: { type: String, required: true, trim: true },
	email: {
		type: String,
		index: true,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: { type: String, required: true },
	apiToken: { type: String, required: true, unique: true, trim: true },
	connections: {
		discord: {
			id: {
				type: String,
				index: true,
				unique: true,
				sparse: true
			},
			username: {
				type: String
			}
		},
		epic: {
			id: {
				type: String,
				index: true,
				unique: true,
				sparse: true
			},
			username: { type: String }
		}
	}
});

schema.pre('save', async function (next) {
	const user = this as IDBUser;

	if (!this.isModified('password')) return next();

	try {
		user.password = await Bun.password.hash(user.password, {
			algorithm: 'argon2id',
			timeCost: parseInt(process.env['HASH_ROUNDS'] ?? '3')
		});

		return next();
	} catch (err: any) {
		return next(err);
	}
});

schema.method('comparePassword', async function (this: IDBUser, pass: string) {
	return Bun.password.verify(pass, this.password);
});

schema.set('toJSON', {
	transform: (_, returnedObject) => {
		returnedObject['id'] = returnedObject['_id'];
		delete returnedObject['_id'];
		delete returnedObject['__v'];
	}
});

export const UserModel = model<IDBUser, UserModelType>('user', schema);
