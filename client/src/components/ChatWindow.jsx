import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  messages
}) {
  return (
    <div
      style={{
        height: "500px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "20px"
      }}
    >
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          sender={msg.sender}
          text={msg.text}
        />
      ))}
    </div>
  );
}