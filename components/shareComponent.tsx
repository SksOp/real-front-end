import Image from "next/image";
import React from "react";

function ShareComponent() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-secondary text-lg">Share With</h3>
      <div className="flex justify-around items-center">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/imgs/telegram.png"
            alt="telegram"
            width={50}
            height={50}
          />
          <p>Telegram</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/imgs/facebook.png"
            alt="telegram"
            width={50}
            height={50}
          />
          <p>Facebook</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/imgs/whatsapp.png"
            alt="telegram"
            width={50}
            height={50}
          />
          <p>Whatsapp</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src="/imgs/reddit.png" alt="telegram" width={50} height={50} />
          <p>Reddit</p>
        </div>
      </div>
    </div>
  );
}

export default ShareComponent;
