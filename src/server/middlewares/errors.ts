import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Logger from "../../utils/Logger.js";

const logger = new Logger();
logger.setType("internal");

export const notFoundEndpoint = (req: Request, res: Response, next: NextFunction) => {
  const customError = new CustomError(`Endpoint not found (${req.url})`, "Endpoint not found", 404);

  next(customError);
};

export const generalError = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.publicMessage || "General error";

  logger.error(`There was an status ${statusCode} and error ${error.message}`);

  return res.status(statusCode).json({
    message: publicMessage,
  });
};
