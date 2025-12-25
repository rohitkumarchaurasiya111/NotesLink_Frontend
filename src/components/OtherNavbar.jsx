import { Button } from '../components/button';
import { Avatar } from '../components/avatar';
import { useState } from 'react';

import { MenuIcon } from '../icons/menu-icon';
import { SearchIcon } from '../icons/search-icon';
import NotesLinkFullLogo from '../assets/NotesLinkFullLogo.png';

import { Years } from '../constants/Years';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LogoText() {
  return (
    <img
      src={NotesLinkFullLogo}
      alt="NotesLink Logo"
      className="h-8 w-auto object-contain"
    />
  );
}

export default function OtherNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();           //To navigate from one URL to other based on year changes
  const [searchParams] = useSearchParams();

  //Year comes from URL, if not present it will be set to FIRST year
  const year = searchParams.get("year") || Years[0];

  const handleYearChange = (newYear) => {
    navigate(`/subjects?year=${newYear}`);
    setIsMenuOpen(false); // close mobile menu on change
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32 flex items-center justify-between py-4">

        {/* Left */}
        <div className="flex flex-1 items-center gap-2 min-[375px]:gap-4">
          <Button
            variant="text"
            size="xsmall"
            iconOnly
            aria-label="Menu"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <MenuIcon className="stroke-inherit" />
          </Button>
          <LogoText />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          <Button variant="text-default" href="/feature">Feature</Button>
          <Button variant="text-default" href="/about">About</Button>
          <Button variant="text-default" href="/pricing">Pricing</Button>
          <Button variant="text-default" href="/contact">Contact</Button>

          {/* Years Dropdown (Desktop) */}
          <select
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-40 rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm
                       focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Years.map((yr) => (
              <option key={yr} value={yr}>
                {yr.charAt(0) + yr.slice(1).toLowerCase()} Year
              </option>
            ))}
          </select>
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4 md:gap-6">
          <Button variant="text" size="xsmall" iconOnly aria-label="Search">
            <SearchIcon className="stroke-inherit" />
          </Button>
          <Avatar
            size="small"
            elevated
            src="https://www.tailframes.com/images/avatar.webp"
          />
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 shadow-md">
          <nav className="flex flex-col gap-4">
            <a href="/feature" onClick={() => setIsMenuOpen(false)}>Feature</a>
            <a href="/about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</a>

            {/* Years Dropdown (Mobile) */}
            <select
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            >
              {Years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr.charAt(0) + yr.slice(1).toLowerCase()} Year
                </option>
              ))}
            </select>
          </nav>
        </div>
      )}
    </>
  );
}
