const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const File = mongoose.model("File");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.use(express.json());

router.get("/api/files", auth, async (req, res) => {
    const files = await File.find({ userId: req.user.id });
    res.status(200).send(files)
});

router.get("/api/files/:fileId", auth, async (req, res) => {
    const file = await File.findOne({ _id: req.params.fileId, userId: req.user.id });

    if (!file) {
      res.sendStatus(404);
    }

    res.status(200).send(file);
});

router.post("/api/files", auth, async (req, res) => {
    const upload = req.files.upload;
    const userId = req.user.id;

    const existing = await File.findOne({ userId, hash: upload.md5 });

    if (existing) {
        req.status(200).send(existing)
    }

    const _id = mongoose.Types.ObjectId();

    // TODO: generate shortened link based on env
    const link = `http://localhost:${process.env.PORT || 8000}/api/files/${_id}`

    const file = new File({ _id, userId: req.user.id, fileName: upload.name, hash: upload.md5, data: upload.data, link });

    await file.save();
    res.status(200).send(file);
});

module.exports = router;
