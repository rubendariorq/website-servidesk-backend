import { Request, Response } from "express";

import { connect } from "../database";
import { Communication } from "../interfaces/Communication";

export class CommunicationController {

    constructor() { }

    public async addCommunication(req: Request, res: Response): Promise<any> {
        const communication: Communication = req.body;
        try {
            const conn = await connect();
            await conn.query("INSERT INTO communications "
                + "(inventory_plate_communication, serial, object, type_device, ip_lan, ip_wan, ip_wanO, ip_wanD, property, cost, description, dependencies_id_dependencie)"
                + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [communication.inventory_plate_communication, communication.serial, communication.object, communication.type_device, communication.ip_lan, communication.ip_wan, communication.ip_wanO, communication.ip_wanD, communication.property, communication.cost, communication.description, communication.dependencies_id_dependencie]);
            conn.end();
            return res.json({
                message: 'Communication created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getCommunications(req: Request, res: Response): Promise<any> {
        try {
            const conn = await connect();
            const communications = await conn.query("select * from communications c INNER JOIN dependencies d " 
            + "ON (c.dependencies_id_dependencie = d.id_dependencie);");
            conn.end();
            return res.json(communications[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async getCommunication(req: Request, res: Response): Promise<any> {
        let inventory_plate = req.params.inventoryPlate;
        try {
            const conn = await connect();
            const communications = await conn.query("select * from communications c INNER JOIN dependencies d " 
            + "ON (c.dependencies_id_dependencie = d.id_dependencie) WHERE inventory_plate_communication = ?;", [inventory_plate]);
            conn.end();
            return res.json(communications[0]);
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async updateCommunication(req: Request, res: Response): Promise<any> {
        try {
            const inventory_plate = req.params.inventoryPlate;
            const communication: Communication = req.body;
            const conn = await connect();
            await conn.query('UPDATE communications SET inventory_plate_communication = ?, serial = ?, object = ?, type_device = ?, ip_lan = ?, ip_wan = ?, ip_wanO = ?, ip_wanD = ?, property = ?, cost = ?, description = ?, dependencies_id_dependencie = ? WHERE inventory_plate_communication = ?', [communication.inventory_plate_communication, communication.serial, communication.object, communication.type_device, communication.ip_lan, communication.ip_wan, communication.ip_wanO, communication.ip_wanD, communication.property, communication.cost, communication.description, communication.dependencies_id_dependencie, inventory_plate]);
            conn.end();
            return res.json({
                message: 'Communication modificated'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async deleteCommunication(req: Request, res: Response): Promise<any> {
        const inventoryPlate = req.params.inventoryPlate;
        try {
            const conn = await connect();
            await conn.query('DELETE FROM communications WHERE inventory_plate_communication = ?', [inventoryPlate]);
            conn.end();
            return res.json({
                message: 'communication removed'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const communicationController = new CommunicationController();
export default communicationController;