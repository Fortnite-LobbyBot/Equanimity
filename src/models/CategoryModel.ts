import {
	CategoryConfigPartyPrivacy,
	CategoryConfigSupportedPlatforms,
	CategoryConfigTriggerAction,
	CategoryConfigTriggerStringDetectionMethod,
	Locales
} from '@fnlb-project/shared/types';
import { Schema, model } from 'mongoose';

const schema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
		index: true
	},
	name: { type: String, required: true, trim: true },
	config: {
		replyLangs: { type: [String], enum: Object.values(Locales) },
		searchLangs: {
			type: [String],
			enum: Object.values(Locales)
		},
		platform: { type: [String], enum: Object.values(CategoryConfigSupportedPlatforms) },
		privacy: { type: String, enum: Object.values(CategoryConfigPartyPrivacy) },
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

		disableMatchmakingChecks: { type: [Boolean] },
		disableJoinMessages: { type: [Boolean] },

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
						enum: Object.values(CategoryConfigTriggerStringDetectionMethod)
					},
					actions: {
						type: [Number],
						enum: Object.values(CategoryConfigTriggerAction)
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
						enum: Object.values(CategoryConfigTriggerStringDetectionMethod)
					},
					actions: {
						type: [Number],
						enum: Object.values(CategoryConfigTriggerAction)
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
						enum: Object.values(CategoryConfigTriggerStringDetectionMethod)
					},
					actions: {
						type: [Number],
						enum: Object.values(CategoryConfigTriggerAction)
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
						enum: Object.values(CategoryConfigTriggerAction)
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
						enum: Object.values(CategoryConfigTriggerAction)
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
						enum: Object.values(CategoryConfigTriggerAction)
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

export const CategoryModel = model('category', schema);
