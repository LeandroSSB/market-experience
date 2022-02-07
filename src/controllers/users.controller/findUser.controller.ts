import { NextFunction, Request, Response } from "express";
import FindUserService from "../../services/Users.service/findUser.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";

export default class FindUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const findUserService = new FindUserService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      try {
        const user = await findUserService.execute(
          req.params.uuid,
          decode.email
        );
        return res.status(200).send(user);
      } catch (e) {
        if (e instanceof TypeError) {
          return res.status(401).json({
            status: "error",
            statusCode: 401,
            message: "Missing Authorization Header",
          });
        }
        return next(e);
      }
    });
  }
}
