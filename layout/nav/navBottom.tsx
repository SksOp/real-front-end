import {
  BookIcon,
  HomeIcon,
  InsightIcon,
  SettingIcon,
  UserIcon,
} from "@/public/svg/navIcons";
import Link from "next/link";
import React from "react";

function NavBottom({ selected }: { selected: string }) {
  return (
    <div className="fixed bottom-0  border-2 shadow-lg left-0  py-4  bg-background w-full flex justify-around items-center z-50 ">
      <Link
        href="/dashboard/home"
        className="flex flex-col justify-center items-center w-1/3"
      >
        <HomeIcon isActive={selected === "home"} />
        {selected === "home" && <p className="font-bold text-sm">Home</p>}
      </Link>
      <Link
        href="/dashboard/insights"
        className="flex flex-col justify-center items-center w-1/3"
      >
        <InsightIcon isActive={selected === "insights"} />
        {selected === "insights" && (
          <p className="font-bold text-sm">Insights</p>
        )}
      </Link>
      {/* <Link
        href="/dashboard/my-page"
        className="flex flex-col justify-center items-center w-1/5"
      >
        <BookIcon isActive={selected === "my-page"} />
        {selected === "my-page" && <p className="font-bold text-sm">My Page</p>}
      </Link>
      <Link
        href="/dashboard/connections"
        className="flex flex-col justify-center items-center w-1/5"
      >
        <UserIcon isActive={selected === "connections"} />
        {selected === "connections" && (
          <p className="font-bold text-sm">Connections</p>
        )}
      </Link> */}
      <Link
        href="/dashboard/settings"
        className="flex flex-col justify-center items-center w-1/3"
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
