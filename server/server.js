const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

app.use(cors());
app.use(express.json());
connectDB();

const _dirname = path.resolve();

app.use("/", projectRoutes);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
