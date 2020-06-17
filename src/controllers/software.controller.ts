import { Request, Response } from "express";

import { connect } from "../database";
import { Software } from "../interfaces/Software";

export class SoftwareController {

    constructor() { }

    public async addSoftware(req: Request, res: Response): Promise<any> {
        const software: Software = req.body;
        try {
            const conn = await connect();
            await conn.query("INSERT INTO software "
                + "(name_software, version, status_software, development_information, support, plataform, development_language, provider, software_property, code_property, status_support, cost_maintenance, contractual_use_restriction)"
                + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [software.name_software, software.version, software.status_software, software.development_information, software.support, software.plataform, software.development_language, software.provider, software.software_property, software.code_property, software.status_support, software.cost_maintenance, software.contractual_use_restriction]);
            conn.end();
            return res.json({
                message: 'Software created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getAllSoftware(req: Request, res: Response): Promise<any> {
        try {
            const conn = await connect();
            const software = await conn.query("select * from software;");
            conn.end();
            return res.json(software[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getSoftware(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        try {
            const conn = await connect();
            const software = await conn.query("select * from software WHERE id_software = ?;",[id]);
            conn.end();
            return res.json(software[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async editSoftware(req: Request, res: Response): Promise<any> {
        try {
            const software: Software = req.body;
            const conn = await connect();
            await conn.query('UPDATE software SET name_software = ?, version = ?, status_software = ?, development_information = ?, support = ?, plataform = ?, development_language = ?, provider = ?, software_property = ?, code_property = ?, status_support = ?, cost_maintenance = ?, contractual_use_restriction = ? WHERE id_software = ?', [software.name_software, software.version, software.status_software, software.development_information, software.support, software.plataform, software.development_language, software.provider, software.software_property, software.code_property,software.status_support, software.cost_maintenance, software.contractual_use_restriction, software.id_software]);
            conn.end();
            return res.json({
                message: 'Software modificated'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const softwareController = new SoftwareController();
export default softwareController;