import { envs } from "./config";
import { MongoDatabase } from "./data";
import { AppRoutes, Server } from "./presentation"

( async () => {
    main()
})()


async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB
    });

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    server.start();
}