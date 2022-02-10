import { NextFunction, Request, Response } from "express";
import DeleteUserCartService from "../../services/product.service/deleteUserCart.service";
import jwt from "jsonwebtoken";
import { config } from "../../database";
import { ErrorHandler } from "../../utils/error";

class DeleteUserCartController {
  handle(req: Request, res: Response, next: NextFunction) {
    const deleteService = new DeleteUserCartService();
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      try {
        if (err) {
          return next(new ErrorHandler(401, "Missing authorization headers"));
        }
        const response = await deleteService.execute(
          req.params.uuid,
          decode.email,
          req.body.uuid || undefined
        );

        return res.status(204).send();
      } catch (e: any) {
        next(e);
      }
    });
  }
}

export default DeleteUserCartController;
