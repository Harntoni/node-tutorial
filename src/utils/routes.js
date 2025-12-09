import { Router } from "express";
import { depositRouter } from "../deposits/deposits.routes.js";
import { transferRouter } from "../transfers/transfers.routes.js";

export const routes = Router();

routes.use('/deposits',depositRouter);
routes.use('/transfers',transferRouter);