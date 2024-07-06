import { Schema, model } from 'mongoose';
import { SchemaUtil } from '../classes/SchemaUtil';

const schema = new Schema(
	{
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
	},
	{
		statics: {
			async verifyPassword(password: string, hash: string) {
				return Bun.password.verify(password, hash);
			},
			async findByToken(id: string, auth: string) {
				const targetUser = await this.findById(id);

				if (!targetUser?.token || targetUser.token !== auth) return null;

				return targetUser;
			},
			async findByAPIToken(id: string, auth: string) {
				const targetUser = await this.findById(id);

				if (!targetUser?.apiToken || targetUser.apiToken !== auth) return null;

				return targetUser;
			}
		}
	}
);

schema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		this.password = await Bun.password.hash(this.password, {
			algorithm:
				(process.env['SAVE_ACCOUNT_ALGORITHM'] as 'bcrypt' | 'argon2id' | 'argon2d' | 'argon2i' | undefined) ||
				'argon2id',
			timeCost: parseInt(process.env['SAVE_ACCOUNT_TIME_COST'] || '3'),
			cost: parseInt(process.env['SAVE_ACCOUNT_ALGORITHM_COST'] || '12')
		});

		return next();
	} catch (err: any) {
		return next(err);
	}
});

schema.set('toJSON', {
	transform: SchemaUtil.transformSchemaToJSON
});

export const UserModel = model('user', schema);
