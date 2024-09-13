import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
	try {
		return NextResponse.json(
			{ success: true, message: "GM! World" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	}
}
