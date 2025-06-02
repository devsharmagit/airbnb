import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  TicketSvg,
  HeartSolidSvg,
  HomeModernSvg,
  PlusCircleSvg,
  UserSolidSvg,
  HomeSvg,
} from "../assets/svgs";

function Options({ isVisible }: { isVisible: boolean }) {
  const {pathname} = useLocation();
  console.log(pathname)

  const profileOptions = [
    { to: "/", Svg: HomeSvg, text: "Home" },
    { to: "/account", Svg: UserSolidSvg, text: "Profile" },
    { to: "/place/add-new", Svg: PlusCircleSvg, text: "  Add New Place" },
    { to: "/my-places", Svg: HomeModernSvg, text: "  My Places" },
    { to: "/saved-places", Svg: HeartSolidSvg, text: "  Saved Places" },
    { to: "/booking", Svg: TicketSvg, text: " My Bookings" },
  ];

  return (
    <div 
      className={`profile__options fixed top-0 right-0 h-full w-80 z-[11111111] bg-white border-l border-gray-300 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      } `}
    >
      <div className="pt-20 px-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Menu</h2>
        <div className="space-y-2">
          {profileOptions.map(({ to, Svg, text }, index) => {
            return (
              <Link
                key={to}
                to={to}
                className={`profile__link flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200 transform ${
                  isVisible 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-4 opacity-0'
                }
                ${pathname === to ? "text-primary" : ""}
                ` 
              }
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
                }}
              >
                <Svg className="h-6 w-6 " />
                <span className=" font-medium">{text.trim()}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Options;