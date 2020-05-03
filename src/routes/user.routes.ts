import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.route('/')
    .get(userController.getUsers);

export default router;