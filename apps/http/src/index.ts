import express from "express";
import { router } from "./routes/v1";
import Logger from "@repo/logger";
import { HTTP_PORT } from "@repo/config";
const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/hii", (req, res) => {
  Logger.info("Hello World!");
  res.send("Hello World!");
});

app.listen(HTTP_PORT, () => {
  Logger.info(`Server running on port ${HTTP_PORT}`);
});
