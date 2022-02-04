import { Request, Response } from "express";
import { config } from "../../database";
import { User } from "../../entities";
import jwt from "jsonwebtoken";

class LoginUserController {
  async handle(req: Request, res: Response) {
    const user = req.AuthenticatedUser as User;
    let token = jwt.sign(
      { email: user.email, isAdm: user.isAdm },
      config.secret,
      {
        expiresIn: config.expiresIn,
      }
    );
    res.json({ token: token });
  }
}

export default LoginUserController;
