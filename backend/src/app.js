import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/routes";

const app = express();

/**
 * Express Middleware's.
 */
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Route
 */
app.use("/", router);

export default app;
