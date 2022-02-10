import nodemailer, { Transporter } from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import dotenv from "dotenv";
import { ErrorHandler } from "../utils/error";
import { Path } from "typescript";
dotenv.config();

interface IMailOptionsProps {
  from: string;
  to: string;
  subject: string;
  context: {};
  template: string;
}

interface ITransportOptionsProps {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  transport: Transporter;
  constructor(options: ITransportOptionsProps) {
    this.transport = nodemailer.createTransport(options);
  }
  sendEmail(
    HandleBarsOptions: NodemailerExpressHandlebarsOptions,
    MailOptions: IMailOptionsProps
  ) {
    const mailOptions = MailOptions;

    this.transport.use("compile", hbs(HandleBarsOptions));

    let output;
    this.transport.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        throw new ErrorHandler(500, err.message);
      }
      output = info.response;
    });
    return output;
  }
}

export default EmailService;
