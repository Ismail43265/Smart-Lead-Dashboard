import express from "express";
import {
  createLead,
  deleteLead,
  getLeads,
  getSingleLead,
  updateLead,
} from "../controllers/lead.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.route("/").post(createLead).get(getLeads);

router
  .route("/:id")
  .get(getSingleLead)
  .put(updateLead)
  .delete(adminOnly, deleteLead);

export default router;