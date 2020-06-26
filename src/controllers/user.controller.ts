import { Request, Response } from "express";

import { connect } from "../database";
import { User } from "../interfaces/User";
import util from "../util";

export class UserController {

    constructor() { }

    public async getUsers(req: Request, res: Response): Promise<any> {
        try {
            const conn = await connect();
            const users = await conn.query("select * from users u "
                + "inner join dependencies d on (u.dependencies_id_dependencie = d.id_dependencie)"
                + "AND u.type_user <> 'Profesional';");
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async addUser(req: Request, res: Response): Promise<any> {
        const user: User = req.body;

        const passwordEncrypt = await util.encryptPassword(user.password);
        user.password = passwordEncrypt;

        try {
            const conn = await connect();
            await conn.query("INSERT INTO users "
                + "(email, name, password, password_changed_date, type_user, status, failed_attempts, dependencies_id_dependencie)"
                + "VALUES (?,?,?,?,?,?,?,?)", [user.email, user.name, user.password, user.password_changed_date, user.type_user, user.status, user.failde_attempts, user.dependencies_id_dependencie]);
            conn.end();
            return res.json({
                message: 'User created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getUsersForDependencie(req: Request, res: Response): Promise<any> {
        const dependencie = req.params.dependencie;
        try {
            const conn = await connect();
            const users = await conn.query("select * from users u "
                + "inner join dependencies d on (u.dependencies_id_dependencie = d.id_dependencie) WHERE d.name_dependencie = ? "
                + "AND u.type_user <> 'Profesional';", [dependencie]);
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getUsersForTypeUser(req: Request, res: Response): Promise<any> {
        const typeUser = req.params.typeUser;
        try {
            const conn = await connect();
            const users = await conn.query("select * from users u"
                + " inner join dependencies d on (u.dependencies_id_dependencie = d.id_dependencie) WHERE type_user = ? AND type_user <> 'Profesional';", [typeUser]);
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getUsersForStatus(req: Request, res: Response): Promise<any> {
        const status = req.params.status;
        try {
            const conn = await connect();
            const users = await conn.query("select * from users u "
                + "inner join dependencies d on (u.dependencies_id_dependencie = d.id_dependencie) "
                + "WHERE status = ? AND type_user <> 'Profesional';", [status]);
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getUserForEmail(req: Request, res: Response): Promise<any> {
        const email = req.params.email;
        try {
            const conn = await connect();
            const users = await conn.query("select * from users "
                + "WHERE email = ?;", [email]);
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getUserForId(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        try {
            const conn = await connect();
            const users = await conn.query("select * from users u "
                + "inner join dependencies d on (u.dependencies_id_dependencie = d.id_dependencie) "
                + "WHERE id_user = ?;", [id]);
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getUserForName(req: Request, res: Response): Promise<any> {
        const name = req.params.name;
        try {
            const conn = await connect();
            const users = await conn.query("select * from users "
                + "WHERE name = ?;", [name]);
            conn.end();
            return res.json(users[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async updateUser(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        try {
            const user: User = req.body;
            const conn = await connect();
            await conn.query("UPDATE users SET email = ?, name = ?, type_user = ?, dependencies_id_dependencie = ? "
                + "WHERE id_user = ?", [user.email, user.name, user.type_user, user.dependencies_id_dependencie, id]);
            conn.end();
            return res.json({
                message: 'User modificated'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        try {
            const conn = await connect();
            await conn.query('DELETE FROM users WHERE id_user = ?', [id]);
            conn.end();
            return res.json({
                message: 'User removed'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const userController = new UserController();
export default userController;