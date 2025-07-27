// routes/otp.js
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Store OTPs temporarily (for demo only)
let otpStorage = {};

router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStorage[phone] = otp;

  try {
    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (otpStorage[phone] && otpStorage[phone] == otp) {
    delete otpStorage[phone];
    return res.status(200).json({ success: true, message: "OTP verified" });
  }
  return res.status(400).json({ success: false, message: "Invalid OTP" });
});

module.exports = router;
