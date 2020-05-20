import { Request, Response } from "express";
import { connect } from "../database";
import { Computer } from "../interfaces/Computer";

class HardwareController {
    constructor() { }

    public async createComputer(req: Request, res: Response): Promise<any> {
        let computer: Computer = req.body;
        console.log(computer);
        try {
            const conn = await connect();
            await conn.query("INSERT INTO hardware (inventory_plate, serial, cost, months_warranty, brand, status, buy_date, provider, model) VALUES (?,?,?,?,?,?,?,?,?);", [computer.inventory_plate, computer.serial_monitor, computer.cost, computer.months_warranty, computer.brand, computer.status, computer.buy_date, computer.provider, computer.model]);

            await conn.query("INSERT INTO computers (type_computer, processor, speed_processor, hard_drive, technology_hard_drive, memory, type_memory, brand_monitor, model_monitor, inch_monitor, serial_monitor, brand_network_card, speed_network_card, drive, cd_rom, dvd, card_reader_driver, tape_backup, external_hard_drive, keyboard_connection, mouse_connection, observations, hardware_inventory_plate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [computer.type_computer, computer.processor, computer.speed_processor, computer.hard_drive, computer.technology_hard_drive, computer.memory, computer.type_memory, computer.brand_monitor, computer.model_monitor, computer.inch_monitor, computer.serial_monitor, computer.brand_network_card, computer.speed_network_card, computer.drive, computer.cd_rom, computer.dvd, computer.card_reader_driver, computer.tape_backup, computer.external_hard_drive, computer.keyboard_connection, computer.mouse_connection, computer.observations, computer.hardware_inventory_plate]);

            conn.end();
            return res.json({
                message: 'Computer created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const hardwareController = new HardwareController();
export default hardwareController;