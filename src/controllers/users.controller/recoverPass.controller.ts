import { NextFunction, Request, Response } from "express";
import EmailService from "../../services/email.service";
import RecoverPassService from "../../services/Users.service/recoverPass.service";
import path from "path";

class RecoverPassController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const recoverPassService = new RecoverPassService();
    const recover = await recoverPassService.execute(req.body.email);

    const emailService = new EmailService({
      host: process.env.EMAIL_SMTP as string,
      port: process.env.EMAIL_PORT as unknown as number,
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });

    emailService.sendEmail(
      {
        viewEngine: {
          partialsDir: path.resolve("./src/views/templates"),
          defaultLayout: "src/views/templates/recover",
        },
        viewPath: path.resolve("./src/views/templates"),
      },
      {
        from: "Kenzie Market",
        to: req.body.email,
        subject: "Recuperacao de senha",
        template: "recover",
        context: {
          company: "Kenzie Market",
          recover,
        },
      }
    );

    res
      .status(200)
      .json({ data: "An email has been sent containing your recover code " });
  }
}

export default RecoverPassController;
