import { NextFunction, Request, Response } from "express";
import FindProductService from "../../services/product.service/findProduct.service";

class FindProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const findProductService = new FindProductService();
      const product = await findProductService.execute(req.params.uuid);
      return res.status(200).send(product);
    } catch (e: any) {
      next(e);
    }
  }
}

export default FindProductController;
