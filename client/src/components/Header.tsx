import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Options from "./Options";
import { LogoSvg, BarSvg, UserSolidSvg } from "../assets/svgs";
import SearchPlace from "./SearchPlace";
import { useAppSelector } from "../hooks/reduxhooks";

function Header() {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();

  const [profileOptions, setProfileOptions] = useState(false);

  const handleProfileOptions = (event : React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!user) return navigate("/login");
    setProfileOptions(!profileOptions);
  };

  const handleEventListener = (event : MouseEvent) => {
    const target = event.target as HTMLElement;
    if(!target) return;
    if (!target.closest(".profile__options") || target.closest(".profile__link")) {
      setProfileOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleEventListener);

    return () => {
      document.removeEventListener("click", handleEventListener);
    };
  }, []);

  
  useEffect(() => {
    if (profileOptions) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [profileOptions]);

  return (
    <>
      <header className="relative flex items-center justify-between border-b border-gray-300 px-2 py-3 sm:px-4 z-10">
        <Link to={"/"} className="hidden items-center gap-1 md:flex">
          <LogoSvg />
          <span className="text-xl font-bold"> Driftbnb </span>
        </Link>

        <SearchPlace />

        <div
          onClick={handleProfileOptions}
          className="relative flex h-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-2 py-2 sm:px-4 hover:shadow-md transition-shadow duration-200"
        >
          <BarSvg className={"hidden sm:inline"} />
          {user?.profilePhoto ? (
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={user.profilePhoto.url}
              alt="Profile"
            />
          ) : (
            <UserSolidSvg />
          )}
          <p className="hidden md:inline">{user?.name}</p>
        </div>
      </header>

      {/* Backdrop */}
      {profileOptions && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-[11111110] transition-opacity duration-300"
          onClick={() => setProfileOptions(false)}
        />
      )}

      {/* Options Panel */}
      <Options isVisible={profileOptions} />
    </>
  );
}

export default Header;