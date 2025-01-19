import React from "react";

function ChatWidget() {
  return (
    <div className="fixed bottom-4 right-4 w-64 h-80 shadow-lg">
      <iframe
        src="https://your-chat-domain.com/widget"
        title="Chat Widget"
        className="w-full h-full border-none"
      ></iframe>
    </div>
  );
}

export default ChatWidget;
