import type { NextFunction, Request, Response } from "express";
import fs from "node:fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `\nURL -> ${req.url} | METHOD -> ${req.method} | TIME -> ${Date.now()}\n`;
  fs.appendFile("logger.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

export default logger;
