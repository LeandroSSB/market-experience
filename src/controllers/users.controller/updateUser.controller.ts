import { Request, Response } from "express";
import UpdateUserService from "../../services/Users.service/updateUser.service";
import jwt from "jsonwebtoken";

export default class UpdateUserController {
  async handle(req: Request, res: Response) {
    const updateUserService = new UpdateUserService();

    const user = updateUserService;
  }
}
