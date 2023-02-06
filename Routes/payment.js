const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/order", async (request, response) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZOR_ID,
      key_secret: process.env.RAZOR_SEC,
    });

    const options = {
      amount: request.body.amount * 100,
      currency: "USD",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ message: "Something Went Wrong!" });
      }
      response.status(200).json({ data: order });
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post("/verify", async (request, response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      request.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZOR_SEC)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return response
        .status(200)
        .json({ message: "Payment verified Successfully " });
    } else {
      return response.status(500).json({ message: "Invalid Signature send " });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;