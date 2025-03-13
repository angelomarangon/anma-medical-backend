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
        this.app.use(cors({
            origin: ["http://localhost:5173", "https://anmamedical.vercel.app"],
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true // Permite el uso de cookies y encabezados de autenticación
        }));
        this.app.use(express.json());

        this.app.use(this.routes);
        
        this.app.listen(this.port, ()=> {
            console.log(`Server running on port ${this.port}`);
        });
    }
}