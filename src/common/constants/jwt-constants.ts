export const jwtConstants = {
  secret: String(process.env.JWT_SECRET as string),
  expiresIn: (process.env.JWT_EXPIRES || "7d") as any,
};
