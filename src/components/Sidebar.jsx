import React, { useEffect, useCallback } from "react";
import { ChevronRight, X } from "lucide-react";

// Dummy Data

const SIDEBAR_SECTIONS = [
  {
    heading: "Learn",
    items: ["My learning"],
  },
  {
    heading: "New & Featured",
    items: ["Learn AI with Google"],
  },
  {
    heading: "Explore by Goal",
    items: [
      "Learn AI",
      "Launch a new career",
      "Prepare for a certification",
      "Practice with Role Play",
    ],
  },
  {
    heading: "Most Popular",
    items: [
      "Web Development",
      "Mobile Development",
      "Game Development",
      "Entrepreneurship",
    ],
  },
];

// Sub components data

const Avatar = ({ initials }) => (
  <div className="w-12 h-12 rounded-full bg-[#a435f0] flex items-center justify-center text-white font-bold text-lg select-none shrink-0">
    {initials}
  </div>
);

const SidebarItem = ({ label }) => (
  <button className="w-full flex items-center justify-between px-5 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors duration-200 group">
    <span>{label}</span>
    <ChevronRight
      size={16}
      strokeWidth={2}
      className="text-white/30 group-hover:text-white/70 transition-colors duration-200"
    />
  </button>
);

const SidebarSection = ({ heading, items }) => (
  <div className="mb-1">
    <p className="px-5 pt-5 pb-2 text-[11px] font-bold uppercase tracking-widest text-white/40">
      {heading}
    </p>
    {items.map((item) => (
      <SidebarItem key={item} label={item} />
    ))}
  </div>
);

// Main Component Data

const Sidebar = ({ isOpen, onClose, userName = "User", initials = "US" }) => {
  // ESC key listener
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed top-0 left-0 h-full w-[280px] z-50
          bg-[#1c1d1f]
          flex flex-col
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* avator */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10 shrink-0">
          <Avatar initials={initials} />
          <div>
            <p className="text-white font-semibold text-sm">Hi, {userName}</p>
            <p className="text-white/50 text-xs mt-0.5">Welcome back</p>
          </div>
        </div>

        {/* sidebar sections */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {SIDEBAR_SECTIONS.map((section) => (
            <SidebarSection
              key={section.heading}
              heading={section.heading}
              items={section.items}
            />
          ))}
        </nav>
      </div>

      {/* close button */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className={`
          fixed top-4 z-50
          w-9 h-9 rounded-full
          bg-white/15 hover:bg-white/25
          border border-white/20
          flex items-center justify-center
          text-white
          transition-all duration-300
          ${isOpen ? "opacity-100 pointer-events-auto left-[296px]" : "opacity-0 pointer-events-none left-[296px]"}
        `}
      >
        <X size={18} strokeWidth={2} />
      </button>
    </>
  );
};

export default Sidebar;
