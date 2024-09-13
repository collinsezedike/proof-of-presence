import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import {
	Connection,
	Keypair,
	clusterApiUrl,
	SystemProgram,
	TransactionMessage,
	VersionedTransaction,
	PublicKey,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import { dbConnect, encryptJWT } from "@/lib";
import { Community } from "@/models";

export async function GET(req: NextApiRequest) {
	try {
		await dbConnect();
		const communities = await Community.find({});
		return NextResponse.json(
			{ success: true, data: communities },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	}
}

export async function POST(req: NextApiRequest) {
	try {
		let payer: PublicKey;
		try {
			payer = new PublicKey(req.body.account);
		} catch (err: any) {
			throw new Error(
				"invalid payer account provided: not a valid public key"
			);
		}

		const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl("devnet");
		const connection = new Connection(CLUSTER_URL);

		// Airdropping some SOL in order for the payer to be able to pay for gas
		await connection.requestAirdrop(payer, 1 * LAMPORTS_PER_SOL);

		const keypair = Keypair.generate();
		const space = 0;
		const lamports = await connection.getMinimumBalanceForRentExemption(
			space
		);

		const createAccountIx = SystemProgram.createAccount({
			fromPubkey: payer,
			newAccountPubkey: keypair.publicKey,
			lamports,
			space,
			programId: SystemProgram.programId,
		});

		const { blockhash } = await connection.getLatestBlockhash();

		const message = new TransactionMessage({
			payerKey: payer,
			recentBlockhash: blockhash,
			instructions: [createAccountIx],
		}).compileToV0Message();

		const tx = new VersionedTransaction(message);

		const serializedTransaction = tx.serialize().toString();
		const encryptedKeypair = await encryptJWT(keypair);
		return NextResponse.json(
			{
				success: true,
				data: { txn: serializedTransaction, keypair: encryptedKeypair },
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	}
}
