import { Request, Response } from "express";

import { connect } from "../database";
import { User } from "../interfaces/User";

export class UserController {

    constructor() { }

    public async getUsers(req: Request, res: Response): Promise<any> {
        try {
            const conn = await connect();
            const users = await conn.query("select * from users u "
                + "inner join employee_ti e on (u.email = e.users_email) "
                + "inner join dependencies d on (u.dependencies_id = d.id);");
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

}

const userController = new UserController();
export default userController;