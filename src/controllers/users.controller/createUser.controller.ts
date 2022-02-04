import { Request, Response } from "express";
import CreateUserService from "../../services/Users.service/createUser.service";

export default class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new CreateUserService();
    try {
      const user = await createUserService.execute(req.body);

      return res.status(201).send(user);
    } catch (e: any) {
      res.status(400).send("error" + e.message);
    }
  }
}
