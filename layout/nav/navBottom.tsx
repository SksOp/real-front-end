import {
  BookIcon,
  HomeIcon,
  InsightIcon,
  SettingIcon,
  UserIcon,
} from "@/public/svg/navIcons";
import Link from "next/link";
import React from "react";

function NavBottom({
  selected,
  handleIconClick,
}: {
  selected: string;
  handleIconClick: (iconName: string) => void;
}) {
  return (
    <div className="fixed bottom-0  border-2 shadow-lg left-0 px-8 py-6   bg-background w-full flex justify-between items-center z-50 ">
      <Link
        href="/home"
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("home")}
      >
        <HomeIcon isActive={selected === "home"} />
        {selected === "home" && <p className="font-bold text-sm">Home</p>}
      </Link>
      <Link
        href="/insights"
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("insights")}
      >
        <InsightIcon isActive={selected === "insights"} />
        {selected === "insights" && (
          <p className="font-bold text-sm">Insights</p>
        )}
      </Link>
      <Link
        href="/my-page"
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("my-page")}
      >
        <BookIcon isActive={selected === "my-page"} />
        {selected === "my-page" && <p className="font-bold text-sm">My Page</p>}
      </Link>
      <Link
        href="/connections"
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("connections")}
      >
        <UserIcon isActive={selected === "connections"} />
        {selected === "connections" && (
          <p className="font-bold text-sm">Connections</p>
        )}
      </Link>
      <Link
        href="/settings"
        className="flex justify-center items-center gap-2 w-1/5"
        onClick={() => handleIconClick("settings")}
      >
        <SettingIcon isActive={selected === "settings"} />
        {selected === "settings" && (
          <p className="font-bold text-sm">Settings</p>
        )}
      </Link>
    </div>
  );
}

export default NavBottom;
