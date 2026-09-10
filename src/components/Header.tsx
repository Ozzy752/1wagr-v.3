import { Menu, Wallet, LogOut, Plus, Sun, Moon } from 'lucide-react';
import { Button } from '@project/components/ui/button';

interface HeaderProps {
  balance: number;
  onMenuOpen: () => void;
  onWalletOpen: () => void;
  onDeposit: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ balance, onMenuOpen, onWalletOpen, onDeposit, darkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-4 md:px-8">
        <button onClick={onMenuOpen} className="text-foreground hover:text-primary transition-colors">
          <Menu size={22} />
        </button>
        <span className="text-xl font-extrabold tracking-[0.2em] text-primary">1WAGR</span>

        <div className="flex-1" />

        {/* Theme toggle */}
        <button onClick={onToggleTheme} className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors" title="Toggle theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Wallet balance */}
        <button onClick={onWalletOpen} className="flex items-center gap-2 rounded-lg bg-muted px-2 py-1.5 hover:bg-muted/80 transition-colors sm:px-3 sm:py-2">
          <Wallet size={16} className="text-muted-foreground" />
          <span className="text-xs font-mono font-medium text-foreground sm:text-sm">
            P {balance.toLocaleString('en-BW', { minimumFractionDigits: 2 })}
          </span>
        </button>

        {/* Deposit button */}
        <Button onClick={onDeposit} size="sm" className="gap-1.5 font-semibold">
          <Plus size={14} /> <span className="hidden sm:inline">Deposit</span>
        </Button>

        {/* Sign out */}
        <button className="hidden items-center gap-1.5 rounded-lg px-2 py-2 text-muted-foreground hover:text-foreground transition-colors sm:flex" title="Sign out">
          <LogOut size={18} />
          <span className="hidden text-sm md:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
