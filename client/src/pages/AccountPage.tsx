import Heading from "../components/typography/Heading.tsx";
import Profile from "../components/Profile.tsx";

function AccountPage() {
  return (
    <div className="border-t border-gray-300 pt-5">
      <Heading text={"My Profile"} className={" text-center"} />
      <Profile />
    </div>
  );
}

export default AccountPage;
