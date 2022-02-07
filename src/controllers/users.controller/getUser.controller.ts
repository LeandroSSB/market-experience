import { NextFunction, Request, Response } from "express";
import GetUserService from "../../services/Users.service/getUser.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";
import { ErrorHandler } from "../../utils/error";

export default class GetUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const getUserService = new GetUserService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (_err: any, decode: any) => {
      try {
        if (!decode.isAdm) {
          throw new ErrorHandler(401, "Missing admin permissions");
        }
        const users = await getUserService.execute();
        return res.status(200).send(users);
      } catch (e: any) {
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
