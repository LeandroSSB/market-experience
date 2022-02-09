import { NextFunction, Request, Response } from "express";
import AddProductCartService from "../../services/product.service/addProductCart.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";

class AddProductCartController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const addProductService = new AddProductCartService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    const { uuid } = req.body;
    if (!uuid) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "uuid is a required field",
      });
    }

    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      if (err) {
        return res.status(401).json({
          status: "error",
          statusCode: 401,
          message: "Missing Authorization Header",
        });
      }
      try {
        const user = await addProductService.execute(uuid, decode.email);
        return res.status(200).send(user);
      } catch (e: any) {
        return next(e);
      }
    });
  }
}

export default AddProductCartController;
