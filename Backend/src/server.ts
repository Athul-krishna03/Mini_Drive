import mongoose from 'mongoose';
import { env } from './config/env';
import app from './app';


async function main() {
    const uri = env.mongoUri;
    const dbConnection = await mongoose.connect(uri);
    if (dbConnection) {
        console.log("Connected to MongoDB");
    }
    app.listen(env.port, () => console.log(`server running on :${env.port}`));
}


main().catch((e) => {
    console.error(e);
    process.exit(1);
});