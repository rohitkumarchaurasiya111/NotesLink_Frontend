import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { Divider } from "../components/divider";
import { Input } from "../components/input";

import { FacebookCircleIcon } from '../icons/facebook-circle-icon';
import { GitHubOctocatIcon } from '../icons/github-octocat-icon';
import { InstagramIcon } from '../icons/instagram-icon';
import { SentIcon } from '../icons/sent-icon';
import NotesLinkFullLogo from '../assets/NotesLinkFullLogo.png';

function LogoText() {
  return (
    <img src={NotesLinkFullLogo} alt="NotesLink - Study Smarter Not Harder" width={160} height={36} className="block" />
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col">
      <p className="mb-4 text-sm font-semibold leading-tight text-blue-950">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {links.map((link, index) => (
          <Link 
            key={index} 
            to={link.href} 
            className="text-sm leading-tight text-slate-500 hover:text-[#4f46e5] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const academicResources = [
    { label: "Study Notes", href: "/subjects" },
    { label: "Previous Year Papers (PYQs)", href: "/subjects" },
    { label: "Reference Books", href: "/books" },
    { label: "Academic Projects", href: "/projects" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutus" },
    { label: "Contact Support", href: "/contactus" },
    { label: "College Login", href: "/login" },
  ];

  const communityLinks = [
    { label: "Contribute Notes", href: "/contactus" },
    { label: "Request Your College", href: "/contactus" },
    { label: "Report Broken PDF", href: "/contactus" },
    { label: "Student Guidelines", href: "/aboutus" },
  ];

  return (
    <footer className="w-full bg-white border-t border-slate-200">
      <div className="flex flex-col gap-2 py-10 max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32">
        <div className="mb-6 flex w-full flex-col-reverse gap-12 lg:mb-16 lg:flex-row lg:gap-24">
          
          {/* Footer Navigation Columns */}
          <div className="grid grow grid-cols-1 gap-10 text-center md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:text-start 2xl:gap-24">
            <FooterColumn title="Academic Hub" links={academicResources} />
            <FooterColumn title="Platform" links={quickLinks} />
            <FooterColumn title="Community & Support" links={communityLinks} />
          </div>

          {/* Newsletter / Updates Section */}
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <div>
              <p className="font-semibold leading-normal text-slate-900">
                Stay updated with exam resources
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Get notified when new PYQ solutions and semester notes drop.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full flex-col items-start gap-2 min-[432px]:w-auto min-[432px]:min-w-[400px] min-[432px]:flex-row"
            >
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your personal email" 
                size="large" 
                required 
              />
              <Button
                variant="primary"
                size="large"
                endAdornment={<SentIcon className="stroke-inherit" />}
                className="w-full min-w-fit min-[432px]:w-auto bg-[#4f46e5] hover:bg-[#4338ca] text-white"
                type="submit"
              >
                Subscribe
              </Button>
            </form>
            <p className="max-w-xs text-xs leading-tight text-slate-400">
              *We only send curated study material alerts and curriculum updates. No spam.
            </p>
          </div>
        </div>

        <Divider direction="horizontal" className="hidden lg:block" />

        {/* Bottom Bar: Brand & Socials */}
        <div className="flex w-full flex-col-reverse items-center justify-between gap-6 text-center pt-4 lg:flex-row lg:items-center lg:gap-0 lg:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <LogoText />
            <span className="text-xs text-slate-400 sm:border-l sm:border-slate-200 sm:pl-3">
              © {new Date().getFullYear()} NotesLink. Study Smarter, Not Harder.
            </span>
          </div>

          <Divider direction="horizontal" className="my-2 lg:hidden" />

          <div className="flex gap-6">
            <Button variant="text" size="small" iconOnly aria-label="facebook" href="https://www.facebook.com">
              <FacebookCircleIcon />
            </Button>
            <Button variant="text" size="small" iconOnly aria-label="instagram" href="https://www.instagram.com">
              <InstagramIcon />
            </Button>
            <Button variant="text" size="small" iconOnly aria-label="github" href="https://www.github.com">
              <GitHubOctocatIcon />
            </Button>
          </div>
        </div>

      </div>
    </footer>
  );
}