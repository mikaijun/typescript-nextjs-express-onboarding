import express, { Request, Response } from "express";

const app = express();
const port = 8080;

app.get("/", (_: Request, res: Response) => {
  res.send("Hello Express!");
});

app.listen(port);
