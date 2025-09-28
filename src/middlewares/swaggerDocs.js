// import path from "path";
// import { fileURLToPath } from "url";
// import swaggerUi from "swagger-ui-express";
// import YAML from "yamljs";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const swaggerDocs = YAML.load(path.join(__dirname, "../../docs/openapi.yaml"));

// export function stupSwagger(app) {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// }

import createHttpError from "http-errors";
import swaggerUI from "swagger-ui-express";
import fs from "node:fs";

import { SWAGGER_PATH } from "../constant/index.js";

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.log(err);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
