import { CircleArrowRightIcon } from '../icons/circle-arrow-right-icon';
import Button from './button'
import Badge from './badge'

function ActionButtons() {
    return (
        <div className="flex gap-4">
            <Button size="large">
                Explore
            </Button>
            <Button size="large" variant="text" endAdornment={<CircleArrowRightIcon className="size-6 stroke-inherit" />}>
                See More
            </Button>
        </div>
    );
};

export default function Hero() {
    return (
        <section
            className="flex w-full items-start justify-center bg-[url('https://tailframes.com/images/squares-bg.webp')] bg-cover bg-center bg-no-repeat"
        >
            <div
                className="m-auto flex max-w-screen-xl grow flex-col items-center justify-start gap-6 py-20 md:gap-12 px-3 sm:px-8 lg:px-16 xl:px-32"
            >
                <s className="size-32" />
                <div className="flex flex-1 flex-col items-center gap-6 text-center">
                    <Badge size="large" variant="secondary">
                        NotesLink
                    </Badge>
                    <div className="flex max-w-lg flex-col gap-6">
                        <h3 className="text-4xl font-semibold text-slate-950 md:text-6xl">
                            Your Only Place for Notes...
                        </h3>
                        <p className="text-lg font-normal leading-7 text-slate-500">
                            We've done it carefully and simply. The materials work well together to create stunning landings.
                        </p>
                    </div>
                </div>
                <ActionButtons />
            </div>
        </section>
    );
};