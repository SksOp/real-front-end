import React from "react";

function ShareComponent() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-secondary text-lg">Share With</h3>
      <div className="flex justify-around items-center">
        <div className="flex flex-col justify-center items-center">
          <img src="/imgs/telegram.png" alt="telegram" />
          <p>Telegram</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="/imgs/facebook.png" alt="telegram" />
          <p>Facebook</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="/imgs/whatsapp.png" alt="telegram" />
          <p>Whatsapp</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="/imgs/reddit.png" alt="telegram" />
          <p>Reddit</p>
        </div>
      </div>
    </div>
  );
}

export default ShareComponent;
