import { Request, Response } from "express";

import { connect } from "../database";
import { User } from "../interfaces/User";

export class UserController {

    constructor() { }

    public async getUsers(req: Request, res: Response): Promise<any> {
        try {
            const conn = await connect();
            const users = await conn.query("select * from users u "
                + "inner join dependencies d on (u.dependencies_id = d.id);");
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async addUser(req: Request, res: Response): Promise<any> {
        const user: User = req.body;
        try {
            const conn = await connect();
            await conn.query("INSERT INTO users "
                + "(email, first_name, last_name, password, password_changed_date, type_user, status, failed_attempts, dependencies_id)"
                + "VALUES (?,?,?,?,?,?,?,?,?)", [user.email, user.first_name, user.last_name, user.password, user.password_changed_date, user.type_user, user.status, user.failde_attempts, user.dependencies_id]);
            conn.end();
            return res.json({
                message: 'User created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

}

const userController = new UserController();
export default userController;