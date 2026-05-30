const razorpay = require("../config/razorpay");
const config = require("../config/config");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");

const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert into paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      contact,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", config.razorpayKeySecret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Fetch Payment Details in Backend using Razorpay Payment ID
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    console.log("payment Details ", payment);

    // Payment Information
    // const paymentDetails = {
    //   paymentId: payment.id,
    //   orderId: payment.order_id,

    //   amount: payment.amount / 100,
    //   currency: payment.currency,

    //   status: payment.status,

    //   method: payment.method, // card, upi, wallet

    //   captured: payment.captured,

    //   email: payment.email,
    //   contact: payment.contact,

    //   createdAt: new Date(payment.created_at * 1000),

    //   bank: payment.bank,
    //   wallet: payment.wallet,
    //   vpa: payment.vpa,
    // };

    // console.log(paymentDetails);

    // Save payment in DB here
    const newPayment = new Payment({
      paymentId: payment.id,
      orderId: payment.order_id,
      amount: payment.amount / 100, // convert back to rupees
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      createdAt: new Date(payment.created_at * 1000), // convert to milliseconds
      // TODO: check if email and contact are correct or not, if not use the ones from request body, may be in webhook I won't get it
      email: payment.email,
      contact: payment.contact,
    });
    await newPayment.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// webhook for razorpay payment verification - to be used in future for auto-updating payment status without user interaction
// app.post("/webhook", (req, res) => {
//   const secret = config.razorpayKeySecret;

//   const shasum = crypto.createHmac("sha256", secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (digest === req.headers["x-razorpay-signature"]) {
//     console.log("Request is legit");
//     // Process the webhook payload here
//     res.status(200).json({ status: "ok" });
//   } else {
//     console.log("Request is not legit");
//     res.status(400).json({ status: "invalid" });
//   }
// });

module.exports = { createOrder, verifyPayment };
