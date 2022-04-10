const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const {ObjectID} = require("mongoose/lib/schema");

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    hash: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: ObjectID,
      required: true
    },
    data: {
      type: Buffer,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  { timeStamps: true }
);

mongoose.model("File", fileSchema);
