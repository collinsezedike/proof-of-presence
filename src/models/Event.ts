import mongoose from "mongoose";

export interface Events extends mongoose.Document {
	name: string;
	datetime: Date;
	community: mongoose.Schema.Types.ObjectId;
}

const EventSchema = new mongoose.Schema<Events>({
	name: {
		type: String,
		required: [true, "Please provide a name for this event."],
		maxlength: [120, "Event name cannot be more than 120 characters"],
	},
	datetime: {
		type: Date,
		required: [true, "Please provide the event date and time"],
	},
	community: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Community",
		required: [true, "Please provide the Event account"],
	},
});

export default mongoose.models.Event ||
	mongoose.model<Events>("Event", EventSchema);
