import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerDocs = () => {
  try {
    // swagger.json dosyasını oku
    // src/middlewares'dan iki üst klasöre çık (proje root), sonra docs'a gir
    const swaggerPath = path.join(
      __dirname,
      "..",
      "..",
      "docs",
      "swagger.json"
    );
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

    // Swagger UI options
    const options = {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true, // JWT token'ı saklar
        displayRequestDuration: true,
        filter: true,
        syntaxHighlight: {
          activate: true,
          theme: "monokai",
        },
      },
      customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info { margin: 20px 0 }
        .swagger-ui .scheme-container { 
          background: #fafafa; 
          padding: 20px; 
          border-radius: 4px; 
        }
      `,
      customSiteTitle: "SlimMoms API Documentation",
    };

    return [swaggerUi.serve, swaggerUi.setup(swaggerDocument, options)];
  } catch (error) {
    console.error("❌ Error loading swagger.json:", error.message);
    // Fallback: Boş swagger döndür
    return [
      swaggerUi.serve,
      swaggerUi.setup({
        openapi: "3.0.0",
        info: {
          title: "SlimMoms API",
          version: "1.0.0",
          description: "Error loading documentation",
        },
        paths: {},
      }),
    ];
  }
};
