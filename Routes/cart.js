const Cart = require("../Models/Cart");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../verifyToken");
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/products", verifyToken, async (request, response) => {
  try {
    const newItem = new Cart({
      product: request.body.title,
      category: request.body.category,
      price: request.body.price,
      userid: request.body.userid,
      image: request.body.image,
    });
    const savedItem = newItem.save();
    response.status(200).json({
      message: "Added to Cart!",
      savedItem,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/", verifyToken, async (request, response) => {
  try {
    let cart = await Cart.find({ userid: request.body.userid });
    response.status(200).json(cart);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.put("/", verifyToken, async (request, response) => {
  try {
    await Cart.updateOne(
      {
        _id: request.body.id,
      },
      {
        $inc: { quantity: 1 },
      }
    );
    response.status(200).json({ message: "quantity increased" });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.put("/dec", verifyToken, async (request, response) => {
  try {
    await Cart.updateOne(
      {
        _id: request.body.id,
      },
      {
        $inc: { quantity: -1 },
      }
    );
    response.status(200).json({ message: "quantity deceresed" });
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;