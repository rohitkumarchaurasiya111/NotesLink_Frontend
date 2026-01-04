import { Button } from '../components/button';
import { Avatar } from '../components/avatar';
import { useState } from 'react';

import { MenuIcon } from '../icons/menu-icon';
import { SearchIcon } from '../icons/search-icon';
import NotesLinkFullLogo from '../assets/NotesLinkFullLogo.png';

import { Years } from '../constants/Years';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

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
  return (
    <div className="max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32 flex items-center justify-between py-4">
      <div className="flex flex-1 items-center justify-start gap-2 min-[375px]:gap-4 lg:gap-0">
        <Button variant="text" size="xsmall" iconOnly aria-label="Menu" className="lg:hidden">
          <MenuIcon className="stroke-inherit" />
        </Button>
        <NavLink to="/"><LogoText /></NavLink>
        
      </div>
      <div className="hidden gap-8 lg:flex">
        <Button variant="text-default" href="/feature">
          Feature
        </Button>
        <Button variant="text-default" href="/about">
          About
        </Button>
        <Button variant="text-default" href="/pricing">
          Pricing
        </Button>
        <Button variant="text-default" href="/contact">
          Contact
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4 md:gap-6">
        <Button variant="text" size="xsmall" iconOnly aria-label="Search">
          <SearchIcon className="stroke-inherit" />
        </Button>
        <Avatar size="small" elevated src="https://www.tailframes.com/images/avatar.webp" />
      </div>
    </div>
  );
};

