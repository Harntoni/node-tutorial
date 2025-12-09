import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { transferController } from "./transfers.controllers.js";

export const transferRouter = Router();

transferRouter.post('/', auth, transferController);