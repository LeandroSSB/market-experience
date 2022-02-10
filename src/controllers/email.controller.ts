import { NextFunction, Request, Response } from "express";
import EmailService from "../services/email.service";
import jwt from "jsonwebtoken";
import { config } from "../database";
import { ErrorHandler } from "../utils/error";

class EmailController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const emailService = new EmailService({
      host: process.env.EMAIL_SMTP as string,
      port: process.env.EMAIL_PORT as unknown as number,
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      if (err) {
        return next(new ErrorHandler(401, "Missing Athorization headers"));
      }
      try {
        emailService.sendEmailAdm(
          {
            from: "Kenzie Market",
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.text,
          },
          decode.isAdm
        );
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default EmailController;
