import { Router } from "express";
import createPatient from "../controllers/patients/createPatient";
import getPatients from "../controllers/patients/getPatients";
import getPatientDetails from "../controllers/patients/getPatientDetails";

const patientRouter = Router();

patientRouter.post("/", createPatient);
patientRouter.get("/", getPatients);
patientRouter.get("/:id", getPatientDetails);

export default patientRouter;
