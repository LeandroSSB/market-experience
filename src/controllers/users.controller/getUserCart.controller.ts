import { NextFunction, Request, Response } from "express";
import GetUserCartService from "../../services/Users.service/getUserCart.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";

class GetUserCartController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const getUserCartService = new GetUserCartService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      if (err) {
        return res.status(401).json({
          status: "error",
          statusCode: 401,
          message: "Missing Authorization Header",
        });
      }
      try {
        const carts = await getUserCartService.execute(decode.isAdm);
        return res.status(200).send(carts);
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default GetUserCartController;
