import React from "react";
import udemyLogo from "../assets/udemy-logo-white.webp"
import {
  Search,
  ShoppingCart,
  Heart,
  Bell,
  Menu,
} from "lucide-react";

const UdemyLogo = () => (
  <img className="h-full w-auto object-contain" src={udemyLogo} alt="Udemy" />
);

const Avatar = ({ initials = "US" }) => (
  <div className="w-9 h-9 rounded-full bg-[#a435f0] flex items-center justify-center text-white font-bold text-sm select-none cursor-pointer hover:ring-2 hover:ring-[#a435f0] hover:ring-offset-1 hover:ring-offset-black transition-all duration-300">
    {initials}
  </div>
);

const NavTextButton = ({ children }) => (
  <button className="text-[15px] font-medium text-white whitespace-nowrap hover:text-[#cec0fc] transition-colors duration-300">
    {children}
  </button>
);

const IconButton = ({ icon: Icon, label }) => (
  <button
    aria-label={label}
    className="text-white hover:text-[#cec0fc] transition-colors duration-300 p-1"
  >
    <Icon size={22} strokeWidth={1.8} />
  </button>
);

const Header = ({ onMenuClick }) => {
  return (
    <header className="w-full h-20 bg-black flex items-center px-4 md:px-6 gap-3 z-50 relative border-b border-white/10">

      {/* when layout is smaller than 1000 px */}
      <div className="flex items-center justify-between w-full [@media(min-width:1000px)]:hidden">
        
        {/* Hamburger icon for sidebar */}
        <button
          aria-label="Open menu"
          onClick={onMenuClick}
          className="text-white hover:text-[#cec0fc] transition-colors duration-300 p-1"
        >
          <Menu size={24} strokeWidth={1.8} />
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 h-8">
          <UdemyLogo />
        </div>

        {/* Right: Search + Cart */}
        <div className="flex items-center gap-2">
          <IconButton icon={Search} label="Search" />
          <IconButton icon={ShoppingCart} label="Shopping cart" />
        </div>
      </div>

      {/* when layout is smaller than 1000 px */}
      {/* 3 column grids */}
      <div className="hidden [@media(min-width:1000px)]:grid grid-cols-[auto_1fr_auto] items-center w-full gap-4">

        {/* Left Navigation Links */}
        <div className="flex items-center gap-7 h-9">
          <UdemyLogo />
          <NavTextButton>Explore</NavTextButton>
          <NavTextButton>Subscribe</NavTextButton>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-center">
          <div className="flex items-center w-full max-w-xl bg-white/10 border border-white/20 rounded-full px-4 py-2 gap-3 hover:border-white/40 focus-within:border-white/60 focus-within:bg-white/15 transition-all duration-300">
            <Search size={18} className="text-white/50 shrink-0" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Search for anything"
              aria-label="Search for anything"
              className="bg-transparent text-white text-sm placeholder-white/50 outline-none w-full"
            />
          </div>
        </div>

        {/* Navigation Links and Icons */}
        <div className="flex items-center gap-5">
          <NavTextButton>Udemy Business</NavTextButton>
          <NavTextButton>Teach on Udemy</NavTextButton>
          <NavTextButton>My learning</NavTextButton>

          <div className="flex items-center gap-1">
            <IconButton icon={Heart} label="Wishlist" />
            <IconButton icon={ShoppingCart} label="Shopping cart" />
            <IconButton icon={Bell} label="Notifications" />
          </div>

          <Avatar initials="US" />
        </div>
      </div>
    </header>
  );
};

export default Header;
