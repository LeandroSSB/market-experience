import { Request, Response } from "express";
import GetUserService from "../../services/Users.service/getUser.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";

export default class GetUserController {
  async handle(req: Request, res: Response) {
    const getUserService = new GetUserService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (_err: any, decode: any) => {
      try {
        if (!decode.isAdm) {
          return res.json({ message: "Unauthorized" });
        }
        const users = await getUserService.execute();
        return res.status(200).send(users);
      } catch (e: any) {
        return res
          .status(401)
          .json({ message: "Missing authorization header" });
      }
    });
  }
}
