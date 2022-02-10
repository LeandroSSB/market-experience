import { NextFunction, Request, Response } from "express";
import EmailService from "../../services/email.service";
import PurchaseService from "../../services/sales.service/purchase.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";
import { ErrorHandler } from "../../utils/error";
import path from "path";

class PurchaseController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const purchaseService = new PurchaseService();
    let token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      const emailService = new EmailService({
        host: process.env.EMAIL_SMTP as string,
        port: process.env.EMAIL_PORT as unknown as number,
        auth: {
          user: process.env.EMAIL_USER as string,
          pass: process.env.EMAIL_PASS as string,
        },
      });
      if (err) {
        return next(new ErrorHandler(401, "Missing Authorization Headers"));
      }
      try {
        const sale = await purchaseService.execute(
          req.body.uuid,
          decode.email,
          req.body.quantity || undefined
        );

        emailService.sendEmail(
          {
            viewEngine: {
              partialsDir: path.resolve("./src/views/templates"),
              defaultLayout: "src/views/templates/purchase",
            },
            viewPath: path.resolve("./src/views/templates"),
          },
          {
            from: "Kenzie Market",
            to: decode.email,
            subject: "Obrigado pela compra!",
            template: "purchase",
            context: {
              company: "Kenzie Market",
              saleId: sale.uuid,
              product: sale.product.name,
              quantity: sale.quantity,
            },
          }
        );

        return res.status(204).send();
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default PurchaseController;
