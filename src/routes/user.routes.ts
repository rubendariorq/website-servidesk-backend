import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.route('/')
    .get(userController.getUsers)
    .post(userController.addUser);

export default router;