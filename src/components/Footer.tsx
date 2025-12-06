import { Button } from "../components/button";
import { Divider } from "../components/divider";
import { Input } from "../components/input";

import { DribbleIcon} from '../icons/dribble-icon';
import {FacebookCircleIcon } from '../icons/facebook-circle-icon';
import {GitHubOctocatIcon} from '../icons/github-octocat-icon';
import {InstagramIcon } from '../icons/instagram-icon';
import {SentIcon} from '../icons/sent-icon';
import NotesLinkFullLogo from '../assets/NotesLinkFullLogo.png'


function LogoText() {
  return (
    <img src={NotesLinkFullLogo} alt="NotesLink" width={160} height={36} className="block" />
  );
};

function FooterColumn() {
  return (
    <div className="flex flex-col">
      <p className="mb-4 text-sm font-semibold leading-tight text-blue-950">
        Column
      </p>
      <div className="flex flex-col gap-4">
        <a href="/" className="text-sm leading-tight text-slate-500">
          Footer Link
        </a>
        <a href="/" className="text-sm leading-tight text-slate-500">
          Footer Link
        </a>
        <a href="/" className="text-sm leading-tight text-slate-500">
          Footer Link
        </a>
        <a href="/" className="text-sm leading-tight text-slate-500">
          Footer Link
        </a>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <div className="flex flex-col gap-2 py-6 max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32">
      <div className="mb-6 flex w-full flex-col-reverse gap-12 lg:mb-24 lg:flex-row lg:gap-24">
        <div
          className="grid grow grid-cols-1 gap-12 text-center md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:text-start 2xl:gap-24 min-[1800px]:grid-cols-4"
        >
          <FooterColumn />
          <FooterColumn />
          <FooterColumn />
        </div>
        <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <p className="font-semibold leading-normal text-black">
            Receive latest news
          </p>
          <form
            className="flex w-full flex-col items-start gap-2 min-[432px]:w-auto min-[432px]:min-w-[400px] min-[432px]:flex-row"
          >
            <Input id="email" type="email" placeholder="Enter your e-mail address*" size="large" required />
            <Button
              variant="primary"
              size="large"
              endAdornment={<SentIcon className="stroke-inherit" />}
              className="w-full min-w-fit min-[432px]:w-auto"
              type="submit"
            >
              Get Started
            </Button>
          </form>
          <p className="max-w-xs text-sm leading-tight text-slate-500">
            *by entering your e-mail address you confirming that you're agree to subscribe to our newsletter.
          </p>
        </div>
      </div>
      <Divider direction="horizontal" className="hidden lg:block" />
      <div
        className="flex w-full flex-col-reverse items-center gap-6 text-center lg:flex-row lg:items-center lg:gap-0 lg:text-left"
      >
        <div className="m-auto lg:w-full">
          <LogoText />
        </div>
        <Divider direction="horizontal" className="my-2 lg:hidden" />
        <div className="flex gap-8">
          <Button variant="text" size="small" iconOnly aria-label="facebook" href="https://www.facebook.com">
            <FacebookCircleIcon />
          </Button>
          <Button variant="text" size="small" iconOnly aria-label="instagram" href="https://www.instagram.com">
            <InstagramIcon />
          </Button>
          {/* <Button variant="text" size="small" iconOnly aria-label="dribble" href="https://www.dribbble.com">
            <DribbleIcon />
          </Button> */}
          <Button variant="text" size="small" iconOnly aria-label="dribble" href="https://www.github.com">
            <GitHubOctocatIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};