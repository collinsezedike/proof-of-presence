import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { Connection, clusterApiUrl } from "@solana/web3.js";

import { dbConnect } from "@/lib";
import { Community } from "@/models";

export async function POST(req: NextApiRequest) {
	try {
		await dbConnect();

		const { name, txnHash, keypair, payer } = req.body;
		if (!name?.trim()) {
			throw new Error("community name wasn't provided");
		} else if (!txnHash?.trim()) {
			throw new Error("transaction hash wasn't provided");
		}

		const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl("devnet");
		const connection = new Connection(CLUSTER_URL);

		await connection.confirmTransaction(txnHash);
		const txnDetails = await connection.getTransaction(txnHash);
		const feePayer = txnDetails?.transaction.message.accountKeys[0];

		const newCommunity = await Community.create({
			name,
			keypair,
			admin: feePayer,
		});
		return NextResponse.json(
			{ success: true, data: newCommunity },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	}
}
