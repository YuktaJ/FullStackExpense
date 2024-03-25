const express = require("express");
const env = require("dotenv");

env.config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use("/purchase", purchaseRoutes);
async function connection() {
  try {
    mongoose.connect(
      "mongodb+srv://yuktapatil1820:yukta123@expense.vx0p1nl.mongodb.net/"
    );
    app.listen(3000);
    console.log("MongoDb Connection Done!");
  } catch (error) {
    console.log("ERROR!", error);
  }
}

connection();
