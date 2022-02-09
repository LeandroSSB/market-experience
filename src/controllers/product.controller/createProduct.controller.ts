import { NextFunction, Request, Response } from "express";
import CreateProductService from "../../services/product.service/createProduct.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";

class CreateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const createProductService = new CreateProductService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      if (err) {
        res.status(401).json({
          status: "error",
          statusCode: 401,
          message: "Missing Authorization Header",
        });
      }
      try {
        const product = await createProductService.execute(
          req.body,
          decode.isAdm
        );

        res.status(201).send(product);
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default CreateProductController;
