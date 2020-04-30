import { Request, Response } from 'express'

import { connect } from '../database';
import { Dependencie } from '../interfaces/Dependencie';

class DependencieController{

    constructor(){}

    public async getDependencies(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        const dependencies = await conn.query('SELECT * FROM dependencies');
        return res.json(dependencies[0]);
    }
    
    public async createDependencie(req: Request, res: Response): Promise<Response>{
        const newDependencie:Dependencie = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO dependencies (name) VALUES (?)', [newDependencie.name])
        return res.json({
            message: 'Dependencie created'
        });
    }
    
    public async findDependencie(req:Request, res:Response): Promise<any> {
        const id = req.params.dependencieId;
        const conn = await connect();
        const dependencie = await conn.query('SELECT * FROM dependencies WHERE id = ?', [id]);
        return res.json(dependencie[0]);
    }
    
    public async editDependencie(req:Request, res:Response): Promise<Response> {
        const id = req.params.dependencieId;
        const dependencie:Dependencie = req.body;
        const conn = await connect();
        await conn.query('UPDATE dependencies SET name = ? WHERE id = ?', [dependencie.name, id]);
        return res.json({
            message: 'Dependencie modificated'
        });
    }
    
    public async deleteDependencie(req:Request, res:Response): Promise<Response> {
        const id = req.params.dependencieId;
        const conn = await connect();
        await conn.query('DELETE FROM dependencies WHERE id = ?', [id]);
        return res.json({
            message: 'Dependencie removed'
        });
    }
}

const dependencieController = new DependencieController();
export default dependencieController;

