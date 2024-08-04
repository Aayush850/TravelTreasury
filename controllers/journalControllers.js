import { StatusCodes } from "http-status-codes";
import Journal from "../models/journalModel.js";
import cloudindary from "cloudinary";
import { promises as fs } from "fs";

const getAllJournals = async (req, res) => {
  const journals = await Journal.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ journals });
};

const createJournal = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const response = await cloudindary.v2.uploader.upload(req.file.path, {
    folder: "travel-treasury",
  });
  await fs.unlink(req.file.path);
  req.body.image = response.secure_url;
  req.body.imagePublicId = response.public_id;
  const journal = await Journal.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Journal created", journal });
};

const getJournal = async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  res.status(StatusCodes.OK).json({ journal });
};

const updateJournal = async (req, res) => {
  if (req.file) {
    const response = await cloudindary.v2.uploader.upload(req.file.path, {
      folder: "travel-treasury",
    });
    await fs.unlink(req.file.path);
    req.body.image = response.secure_url;
    req.body.imagePublicId = response.public_id;
  }
  const journal = await Journal.findByIdAndUpdate(req.params.id, req.body);

  if (req.file && journal.imagePublicId) {
    await cloudindary.v2.uploader.destroy(journal.imagePublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "Journal edited", journal });
};

const deleteJournal = async (req, res) => {
  const journal = await Journal.findByIdAndDelete(req.params.id);
  await cloudindary.v2.uploader.destroy(journal.imagePublicId);
  res.status(StatusCodes.OK).json({ msg: "Journal deleted" });
};

export {
  getAllJournals,
  createJournal,
  getJournal,
  updateJournal,
  deleteJournal,
};
