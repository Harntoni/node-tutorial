import { Router } from "express";
import { depositController } from "./deposits.controllers.js";
import {auth} from "../middleware/auth.js"

export const depositRouter = Router();

depositRouter.post('/', auth, depositController);