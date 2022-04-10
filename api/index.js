require("./db/models/User");
require("./db/models/File");
require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload')
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(cors());
app.use(authRoutes);
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
