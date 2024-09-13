import mongoose from "mongoose";

export interface Attendees extends mongoose.Document {
	name: string;
	wallet: string;
	event: mongoose.Schema.Types.ObjectId;
}

const AttendeeSchema = new mongoose.Schema<Attendees>({
	name: {
		type: String,
		required: [true, "Please provide a name for this Attendee."],
		maxlength: [120, "Attendee name cannot be more than 120 characters"],
	},
	wallet: {
		type: String,
		required: [true, "Please provide a wallet for this Attendee."],
		maxlength: [120, "Attendee wallet cannot be more than 120 characters"],
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Event",
		required: [true, "Please provide the Attendee event"],
	},
});

export default mongoose.models.Attendee ||
	mongoose.model<Attendees>("Attendee", AttendeeSchema);
