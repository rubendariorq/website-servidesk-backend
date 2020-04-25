import express, { Application } from 'express';
import morgan from 'morgan';

//ROUTES
import DependenciesRoutes from './routes/dependencie.routes';

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
        this.app.use(express.json());
    }

    public routes(): void {
        this.app.use('/api/dependencies', DependenciesRoutes);
    }

    public async listen(): Promise<void>{
        await this.app.listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }

}