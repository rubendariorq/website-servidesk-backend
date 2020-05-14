import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.route('/')
    .get(userController.getUsers)
    .post(userController.addUser);

router.route('/filter/dependencie/:dependencie')
    .get(userController.getUsersForDependencie);

router.route('/filter/type-user/:typeUser')
    .get(userController.getUsersForTypeUser);

router.route('/filter/status/:status')
    .get(userController.getUsersForStatus);

router.route('/filter/email/:email')
    .get(userController.getUserForEmail);

router.route('/:id')
    .get(userController.getUserForId)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export default router;