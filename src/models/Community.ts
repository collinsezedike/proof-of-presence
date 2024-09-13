import mongoose from "mongoose";
import { Keypair } from "@solana/web3.js";

export interface Communities extends mongoose.Document {
	name: string;
	admin: string;
	keypair: Keypair;
}

const CommunitySchema = new mongoose.Schema<Communities>({
	name: {
		type: String,
		required: [true, "Please provide a name for this community."],
		maxlength: [120, "Community name cannot be more than 120 characters"],
	},
	admin: {
		type: String,
		required: [true, "Please provide the community admin"],
		maxlength: [60, "Community admin cannot be more than 60 characters"],
	},
	keypair: {
		type: mongoose.Schema.Types.Mixed,
		required: [true, "Please provide the community account"],
	},
});

export default mongoose.models.Community ||
	mongoose.model<Communities>("Community", CommunitySchema);
