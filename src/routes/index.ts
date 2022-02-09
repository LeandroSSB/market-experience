import {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import { productRouter, productCartRouter } from "./product.route";
import { userRouter } from "./user.route";
import { handleError } from "../utils/error";

const router = (app: Express) => {
  userRouter(app);
  productRouter(app);
  productCartRouter(app);

  app.use(
    (
      err: ErrorRequestHandler,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      handleError(err, res);
    }
  );
};

export default router;
