import express, { Router } from 'express';
import cors from 'cors';


export class Server{
    public readonly app = express();
    public readonly port: number;
    public readonly routes: Router

    constructor(
        port:number,
        routes: Router
    ) {

        this.port = port;
        this.routes = routes;
    }

    async start(){
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use(this.routes);
        
        this.app.listen(this.port, ()=> {
            console.log(`Server running on port ${this.port}`);
        });
    }
}