import { Connection, ConnectionOptions, createConnection } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRESIN;

export const config = {
  secret: secret as string,
  expiresIn: expires as string,
};

export const connectDatabase = (
  options?: ConnectionOptions
): Promise<Connection> => {
  if (options) {
    return createConnection(options);
  }
  return createConnection();
};
