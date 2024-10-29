import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { ValidateError } from "tsoa";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  const swaggerDocument = await import("../build/swagger.json");
  res.send(swaggerUi.generateHTML(swaggerDocument));
});

app.use((err: unknown, _: ExRequest, res: ExResponse, next: NextFunction) => {
  if (err instanceof ValidateError) {
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  next();
});

RegisterRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port);

export { app };
