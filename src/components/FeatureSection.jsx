import { Button } from '../components/button';
import { Avatar } from '../components/avatar';

import { AtomIcon} from '../icons/atom-icon';
import { BeeIcon } from '../icons/bee-icon';
import { CircleArrowRightIcon } from '../icons/circle-arrow-right-icon';
import { ClubsIcon } from '../icons/clubs-icon';

function AvatarCard({ icon }) {
  return (
    <div className="flex max-w-xs flex-col gap-6 items-center">
      <Avatar icon={icon} elevated />
      <div className="flex flex-col gap-4 md:gap-6 items-center text-center">
        <p className="text-xl font-semibold">
          Headline
        </p>
        <p className="text-base text-slate-500">
          We've done it carefully and simply. Combined with the ingredients makes for beautiful landings.
        </p>
        <Button
          size="large"
          variant="text"
          className="p-0"
          endAdornment={<CircleArrowRightIcon className="size-6 stroke-inherit" />}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default function FeatureSection() {
  return (
    <section
      className="flex flex-col items-center gap-y-12 py-12 2xl:py-16 max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32"
>
      <div
        className="mb-0 flex max-w-[260px] flex-col items-center justify-center gap-6 text-center md:col-span-3 md:mb-4 md:max-w-full"
      >
        <p className="text-sm font-semibold uppercase text-slate-500">
          Tailframes
        </p>
        <h3 className="max-w-[340px] text-4xl font-semibold tracking-tight md:text-5xl lg:max-w-none">
          Copy & Paste. It's that simple.
        </h3>
      </div>
      <div
        className="grid w-full grid-flow-row justify-items-center gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-32"
      >
        <AvatarCard icon={<AtomIcon className="size-6 stroke-inherit" />} />
        <AvatarCard icon={<BeeIcon className="size-6 stroke-inherit" />} />
        <AvatarCard icon={<ClubsIcon className="size-6 stroke-inherit" />} />
      </div>
    </section>
  );
};