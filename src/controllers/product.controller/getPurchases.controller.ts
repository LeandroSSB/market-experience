import { NextFunction, Request, Response } from "express";
import GetPurchases from "../../services/sales.service/getPurchases.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";
import { ErrorHandler } from "../../utils/error";

class GetPurchasesController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const getSaleService = new GetPurchases();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      if (err) {
        return next(new ErrorHandler(401, "Missing Authorization Header"));
      }
      try {
        const sales = await getSaleService.execute(decode.isAdm);
        return res.status(200).send(sales);
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default GetPurchasesController;
