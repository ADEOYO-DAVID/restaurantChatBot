const Session = require("../models/Session");

const menu = require("../utils/menu");

const {
    initializePayment
  } = require(
    "../services/paystackService"
  );

exports.startChat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    let session = await Session.findOne({
      sessionId
    });

    if (!session) {
      session = await Session.create({
        sessionId,
        currentOrder: [],
        orderHistory: []
      });
    }

    switch (message) {
      case "1":
        return res.json({
          reply: `
11. Jollof Rice - ₦3500
12. Pizza - ₦7000
13. Shawarma - ₦4500
`
        });

      case "97":
        return res.json({
          reply:
            session.currentOrder.length > 0
              ? JSON.stringify(
                  session.currentOrder
                )
              : "No current order"
        });

      case "98":
        return res.json({
          reply:
            session.orderHistory.length > 0
              ? JSON.stringify(
                  session.orderHistory
                )
              : "No order history"
        });

      case "0":
        session.currentOrder = [];

        await session.save();

        return res.json({
          reply: "Order cancelled"
        });

        case "99":
            if (
              session.currentOrder.length === 0
            ) {
              return res.json({
                reply: "No order to place"
              });
            }
          
            const total =
              session.currentOrder.reduce(
                (acc, item) =>
                  acc + item.price,
                0
              );
          
            return res.json({
              reply: `Total amount is ₦${total}. Click pay button.`,
              checkout: true,
              total
            });

      default:
        const item = menu.find(
          food =>
            food.id === Number(message)
        );

        if (!item) {
          return res.json({
            reply: "Invalid option"
          });
        }

        session.currentOrder.push(item);

        await session.save();

        return res.json({
          reply: `${item.name} added`
        });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.checkout = async (
    req,
    res
  ) => {
    try {
      const { email, amount } =
        req.body;
  
      const payment =
        await initializePayment(
          email,
          amount
        );
  
      res.json(payment);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };