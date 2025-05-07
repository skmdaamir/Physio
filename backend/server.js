const express = require("express");
const cors = require("cors");
const path = require("path");
const blogRoutes = require("./blogRouters");


const app = express();
const PORT = 5000;
const adminRoutes = require("./admin");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", blogRoutes);
app.use(bodyParser.json());
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});