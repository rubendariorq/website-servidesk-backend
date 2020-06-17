import { Request, Response } from "express";

import { connect } from "../database";
import { Licenses } from "../interfaces/Licenses";

export class LicenseController {

    constructor() { }

    public async addLicense(req: Request, res: Response): Promise<any> {
        const license: Licenses = req.body;
        try {
            const conn = await connect();
            await conn.query("INSERT INTO licenses "
                + "(serial_code, months_validity, cost, free_commercial, client_server, software)"
                + "VALUES (?,?,?,?,?,?)", [license.serial_code, license.months_validity, license.cost, license.free_commercial, license.client_server, license.software]);
            conn.end();
            return res.json({
                message: 'License created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getLicenses(req: Request, res: Response): Promise<any> {
        try {
            const conn = await connect();
            const licenses = await conn.query("select * from licenses;");
            conn.end();
            return res.json(licenses[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getLicense(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        try {
            const conn = await connect();
            const licenses = await conn.query("select * from licenses WHERE id_license = ?;", [id]);
            conn.end();
            return res.json(licenses[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async editLicense(req: Request, res: Response): Promise<any> {
        try {
            const license: Licenses = req.body;
            const conn = await connect();
            await conn.query('UPDATE licenses SET serial_code = ?, months_validity = ?, cost = ?, free_commercial = ?, client_server = ?, software = ? WHERE id_license = ?', [license.serial_code, license.months_validity, license.cost, license.free_commercial, license.client_server, license.software, license.id_license]);
            conn.end();
            return res.json({
                message: 'License modificated'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async deleteLicense(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        try {
            const conn = await connect();
            await conn.query('DELETE FROM licenses WHERE id_license = ?', [id]);
            conn.end();
            return res.json({
                message: 'License removed'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const licenseController = new LicenseController();
export default licenseController;