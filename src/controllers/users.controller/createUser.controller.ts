import { NextFunction, Request, Response } from "express";
import CreateUserService from "../../services/Users.service/createUser.service";
import { handleError } from "../../utils/error";

export default class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const createUserService = new CreateUserService();
    try {
      const user = await createUserService.execute(req.body);

      return res.status(201).send(user);
    } catch (e: any) {
      handleError(e, res);
    }
  }
}
