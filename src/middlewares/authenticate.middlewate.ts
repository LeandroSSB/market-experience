import { NextFunction, Request, Response } from "express";
import LoginUserService from "../services/Users.service/loginUser.service";

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const Authenticated = await new LoginUserService().execute({
      email,
      password,
    });
    req.AuthenticatedUser = Authenticated;
    return next();
  } catch (e: any) {
    return next(e);
  }
};

export default authenticateMiddleware;
