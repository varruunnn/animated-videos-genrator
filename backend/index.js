require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN, 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/generate-animation", require("./routes/animation"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/health", require("./routes/health"));
app.use("/api/dev", require("./routes/dev"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
