import { Request, Response } from "express";

import { connect } from "../database";
import { HardwareUbications } from "../interfaces/HardwareUbications";

export class HardwareForUserController {

    constructor() { }

    public async addUbicationHardware(req: Request, res: Response): Promise<any> {
        const hardwareUbications: HardwareUbications = req.body;
        try {
            const conn = await connect();
            await conn.query("INSERT INTO hardware_for_users "
                + "(users_id_user, hardware_inventory_plate, assignment_date)"
                + "VALUES (?,?,?)", [hardwareUbications.id_user, hardwareUbications.hardware_inventory_plate, hardwareUbications.assignment_date]);

            await conn.query("UPDATE hardware SET allocation_status = ? WHERE inventory_plate = ? ", ["Asignado", hardwareUbications.hardware_inventory_plate]);
            conn.end();
            return res.json({
                message: 'Assing Hardware'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const hardwareForUserController = new HardwareForUserController();
export default hardwareForUserController;