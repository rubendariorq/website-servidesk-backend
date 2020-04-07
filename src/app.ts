import express, { Application } from 'express';

export class App {

    private app: Application;
    private port: number;

    constructor(port: number){
        this.app = express();
        this.port = port;
    }

    public async listen(): Promise<void>{
        await this.app.listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }

}