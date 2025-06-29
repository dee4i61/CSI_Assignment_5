const express = require("express");
const cors = require("cors");
const app = express();
const searchRoute = require("./routes/search");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/search", searchRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
