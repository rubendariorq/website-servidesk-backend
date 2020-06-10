import { Request, Response } from "express";

import { connect } from "../database";

//Interfaces
import { HardwareUbications } from "../interfaces/HardwareUbications";
import { Computer } from "../interfaces/Computer";
import { PeripheralForComputer } from "../interfaces/PeripheralForComputer";

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

    public async getComputerForUser(req: Request, res: Response): Promise<any> {
        try {
            const idUser = parseInt(req.params.idUser);
            const conn = await connect();
            const hardware = await conn.query("SELECT * FROM hardware_for_users hu INNER JOIN users u " +
            "ON (hu.users_id_user = u.id_user) INNER JOIN dependencies d " +
            "ON (u.dependencies_id_dependencie = d.id_dependencie) INNER JOIN hardware h " +
            "ON (hu.hardware_inventory_plate = h.inventory_plate) " +
            "WHERE id_user = ? AND type_hardware = ?;", [idUser, 'Computador']);
            conn.end();
            console.log(hardware[0]);
            return res.json(hardware[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getUserForComputerAllocated(req: Request, res: Response): Promise<any> {
        try {
            const idComputer = req.params.idComputer;
            const conn = await connect();
            const computer = await conn.query("SELECT * FROM hardware_for_users WHERE hardware_inventory_plate = ?;", [idComputer]);
            conn.end();
            console.log(computer[0]);
            return res.json(computer[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async addUbicationPeripherialAndLinkComputer(req: Request, res: Response): Promise<any> {
        const arrayAux = req.body;
        console.log(arrayAux);
        
        let hardwareUbications: HardwareUbications;
        hardwareUbications = arrayAux[0];
        let peripheralForComputer: PeripheralForComputer;
        peripheralForComputer = arrayAux[1];
        
        try {
            const conn = await connect();
            await conn.query("INSERT INTO peripherals_for_computer " +
            "(peripherals_hardware_inventory_plate, computers_hardware_inventory_plate, connection_type) " +
            "VALUES (?,?,?);", [peripheralForComputer.peripherals_hardware_inventory_plate, peripheralForComputer.computers_hardware_inventory_plate, peripheralForComputer.connection_type]);

            await conn.query("INSERT INTO hardware_for_users "
            + "(users_id_user, hardware_inventory_plate, assignment_date)"
            + "VALUES (?,?,?)", [hardwareUbications.users_id_user, hardwareUbications.hardware_inventory_plate, hardwareUbications.assignment_date]);

            await conn.query("UPDATE hardware SET allocation_status = ? WHERE inventory_plate = ?", ["Asignado", hardwareUbications.hardware_inventory_plate]);

            conn.end();
            return res.json({
                message: 'Assing Peripheral'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async addUbicationPeripherial(req: Request, res: Response): Promise<any> {
        let peripheralForComputer: PeripheralForComputer = req.body;
        try {
            const conn = await connect();
            
            await conn.query("INSERT INTO peripherals_for_computer " +
            "(peripherals_hardware_inventory_plate, computers_hardware_inventory_plate, connection_type) " +
            "VALUES (?,?,?);", [peripheralForComputer.peripherals_hardware_inventory_plate, peripheralForComputer.computers_hardware_inventory_plate, peripheralForComputer.connection_type]);

            conn.end();
            return res.json({
                message: 'Peripheral linked'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const hardwareForUserController = new HardwareForUserController();
export default hardwareForUserController;