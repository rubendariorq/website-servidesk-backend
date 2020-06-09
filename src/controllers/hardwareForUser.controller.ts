import { Request, Response } from "express";

import { connect } from "../database";

//Interfaces
import { HardwareUbications } from "../interfaces/HardwareUbications";
import { Computer } from "../interfaces/Computer";

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

    public async addUbicationComputer(req: Request, res: Response): Promise<any> {
        const arrayAux = req.body;
        
        let hardwareUbications: HardwareUbications;
        hardwareUbications = arrayAux[0];
        let computer: Computer;
        computer = arrayAux[1];
        
        try {
            const conn = await connect();
            await conn.query("INSERT INTO hardware_for_users "
            + "(users_id_user, hardware_inventory_plate, assignment_date)"
            + "VALUES (?,?,?)", [hardwareUbications.id_user, hardwareUbications.hardware_inventory_plate, hardwareUbications.assignment_date]);

            await conn.query("UPDATE hardware SET allocation_status = ? WHERE inventory_plate = ?", ["Asignado", hardwareUbications.hardware_inventory_plate]);

            await conn.query("UPDATE computers SET name_machine = ?, ip_direction = ?, mac_direction = ?, internet_type_connection = ?, internet_provider = ? WHERE hardware_inventory_plate = ? ", [computer.name_machine, computer.ip_direction, computer.mac_direction, computer.internet_type_connection, computer.internet_provider, computer.hardware_inventory_plate]);

            conn.end();
            return res.json({
                message: 'Assing Computer'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const hardwareForUserController = new HardwareForUserController();
export default hardwareForUserController;