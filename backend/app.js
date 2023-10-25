const express = require("express");
const cors = require("cors");

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

const ferryController = require("./Controller/ferryController");
app.use("/", ferryController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
