const axios = require("axios");

const initializePayment = async (
  email,
  amount
) => {
  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      email,
      amount: amount * 100,
      callback_url:
        process.env.CLIENT_URL
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  );

  return response.data.data;
};

module.exports = {
  initializePayment
};