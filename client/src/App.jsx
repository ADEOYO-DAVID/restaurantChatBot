import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import API from "./services/api";

import ChatWindow from "./components/ChatWindow";

import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] =
    useState([]);

  const [checkout, setCheckout] =
    useState(false);

  const [amount, setAmount] =
    useState(0);

  let sessionId =
    localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = uuidv4();

    localStorage.setItem(
      "sessionId",
      sessionId
    );
  }

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: `
Select 1 to Place an order
Select 99 to checkout order
Select 98 to see order history
Select 97 to see current order
Select 0 to cancel order
`
      }
    ]);
  }, []);

  const sendMessage = async message => {
    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: message
      }
    ]);

    try {
      const response = await API.post(
        "/chat",
        {
          message,
          sessionId
        }
      );

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: response.data.reply
        }
      ]);

      if (response.data.checkout) {
        setCheckout(true);
      
        setAmount(response.data.total);
      }

    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text:
            "Server error. Please try again."
        }
      ]);
    }
  };

  const handlePayment = async () => {
    try {
      const response =
        await API.post(
          "/checkout",
          {
            email:
              "customer@email.com",
            amount
          }
        );

      window.location.href =
        response.data.authorization_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        fontFamily: "Arial"
      }}
    >
      <h1>Restaurant ChatBot</h1>

      <ChatWindow messages={messages} />

      <ChatInput onSend={sendMessage} />

      {checkout && (
       <button
          onClick={handlePayment}
          style={{
            marginTop: "20px",
            padding: "12px",
            width: "100%"
          }}
  >
          Pay ₦{amount}
       </button>
)}
    </div>
  );
}

export default App;