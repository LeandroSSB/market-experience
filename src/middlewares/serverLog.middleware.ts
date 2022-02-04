import { NextFunction, Request, Response } from "express";

const serverLog = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.baseUrl}`);
  return next();
};

export default serverLog;
