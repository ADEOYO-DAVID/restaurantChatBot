const express = require("express");

const router = express.Router();

const {
  startChat,
  checkout
} = require(
  "../controllers/chatController"
);

router.post("/chat", startChat);

router.post("/checkout", checkout);

module.exports = router;