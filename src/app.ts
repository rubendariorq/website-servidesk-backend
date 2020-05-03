import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//ROUTES
import DependenciesRoutes from './routes/dependencie.routes';
import UserRoutes from "./routes/user.routes";

export class App {

    private app: Application;
    private port: number;

    constructor(port: number){
        this.app = express();
        this.port = port;

        this.middlewares();
        this.routes();
    }

    public middlewares():void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    public routes(): void {
        this.app.use('/api/dependencies', DependenciesRoutes);
        this.app.use('/api/users', UserRoutes);
    }

    public async listen(): Promise<void>{
        await this.app.listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }

}