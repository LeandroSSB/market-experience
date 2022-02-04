import { Express } from "express";
import { userRouter } from "./user.route";

const router = (app: Express) => {
  userRouter(app);
};

export default router;
