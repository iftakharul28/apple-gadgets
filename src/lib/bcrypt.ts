import { compareSync, hash } from "bcryptjs";

export async function encodePassword(rowpassword: string) {
  return await hash(rowpassword, 12);
}

export function comparePassword(rowpassword: string, hash: string) {
  return compareSync(rowpassword, hash);
}
