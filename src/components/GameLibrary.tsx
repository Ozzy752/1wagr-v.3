import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Game } from '../data';

const BADGE_COLORS: Record<string, string> = {
  FEATURED: 'bg-primary text-primary-foreground',
  NEW: 'bg-emerald-600 text-white',
  LIVE: 'bg-destructive text-white',
  ORIGINAL: 'bg-secondary text-secondary-foreground',
  JACKPOT: 'bg-amber-600 text-white',
};

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group text-left flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px]">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
        {game.thumbnail ? (
          <img src={game.thumbnail} alt={game.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground/30">{game.title[0]}</span>
          </div>
        )}
        {game.badge && (
          <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold ${BADGE_COLORS[game.badge] || 'bg-muted text-foreground'}`}>
            {game.badge}
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
          <span className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg">Play</span>
        </div>
      </div>
      <p className="mt-2 truncate text-sm font-medium text-foreground">{game.title}</p>
      <p className="truncate text-xs text-muted-foreground">{game.studio}</p>
    </button>
  );
}

function ScrollRow({ children, title }: { children: React.ReactNode; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section className="py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => scroll(-1)} className="rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} className="rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div ref={ref} className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {children}
      </div>
    </section>
  );
}

interface GameLibraryProps {
  games: Game[];
  featuredGames: Game[];
  onGameClick: (game: Game) => void;
}

export default function GameLibrary({ games, featuredGames, onGameClick }: GameLibraryProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      {featuredGames.length > 0 && (
        <ScrollRow title="Featured tonight">
          {featuredGames.map((g) => (
            <GameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
          ))}
        </ScrollRow>
      )}
      <div className="border-t border-border">
        {games.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <span className="text-3xl">🎰</span>
            <p className="text-sm text-muted-foreground">No games match — try a different filter.</p>
          </div>
        ) : (
          <ScrollRow title="All games">
            {games.map((g) => (
              <GameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
            ))}
          </ScrollRow>
        )}
      </div>
    </div>
  );
}
