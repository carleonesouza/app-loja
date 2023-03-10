import bcrypt from "bcrypt";

export async function validatePassword(password: string, user: string) {
  const isValid = await bcrypt.compare(password, user);
  if (!isValid) throw new Error("invalid email or password!");
  return isValid;
}
