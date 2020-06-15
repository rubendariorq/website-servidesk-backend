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
}

const licenseController = new LicenseController();
export default licenseController;