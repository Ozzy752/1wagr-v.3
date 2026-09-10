import { useState, useEffect, useCallback } from 'react';
import { Button } from '@project/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { GAMES } from '../data';

const HERO_IMAGE = 'https://images.fillout.com/848652/h6phfanief/generated-images/cyJe5TemupAyoDXVxS5Zrp/img_FzC29x0rfT0ww54U.jpg';
const SPORTS_IMAGE = 'https://images.fillout.com/orgid-848652/flowpublicid-h6phfanief/widgetid-default/wm1dPpfvfRr5Es2WSFNiJy/pasted-image-1788984379740-pte40be7.jpg';

const mines = GAMES.find((g) => g.id === '1')!;
const aviator = GAMES.find((g) => g.id === '2')!;

interface HeroBannerProps {
  onEnterLobby: () => void;
  onSportsClick: () => void;
}

export default function HeroBanner({ onEnterLobby, onSportsClick }: HeroBannerProps) {
  const [active, setActive] = useState(0);
  const total = 4;

  const next = useCallback(() => setActive((i) => (i + 1) % total), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
      <div className="relative overflow-hidden rounded-xl border border-border">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          <SlideReserve onEnterLobby={onEnterLobby} />
          <SlideGame game={mines} onPlay={onEnterLobby} />
          <SlideGame game={aviator} onPlay={onEnterLobby} />
          <SlideSports onClick={onSportsClick} />
        </div>

        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors backdrop-blur-sm">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors backdrop-blur-sm">
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-primary' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SlideReserve({ onEnterLobby }: { onEnterLobby: () => void }) {
  return (
    <div className="relative min-w-full bg-card">
      <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
      <div className="relative flex min-h-[240px] items-center px-6 py-8 md:min-h-[280px] md:px-10 md:py-12">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">1WAGR Reserve</span>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-card-foreground md:mt-4 md:text-4xl lg:text-5xl">
            The table is set<br />after dark.
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground md:mt-4 md:text-base">
            Curated games, private-room energy, and a wallet that moves at your pace.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button onClick={onEnterLobby} size="lg" className="gap-2 font-semibold">
              Enter the lobby <ArrowUpRight size={16} />
            </Button>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Live tables open</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideGame({ game, onPlay }: { game: typeof mines; onPlay: () => void }) {
  return (
    <div className="relative min-w-full">
      <img src={game.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
      <div className="relative flex min-h-[240px] items-center px-6 py-8 md:min-h-[280px] md:px-10 md:py-12">
        <div className="flex items-center gap-6">
          <img src={game.thumbnail} alt={game.title} className="hidden h-32 w-24 rounded-lg object-cover shadow-xl md:block lg:h-40 lg:w-28" />
          <div className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Featured Game</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white md:mt-4 md:text-4xl lg:text-5xl">
              {game.title}
            </h2>
            <p className="mt-2 text-sm text-white/60">{game.studio}</p>
            <p className="mt-3 max-w-md text-sm text-white/70 md:text-base">
              {game.title === 'Mines'
                ? 'Test your nerve — uncover gems, dodge bombs. How deep will you go?'
                : 'Ride the multiplier as the plane climbs. Cash out before it flies away.'}
            </p>
            <Button onClick={onPlay} size="lg" className="mt-6 gap-2 font-semibold md:mt-8">
              Play {game.title} <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideSports({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative min-w-full">
      <img src={SPORTS_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="relative flex min-h-[240px] items-center px-6 py-8 md:min-h-[280px] md:px-10 md:py-12">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Sports</span>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white md:mt-4 md:text-4xl lg:text-5xl">
            Sports Betting
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/70 md:mt-4 md:text-base">
            Football, basketball, cricket and more — live odds and in-play markets on 1WAGR.
          </p>
          <Button onClick={onClick} size="lg" className="mt-6 gap-2 font-semibold md:mt-8">
            Explore Sports <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
