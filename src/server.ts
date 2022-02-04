import app from "./app";
import { connectDatabase } from "./database";
import serverLog from "./middlewares/serverLog.middleware";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Connected at localhost:${PORT}`);
    });
    app.use(serverLog);
  })
  .catch((err) => {
    console.error("Connection to the database failed", err.message);
  });
