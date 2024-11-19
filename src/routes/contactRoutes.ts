import { Router } from "express";
import { handleContactSubmission } from "../controllers/contractController";
import { validateContactRequest } from "../middleware/validateContact";

const router = Router();

router.post("/contact", validateContactRequest, handleContactSubmission);

export default router;
