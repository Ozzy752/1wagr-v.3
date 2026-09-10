import { ShieldCheck, Heart } from 'lucide-react';

const CASINO_LINKS = ['Original Games', 'Slots Portfolio', 'Table Favorites', 'Game Shows'];
const SPORTS_LINKS = ['Live Football', 'Basketball Arena', 'Esports League', 'Super Odds'];
const SUPPORT_LINKS = ['Live Chat 24/7', 'Help Center', 'Self-Exclusion', 'Responsible Gaming'];

export default function Footer() {
  return (
    <footer className="hidden md:block border-t border-border bg-card/60 mt-12">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wide">1WAGR</h4>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              1WAGR offers a next-generation platform for digital entertainment. Fully compliant with modern safety protocols and offering verified odds via public seed generation tools.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wide">CASINO</h4>
            <ul className="mt-3 space-y-2">
              {CASINO_LINKS.map((l) => (
                <li key={l}><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wide">SPORTSBOOK</h4>
            <ul className="mt-3 space-y-2">
              {SPORTS_LINKS.map((l) => (
                <li key={l}><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wide">SUPPORT &amp; SAFETY</h4>
            <ul className="mt-3 space-y-2">
              {SUPPORT_LINKS.map((l) => (
                <li key={l}><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border/50 px-5 py-4">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Licensed and authorized under Curacao regulatory guidelines. It is the player's sole responsibility to inquire about the local laws and regulations of their jurisdiction before registering or participating in any online gambling activities. Gambling can be addictive. Please play responsibly and establish limits according to your budget.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck size={14} className="text-emerald-500" /> Verified Security Protocols
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Heart size={14} className="text-rose-500" /> GamCare Accredited
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">© 2026 1WAGR INC. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
