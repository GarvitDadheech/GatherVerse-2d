import express from "express";
import { router } from "./routes/v1";
import Logger from "@repo/logger";
const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/hii", (req, res) => {
    Logger.info("Hello World!");
    res.send("Hello World!");
});

app.listen(process.env.PORT || 3000);
