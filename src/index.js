const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/user.js");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  method: "*",
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/users", authRoutes);
app.get("/api/health", (req, res, next) => {
  res.status(200).send("API is running");
});

app.listen(PORT, async () => {
  try {
    console.log(`Server running on port: ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
