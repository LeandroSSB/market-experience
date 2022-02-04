import { Request, Response } from "express";
import FindUserService from "../../services/Users.service/findUser.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";

export default class FindUserController {
  async handle(req: Request, res: Response) {
    const findUserService = new FindUserService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      const user = await findUserService.execute(req.params.uuid, decode.email);
      return res.status(200).send(user);
      //
    });
  }
}
