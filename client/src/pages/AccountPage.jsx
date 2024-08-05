import Heading from "../components/typography/Heading.jsx";
import Profile from "../components/Profile.jsx";

function AccountPage() {
  return (
    <div className="border-t border-gray-300 pt-5">
      <Heading text={"My Profile"} className={" text-center"} />
      <Profile />
    </div>
  );
}

export default AccountPage;
