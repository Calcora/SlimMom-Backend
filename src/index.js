import { setupServer } from "./server.js";
import initMongoDB from "./db/initMongoDB.js";
const startServer = async () => {
  await initMongoDB();
  setupServer();
};

startServer();
