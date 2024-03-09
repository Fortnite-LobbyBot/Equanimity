import { Schema, model } from 'mongoose';

enum SupportedLanguages {
	En = 'en',
	Es = 'es',
	De = 'de',
	Fr = 'fr',
	It = 'it',
	Pt = 'pt'
}

enum SupportedPlatforms {
	Win = 'WIN',
	Mac = 'MAC',
	Psn = 'PSN',
	Xbl = 'XBL',
	Swt = 'SWT',
	Ios = 'IOS',
	And = 'AND',
	Ps5 = 'PS5',
	Xsx = 'XSX'
}

enum PartyPrivacy {
	Public = 0,
	Private = 1
}

enum TriggerStringDetectionMethod {
	Equals = 0,
	Includes = 1,
	StartsWith = 2,
	EndsWith = 3
}

enum TriggerAction {
	ChatBan = 0,
	Kick = 1,
	Block = 2,
	RemoveFriend = 3,
	AddFriend = 4,
	Promote = 5,
	Copy = 6,
	Mimic = 7,
	Hide = 8,
	Show = 9,
	Blacklist = 10,
	Whitelist = 11
}

const schema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
		index: true
	},
	name: { type: String, required: true, trim: true },
	config: {
		replyLangs: { type: [String], enum: Object.values(SupportedLanguages) },
		searchLangs: {
			type: [String],
			enum: Object.values(SupportedLanguages)
		},
		platform: { type: [String], enum: Object.values(SupportedPlatforms) },
		privacy: { type: String, enum: Object.values(PartyPrivacy) },
		prefixes: { type: [String] },

		extraOwners: { type: [String] },
		admins: { type: [String] },
		whitelistUsers: { type: [String] },
		blacklistUsers: { type: [String] },
		excludedAutoAddFriends: { type: [String] },
		otherBots: { type: [String] },

		statusText: { type: [String] },
		statusInterval: { type: [Number] },

		level: { type: [Number] },
		bpLevel: { type: [Number] },

		inviteTimeout: { type: Number },

		maxBotsPerLobby: { type: Number },
		maxBotsPerLobbyWithOwner: { type: Number },
		maxBotsPerLobbyWithAdmin: { type: Number },
		maxBotsPerLobbyWithWhitelistUser: { type: Number },

		allowMatchmaking: { type: Boolean },
		acceptFriendRequests: { type: Boolean },
		sendFriendRequestOnJoinParty: { type: Boolean },
		sendFriendRequestOnMemberJoinParty: { type: Boolean },

		runCommandsWithoutPrefix: { type: Boolean },
		setCosmeticsWithoutCommands: { type: Boolean },

		usernameTriggers: {
			type: [
				{
					triggers: { type: [String] },
					detectionMethods: {
						type: [Number],
						enum: Object.values(TriggerStringDetectionMethod)
					},
					actions: {
						type: [Number],
						enum: Object.values(TriggerAction)
					},
					messages: { type: [String] }
				}
			]
		},

		messageContentTriggers: {
			type: [
				{
					triggers: { type: [String] },
					detectionMethods: {
						type: [Number],
						enum: Object.values(TriggerStringDetectionMethod)
					},
					actions: {
						type: [Number],
						enum: Object.values(TriggerAction)
					},
					messages: { type: [String] }
				}
			]
		},

		cosmeticTriggers: {
			type: [
				{
					triggers: { type: [String] },
					detectionMethods: {
						type: [Number],
						enum: Object.values(TriggerStringDetectionMethod)
					},
					actions: {
						type: [Number],
						enum: Object.values(TriggerAction)
					},
					messages: { type: [String] }
				}
			]
		},

		addFriendTrigger: {
			type: [
				{
					actions: {
						type: [Number],
						enum: Object.values(TriggerAction)
					},
					messages: { type: [String] }
				}
			]
		},

		memberJoinTrigger: {
			type: [
				{
					actions: {
						type: [Number],
						enum: Object.values(TriggerAction)
					},
					messages: { type: [String] }
				}
			]
		},

		changeCosmeticTrigger: {
			type: [
				{
					actions: {
						type: [Number],
						enum: Object.values(TriggerAction)
					},
					messages: { type: [String] }
				}
			]
		},

		onlyOwnerCommands: { type: [String] },
		onlyAdminCommands: { type: [String] },
		onlyWhitelistUsersCommands: { type: [String] },
		onlyFriendsCommands: { type: [String] },
		onlyPartyMembersCommands: { type: [String] },
		onlyWhisperCommands: { type: [String] },

		startOutfit: { type: [String] },
		startOutfitVariants: { type: [[[Number]]] },
		startBackpack: { type: [String] },
		startBackpackVariants: { type: [[[Number]]] },
		startPickaxe: { type: [String] },
		startPickaxeVariants: { type: [[[Number]]] },
		startBanner: { type: [String] },

		joinOutfit: { type: [String] },
		joinOutfitVariants: { type: [[[Number]]] },
		joinBackpack: { type: [String] },
		joinBackpackVariants: { type: [[[Number]]] },
		joinPickaxe: { type: [String] },
		joinPickaxeVariants: { type: [[[Number]]] },
		joinEmote: { type: [String] },
		joinEmoji: { type: [String] },
		joinBanner: { type: [String] },

		memberJoinOutfit: { type: [String] },
		memberJoinOutfitVariants: { type: [[[Number]]] },
		memberJoinBackpack: { type: [String] },
		memberJoinBackpackVariants: { type: [[[Number]]] },
		memberJoinPickaxe: { type: [String] },
		memberJoinPickaxeVariants: { type: [[[Number]]] },
		memberJoinEmote: { type: [String] },
		memberJoinEmoji: { type: [String] },
		memberJoinBanner: { type: [String] }
	}
});

schema.set('toJSON', {
	transform: (_, returnedObject) => {
		returnedObject['id'] = returnedObject['_id'];
		delete returnedObject['_id'];
		delete returnedObject['__v'];
	}
});

export const categoryModel = model('category', schema);
