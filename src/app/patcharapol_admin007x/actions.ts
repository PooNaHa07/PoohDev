"use server";

export async function verifyPasscode(clientPasscode: string): Promise<boolean> {
  const correctPasscode = process.env.ADMIN_PASSCODE || process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "1234";
  return clientPasscode === correctPasscode;
}
