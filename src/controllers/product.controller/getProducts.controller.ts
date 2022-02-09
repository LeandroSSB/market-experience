import { NextFunction, Request, Response } from "express";
import GetProductsService from "../../services/product.service/getProducts.service";

class GetProductsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const getProductsService = new GetProductsService();
      const users = await getProductsService.execute();

      return res.status(200).send(users);
    } catch (e: any) {
      next(e);
    }
  }
}

export default GetProductsController;
