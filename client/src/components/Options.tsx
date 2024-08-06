import React from "react";
import { Link } from "react-router-dom";
import {
  TicketSvg,
  HeartSolidSvg,
  HomeModernSvg,
  PlusCircleSvg,
  UserSolidSvg,
  HomeSvg,
} from "../assets/svgs";

function Options() {
  const profileOptions = [
    { to: "/", Svg: HomeSvg, text: "Home" },
    { to: "/account", Svg: UserSolidSvg, text: "Profile" },
    { to: "/place/add-new", Svg: PlusCircleSvg, text: "  Add New Place" },
    { to: "/my-places", Svg: HomeModernSvg, text: "  My Places" },
    { to: "/saved-places", Svg: HeartSolidSvg, text: "  Saved Places" },
    { to: "/booking", Svg: TicketSvg, text: " My Bookings" },
  ];

  return (
    <div className="profile__options   absolute right-0 top-[52px] z-[11111111] overflow-hidden rounded-xl border border-gray-300 bg-white">
      {profileOptions.map(({ to, Svg, text }) => {
        return (
          <Link
            key={to}
            to={to}
            className="profile__link flex items-center gap-2 border-b border-gray-300 px-3  py-2 pt-3  hover:bg-gray-100"
          >
            <Svg className="h-6 w-6" />
            {text}
          </Link>
        );
      })}
    </div>
  );
}

export default Options;
