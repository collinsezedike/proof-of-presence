import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { Connection, clusterApiUrl } from "@solana/web3.js";

import { dbConnect } from "@/lib";
import { Attendee } from "@/models";

export async function POST(req: NextApiRequest) {
	try {
		await dbConnect();

		const { name, txnHash, eventId } = req.body;
		if (!name?.trim()) {
			throw new Error("community name wasn't provided");
		} else if (!txnHash?.trim()) {
			throw new Error("transaction hash wasn't provided");
		} else if (!eventId?.trim()) {
			throw new Error("event id wasn't provided");
		}

		const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl("devnet");
		const connection = new Connection(CLUSTER_URL);

		await connection.confirmTransaction(txnHash);
		const txnDetails = await connection.getTransaction(txnHash);
		console.log(txnDetails?.transaction.message.accountKeys);
		const signer = txnDetails?.transaction.message.accountKeys[1];

		const newAttendee = await Attendee.create({
			name,
			event: eventId,
			wallet: signer,
		});
		return NextResponse.json(
			{ success: true, data: newAttendee },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	}
}
