import { Request, Response } from "express";
import { connect } from "../database";

//Interfaces
import { Computer } from "../interfaces/Computer";
import { Ups } from "../interfaces/Ups";
import { Peripheral } from "../interfaces/Peripheral";

class HardwareController {
    constructor() { }

    public async createComputer(req: Request, res: Response): Promise<any> {
        let computer: Computer = req.body;
        console.log(computer);
        try {
            const conn = await connect();
            await conn.query("INSERT INTO hardware (inventory_plate, serial, cost, months_warranty, brand, status, buy_date, provider, model, type_hardware) VALUES (?,?,?,?,?,?,?,?,?,?);", [computer.inventory_plate, computer.serial, computer.cost, computer.months_warranty, computer.brand, computer.status, computer.buy_date, computer.provider, computer.model, computer.type_hardware]);

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

    public async createUps(req: Request, res: Response): Promise<any> {
        let ups: Ups = req.body;
        try {
            const conn = await connect();
            await conn.query("INSERT INTO hardware (inventory_plate, serial, cost, months_warranty, brand, status, buy_date, provider, model, type_hardware) VALUES (?,?,?,?,?,?,?,?,?,?);", [ups.inventory_plate, ups.serial, ups.cost, ups.months_warranty, ups.brand, ups.status, ups.buy_date, ups.provider, ups.model, ups.type_hardware]);

            await conn.query("INSERT INTO ups (capacity, hardware_inventory_plate) VALUES (?,?);", [ups.capacity, ups.hardware_inventory_plate]);

            conn.end();
            return res.json({
                message: 'Ups created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }

    public async createPeripheral(req: Request, res: Response): Promise<any> {
        let peripheral: Peripheral = req.body;
        try {
            const conn = await connect();
            await conn.query("INSERT INTO hardware (inventory_plate, serial, cost, months_warranty, brand, status, buy_date, provider, model, type_hardware) VALUES (?,?,?,?,?,?,?,?,?,?);", [peripheral.inventory_plate, peripheral.serial, peripheral.cost, peripheral.months_warranty, peripheral.brand, peripheral.status, peripheral.buy_date, peripheral.provider, peripheral.model, peripheral.type_hardware]);

            await conn.query("INSERT INTO peripherals (type_peripheral, hardware_inventory_plate) VALUES (?,?);", [peripheral.type_peripheral, peripheral.hardware_inventory_plate]);

            conn.end();
            return res.json({
                message: 'Peripheral created'
            });
        } catch (e) {
            console.error(e);
            return res.json(e);
        }
    }
}

const hardwareController = new HardwareController();
export default hardwareController;