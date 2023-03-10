import { connect as mongooseConnect, connection } from "mongoose";
import util from "../util/baseUtil";
import logger from "@src/logger";

// Connect to MongoDB

export const connect = async (): Promise<void> => {
  await mongooseConnect(util.DATABASE).then(() =>
    logger.info("DB connection was successfully!!")
  );
};

export const close = (): Promise<void> => connection.close();
