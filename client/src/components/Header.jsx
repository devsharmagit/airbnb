import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Options from "./Options.jsx";
import { LogoSvg, BarSvg, UserSolidSvg } from "../assets/svgs";
import SearchPlace from "./SearchPlace.jsx";

function Header() {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const [profileOptions, setProfileOptions] = useState(false);

  const handleProfileOptions = (event) => {
    event.stopPropagation();
    if (!user) return navigate("/login");
    setProfileOptions(!profileOptions);
  };

  const handleEventListener = (event) => {
    if (
      event.target.closest(".profile__options") === null ||
      event.target.closest(".profile__link")
    ) {
      setProfileOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleEventListener);

    return () => {
      document.removeEventListener("click", handleEventListener);
    };
  }, []);

  return (
    <>
      <header className="relative flex items-center justify-between border-b border-gray-300 px-2 py-3 sm:px-4">
        <Link to={"/"} className="hidden items-center gap-1 md:flex">
          <LogoSvg />
          <span className="text-xl font-bold">Airbnb</span>
        </Link>

        <SearchPlace />

        <div
          onClick={handleProfileOptions}
          className="relative flex h-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-2 py-2 sm:px-4"
        >
          <BarSvg className={"hidden sm:inline"} />
          {user?.profilePhoto ? (
            <img className="h-8 w-8 rounded-full object-cover" src={`${user?.profilePhoto?.url}`} />
          ) : (
            <UserSolidSvg />
          )}
          <p className="hidden md:inline">{user?.name}</p>
        </div>
        {profileOptions && <Options />}
      </header>
    </>
  );
}

export default Header;
