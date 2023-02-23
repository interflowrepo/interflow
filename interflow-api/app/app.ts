require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? "./.env.test" : "./.env",
});

import express from "express";
import strongErrorHandler from "strong-error-handler";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users/user.routes";
import walletRoutes from "@routes/wallets/wallet.routes";
import "./config"
import postRoutes from "@routes/posts/posts.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(
      cors({
        origin: [
          "*",
        ],
      })
    );
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(
      strongErrorHandler({
        debug: true,
      })
    );
  }

  private routes(): void {
    this.app.use(userRoutes);
    this.app.use(walletRoutes);
    this.app.use(postRoutes)

    this.app.get("/healthz", (req, res) => {
      res.json({ interflowAuth: true });
    });
  }
}

export default new App().app;
