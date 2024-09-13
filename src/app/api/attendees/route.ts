import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import {
	Connection,
	Transaction,
	clusterApiUrl,
	SystemProgram,
	PublicKey,
} from "@solana/web3.js";

import { decryptJWT } from "@/lib";
import { Community, Event } from "@/models";

export async function POST(req: NextApiRequest) {
	try {
		let signer: PublicKey;
		try {
			signer = new PublicKey(req.body.account);
		} catch (error) {
			throw new Error(
				"invalid signer account provided: not a valid public key"
			);
		}

		const url = new URL(req.url!);
		const eventId = url.searchParams.get("eventId");
		const event = await Event.findById(eventId);
		if (!event) throw new Error("invalid event id provided");

		const community = await Community.findById(event.community);
		const payer: any = await decryptJWT(community.keypair);
		if (!payer) throw new Error("invalid community keypair");

		const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl("devnet");
		const connection = new Connection(CLUSTER_URL);
		const { blockhash } = await connection.getLatestBlockhash();

		const sendSOLIx = SystemProgram.transfer({
			fromPubkey: payer,
			toPubkey: signer,
			lamports: 1_000,
		});

		const tx = new Transaction().add(sendSOLIx);
		tx.recentBlockhash = blockhash;
		tx.feePayer = payer;
		tx.sign(payer);

		const serializedTransaction = tx
			.serialize({ requireAllSignatures: false })
			.toString("base64");

		return NextResponse.json(
			{
				success: true,
				data: {
					txn: serializedTransaction,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: error },
			{ status: 400 }
		);
	}
}
