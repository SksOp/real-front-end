import {
  BookIcon,
  HomeIcon,
  InsightIcon,
  SettingIcon,
  UserIcon,
} from "@/public/svg/navIcons";
import React from "react";

function NavBottom({
  selected,
  handleIconClick,
}: {
  selected: string;
  handleIconClick: (iconName: string) => void;
}) {
  return (
    <div className="fixed bottom-0  border-2 shadow-lg left-0  px-8 py-6   bg-background w-full flex justify-between items-center z-50 ">
      <div
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("home")}
      >
        <HomeIcon
          className={selected === "home" ? "fill-[#141414]" : "fill-[#BBBBBB]"}
        />
        {selected === "home" && <p className="font-bold text-sm">Home</p>}
      </div>
      <div
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("insights")}
      >
        <InsightIcon
          className={selected === "insights" ? "fill-[#141414]" : ""}
        />
        {selected === "insights" && (
          <p className="font-bold text-sm">Insights</p>
        )}
      </div>
      <div
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("book")}
      >
        <BookIcon className={selected === "book" ? "fill-[#141414]" : ""} />
        {selected === "book" && <p className="font-bold text-sm">Book</p>}
      </div>
      <div
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("users")}
      >
        <UserIcon className={selected === "users" ? "fill-[#141414]" : ""} />
        {selected === "users" && <p className="font-bold text-sm">Users</p>}
      </div>
      <div
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("settings")}
      >
        <SettingIcon
          className={selected === "settings" ? "fill-[#141414]" : ""}
        />
        {selected === "settings" && (
          <p className="font-bold text-sm">Settings</p>
        )}
      </div>
    </div>
  );
}

export default NavBottom;
