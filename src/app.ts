import { envs } from './config';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
    main();
})();

async function main(){
    await new Server(
        envs.PORT,
        AppRoutes.routes
    ).start();
    
}