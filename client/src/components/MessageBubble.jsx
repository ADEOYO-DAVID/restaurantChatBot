export default function MessageBubble({
    sender,
    text
  }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent:
            sender === "user"
              ? "flex-end"
              : "flex-start",
          marginBottom: "10px"
        }}
      >
        <div
          style={{
            background:
              sender === "user"
                ? "#007bff"
                : "#f1f1f1",
            color:
              sender === "user"
                ? "white"
                : "black",
            padding: "10px",
            borderRadius: "10px",
            maxWidth: "70%",
            whiteSpace: "pre-wrap"
          }}
        >
          {text}
        </div>
      </div>
    );
  }