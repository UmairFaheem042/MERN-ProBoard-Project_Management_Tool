const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/", projectRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
