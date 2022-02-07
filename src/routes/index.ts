import { Express } from "express";
import productRouter from "./product.route";
import { userRouter } from "./user.route";

const router = (app: Express) => {
  userRouter(app);
  productRouter(app);
};

export default router;
