import {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import CreateUserController from "../controllers/users.controller/createUser.controller";
import FindUserController from "../controllers/users.controller/findUser.controller";
import GetUserController from "../controllers/users.controller/getUser.controller";
import LoginUserController from "../controllers/users.controller/loginUser.controller";
import authenticateMiddleware from "../middlewares/authenticate.middlewate";
import { handleError } from "../utils/error";

const getUserController = new GetUserController();
const findUserController = new FindUserController();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

export const userRouter = (app: Express) => {
  const router = Router();

  router.post("", createUserController.handle);
  router.get("", getUserController.handle);
  router.get("/:uuid", findUserController.handle);

  app.post("/login", authenticateMiddleware, loginUserController.handle);

  app.use("/user", router);
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
