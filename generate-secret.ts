import { randomBytes } from "crypto";

function generateSecret(): string {
  return randomBytes(32).toString("hex");
}

console.log(generateSecret());
