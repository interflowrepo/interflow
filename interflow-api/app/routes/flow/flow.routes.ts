
import FlowController from "@controller/flow/FlowController";
import { Router } from "express";

const flowRoutes = Router();

// ------------ GET REQUESTS
flowRoutes.get("/getUserCollection/:id", FlowController.getNftsCollection);

export default flowRoutes;
