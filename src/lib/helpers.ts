import { SignJWT, jwtVerify } from "jose";
import { randomBytes } from "crypto";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encryptJWT(payload: any) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("5 minutes")
		.sign(encodedKey);
}

export async function decryptJWT(session: any) {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		console.error("Failed to verify JWT session");
	}
}
