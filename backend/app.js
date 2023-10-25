const express = require("express");

const PORT = 8000;
const app = express();

app.use(express.json());

const ferryController = require("./Controller/ferryController");
app.use("/", ferryController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
