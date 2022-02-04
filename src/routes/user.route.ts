import { Express, Router } from "express";
import CreateUserController from "../controllers/users.controller/createUser.controller";
import FindUserController from "../controllers/users.controller/findUser.controller";
import GetUserController from "../controllers/users.controller/getUser.controller";
import LoginUserController from "../controllers/users.controller/loginUser.controller";
import UpdateUserController from "../controllers/users.controller/updateUser.controller";
import authenticateMiddleware from "../middlewares/authenticate.middlewate";

const getUserController = new GetUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

export const userRouter = (app: Express) => {
  const router = Router();

  router.post("", createUserController.handle);
  router.get("", getUserController.handle);
  router.get("/:uuid", findUserController.handle);
  router.patch("/:uuid", updateUserController.handle);
  app.post("/login", authenticateMiddleware, loginUserController.handle);

  app.use("/user", router);
};
