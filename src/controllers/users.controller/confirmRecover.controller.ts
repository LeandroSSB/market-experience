import { NextFunction, Request, Response } from "express";
import ConfirmRecoverService from "../../services/Users.service/confirmRecover.service";

class ConfirmRecoverController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const confirmRecoverService = new ConfirmRecoverService();
    const { email, password, recover } = req.body;
    try {
      const user = confirmRecoverService.execute(email, recover, password);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
}

export default ConfirmRecoverController;
