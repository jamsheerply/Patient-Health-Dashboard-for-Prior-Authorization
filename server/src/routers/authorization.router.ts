import { Router } from "express";
import createAuthRequest from "../controllers/authorization/createAuthRequest";
import getAuthRequests from "../controllers/authorization/getAuthRequests";
import getAuthRequestDetails from "../controllers/authorization/getAuthRequestDetails";

const authorizationRouter = Router();

authorizationRouter.post("/", createAuthRequest);
authorizationRouter.get("/", getAuthRequests);
authorizationRouter.get("/:id", getAuthRequestDetails);

export default authorizationRouter;
