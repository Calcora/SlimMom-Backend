import { setupServer } from "./server.js";
import initMongoDB from "./db/initMongoDB.js";
import serverless from "serverless-http";

await initMongoDB();
const exApp = await setupServer();

export default exApp;
export const handler = serverless(exApp);
