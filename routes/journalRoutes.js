import express from "express";
import {
  getAllJournals,
  createJournal,
  getJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalControllers.js";
import {
  validateJournalInputs,
  validateIdParam,
} from "../middlewares/validation.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllJournals)
  .post(upload.single("image"), validateJournalInputs, createJournal);
router
  .route("/:id")
  .get(validateIdParam, getJournal)
  .patch(
    validateIdParam,
    upload.single("image"),
    validateJournalInputs,
    updateJournal
  )
  .delete(validateIdParam, deleteJournal);

export default router;
