import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../database";
import FindPurchaseService from "../../services/sales.service/findPurchase.service";
import { ErrorHandler } from "../../utils/error";

class FindPurchaseController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const purchaseService = new FindPurchaseService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      if (err) {
        return next(new ErrorHandler(401, "Missing authorization headers"));
      }
      try {
        const sale = await purchaseService.execute(
          req.params.uuid,
          decode.isAdm,
          decode.email
        );

        return res.status(200).send(sale);
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default FindPurchaseController;
