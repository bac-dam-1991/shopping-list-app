import { ErrorRequestHandler } from "express";
import { PayloadValidationError } from "../errors/PayloadValidationError";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";
import { UnableToDeleteError } from "../errors/UnableToDeleteError";
import { UnableToModifyError } from "../errors/UnableToModifyError";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const message = (error as Error).message;
  if (error instanceof ResourceNotFoundError) {
    res.status(404).json(message);
    return;
  }
  if (error instanceof PayloadValidationError) {
    res.status(409).json(message);
    return;
  }
  if (
    error instanceof UnableToDeleteError ||
    error instanceof UnableToModifyError
  ) {
    res.status(400).json(message);
    return;
  }
  res.status(500).json("Internal server error.");
};
