import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../database";
import FindUserCartService from "../../services/Users.service/findUserCart.service";

class FindUserCartController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const findUserCartService = new FindUserCartService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      if (err) {
        return res.status(404).json({
          status: "error",
          statusCode: 401,
          message: "Missing Authorization Header",
        });
      }
      try {
        const cart = await findUserCartService.execute(
          req.params.uuid,
          decode.email
        );
        return res.status(200).send(cart);
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default FindUserCartController;
