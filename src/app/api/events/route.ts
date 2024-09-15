import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/lib";
import { Community, Event } from "@/models";

export async function POST(req: NextRequest) {
	try {
		await dbConnect();

		const { name, datetime, communityId } = await req.json();
		if (!name?.trim()) {
			throw new Error("Event name wasn't provided");
		} else if (!communityId?.trim()) {
			throw new Error("community id wasn't provided");
		}

		if (!(await Community.findById(communityId))) {
			throw new Error("invalid community id");
		}
		const newEvent = await Event.create({
			name,
			datetime,
			community: communityId,
		});
		return NextResponse.json(
			{ success: true, data: newEvent },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	}
}
