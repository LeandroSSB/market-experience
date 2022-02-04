import { Response } from "express";

class Errorhanlder extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleError = (err: any, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = {
  handleError,
  Errorhanlder,
};
