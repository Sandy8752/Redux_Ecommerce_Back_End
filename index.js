const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authUser = require("./Routes/auth");
const cartRoute = require("./Routes/cart");
const paymentRoute = require("./Routes/payment");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((error) => console.log(error));

//MiddleWare
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (request, response) => {
  response.send("Server is running");
});

app.use("/api/auth", authUser);
app.use("/api/cart", cartRoute);
app.use("/api/payment", paymentRoute);

//Listen Port
app.listen(process.env.PORT || 3001, () => {
  console.log("Backend Server is running!!");
});