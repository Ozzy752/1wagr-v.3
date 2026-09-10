import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Toaster } from '@project/components/ui/sonner';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import GameLibrary from './components/GameLibrary';
import LiveBetsNetwork from './components/LiveBetsNetwork';
import SideCabinet from './components/SideCabinet';
import WalletModal from './components/WalletModal';
import AccountModal from './components/AccountModal';
import SupportChat from './components/SupportChat';
import BottomNav from './components/BottomNav';
import SportsComingSoon from './components/SportsComingSoon';
import Footer from './components/Footer';
import { GAMES, type Transaction, type ChatMessage } from './data';

export default function App() {
  const [category, setCategory] = useState('All Games');
  const [bottomTab, setBottomTab] = useState<'home' | 'casino' | 'sports'>('home');
  const [cabinetOpen, setCabinetOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [sportsPage, setSportsPage] = useState(false);
  const [balance, setBalance] = useState(1240);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'support', text: 'Evening — how can we help tonight?' },
  ]);
  const [darkMode, setDarkMode] = useState(true);
  const gamesRef = useRef<HTMLDivElement>(null);

  // Apply dark class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredGames = useMemo(() => {
    return GAMES.filter((g) => {
      const matchesCategory = category === 'All Games'
        || (category === 'New' && g.badge === 'NEW')
        || g.category === category;
      return matchesCategory;
    });
  }, [category]);

  const featuredGames = useMemo(() => filteredGames.filter((g) => g.featured), [filteredGames]);

  const handleNavigate = useCallback((dest: 'lobby' | 'wallet' | 'account' | 'support') => {
    if (dest === 'wallet') setWalletOpen(true);
    else if (dest === 'account') setAccountOpen(true);
    else if (dest === 'support') setSupportOpen(true);
  }, []);

  const handleSendChat = useCallback((text: string) => {
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'player', text },
    ]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'support', text: "Thanks for reaching out! We'll get back to you shortly." },
      ]);
    }, 1200);
  }, []);

  const handleEnterLobby = useCallback(() => {
    gamesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleBottomTab = useCallback((tab: 'home' | 'casino' | 'sports') => {
    setBottomTab(tab);
    if (tab === 'sports') setSportsPage(true);
    else setSportsPage(false);
  }, []);

  if (sportsPage) {
    return (
      <>
        <SportsComingSoon onBack={() => { setSportsPage(false); setBottomTab('home'); }} />
        <BottomNav active={bottomTab} onChange={handleBottomTab} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        balance={balance}
        onMenuOpen={() => setCabinetOpen(true)}
        onWalletOpen={() => setWalletOpen(true)}
        onDeposit={() => setWalletOpen(true)}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((d) => !d)}
      />
      <HeroBanner onEnterLobby={handleEnterLobby} onSportsClick={() => { setSportsPage(true); setBottomTab('sports'); }} />
      <CategoryFilter active={category} onChange={setCategory} />
      <div ref={gamesRef}>
        <GameLibrary
          games={filteredGames}
          featuredGames={featuredGames}
          onGameClick={() => {}}
        />
      </div>
      <LiveBetsNetwork />
      <div className="h-24 md:h-12" />
      <SideCabinet
        open={cabinetOpen}
        onClose={() => setCabinetOpen(false)}
        onNavigate={handleNavigate}
        activeDest="lobby"
      />
      <WalletModal
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        balance={balance}
        onBalanceChange={setBalance}
        transactions={transactions}
        onAddTransaction={(t) => setTransactions((prev) => [t, ...prev])}
      />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
      <SupportChat open={supportOpen} onClose={() => setSupportOpen(false)} messages={chatMessages} onSend={handleSendChat} />
      <Footer />
      <BottomNav active={bottomTab} onChange={handleBottomTab} />
      <Toaster position="top-center" />
    </div>
  );
}
