import { useState } from "react";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SmallDeviceNav from "./SmallDeviceNav";
export default function Header() {
  const [showNav, setShowNav] = useState(false);
  return (
    <header className="bg-brand-white">
      <div className="mx-auto max-w-6xl max-xl:px-4">
        <div className="flex items-center justify-between py-2">
          <Logo />
          <Navigation />
          {showNav && <SmallDeviceNav handleClose={() => setShowNav(false)} />}
          <AuthButtons />
          <button
            onClick={() => setShowNav(true)}
            className="text-brand-green md:hidden"
          >
            <HiOutlineBars3CenterLeft className="text-3xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
