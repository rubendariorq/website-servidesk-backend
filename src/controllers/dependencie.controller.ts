import { Request, Response } from 'express'

import { connect } from '../database';
import { Dependencie } from '../interfaces/Dependencie';

class DependencieController {

    constructor() { }

    public async getDependencies(req: Request, res: Response): Promise<any> {
        try {
            const conn = await connect();
            const dependencies = await conn.query('SELECT * FROM dependencies');
            conn.end();
            return res.json(dependencies[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async createDependencie(req: Request, res: Response): Promise<any> {
        const newDependencie: Dependencie = req.body;
        try {
            const conn = await connect();
            await conn.query('INSERT INTO dependencies (name) VALUES (?)', [newDependencie.name]);
            conn.end();
            return res.json({
                message: 'Dependencie created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async findDependencie(req: Request, res: Response): Promise<any> {
        const id = req.params.dependencieId;
        try {
            const conn = await connect();
            const dependencie = await conn.query('SELECT * FROM dependencies WHERE id = ?', [id]);
            conn.end();
            return res.json(dependencie[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async editDependencie(req: Request, res: Response): Promise<any> {
        const id = req.params.dependencieId;
        try {
            const dependencie: Dependencie = req.body;
            const conn = await connect();
            await conn.query('UPDATE dependencies SET name = ? WHERE id = ?', [dependencie.name, id]);
            conn.end();
            return res.json({
                message: 'Dependencie modificated'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async deleteDependencie(req: Request, res: Response): Promise<any> {
        const id = req.params.dependencieId;
        try {
            const conn = await connect();
            await conn.query('DELETE FROM dependencies WHERE id = ?', [id]);
            conn.end();
            return res.json({
                message: 'Dependencie removed'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const dependencieController = new DependencieController();
export default dependencieController;

