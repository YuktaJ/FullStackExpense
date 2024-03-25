const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const downloadFileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("DownloadFiles", downloadFileSchema);
