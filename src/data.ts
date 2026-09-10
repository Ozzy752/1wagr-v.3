// Game data types and placeholder data
export interface Game {
  id: string;
  title: string;
  studio: string;
  category: string;
  badge: string;
  featured: boolean;
  thumbnail: string;
}

export const CATEGORIES = [
  'All Games', 'Slots', 'Live Dealers', 'Blackjack', 'Roulette', 'Jackpots', 'New',
] as const;

export const GAMES: Game[] = [
  {
    id: '1', title: 'Mines', studio: 'Betfury', category: 'Slots',
    badge: 'FEATURED', featured: true,
    thumbnail: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/vtD8feX76XqfkbWedFWwjy/pasted-image-1788983840714-er81yfin.jpg',
  },
  {
    id: '2', title: 'VectorFly', studio: '1WAGR Originals', category: 'Slots',
    badge: 'FEATURED', featured: true,
    thumbnail: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/2wf4kF9YRLwSQXriT6iCqY/pasted-image-1788983840754-ejbjiayz.jpg',
  },
  {
    id: '3', title: 'Frenzy Fruit', studio: '1WAGR', category: 'Slots',
    badge: 'NEW', featured: false,
    thumbnail: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/kDf9akNhPq7knHxe2v5cpY/pasted-image-1788983840797-ekfb77ss.jpg',
  },
  {
    id: '4', title: 'WAGR Roulette', studio: 'Evolution', category: 'Live Dealers',
    badge: 'LIVE', featured: false,
    thumbnail: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/gXuH9yD35HZLemEQqXYaUi/pasted-image-1788983840846-0wv5kir9.jpg',
  },
  {
    id: '5', title: 'Lucky 777', studio: 'Pragmatic', category: 'Jackpots',
    badge: 'JACKPOT', featured: false,
    thumbnail: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/cVn82T2CyJWkLQTV7dXfXZ/pasted-image-1788983840908-w801dd4w.jpg',
  },
  {
    id: '6', title: 'Tower Climb', studio: '1WAGR Originals', category: 'Slots',
    badge: 'NEW', featured: false,
    thumbnail: 'https://images.fillout.com/orgid-848652/flowpublicid-h6phfanief/widgetid-default/ombty8wraHrA6JQ83kJDPw/pasted-image-1789002140283-t5vhrrsg.png',
  },
  {
    id: '7', title: 'Blazing Fruit', studio: '1WAGR', category: 'Slots',
    badge: 'NEW', featured: false,
    thumbnail: 'https://images.fillout.com/orgid-848652/flowpublicid-h6phfanief/widgetid-default/vG1NvfR69TasMQBHjNJBvc/pasted-image-1789002140158-ybv62l1j.jpg',
  },
];

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  method: string;
  amount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'player' | 'support';
  text: string;
}

export interface LiveBet {
  id: string;
  game: string;
  user: string;
  time: string;
  betAmount: number;
  multiplier: number;
  payout: number;
}

export const DEPOSIT_METHODS = [
  {
    id: 'visa_mastercard',
    name: 'Visa / Mastercard',
    logo: 'https://images.fillout.com/orgid-848652/flowpublicid-h6phfanief/widgetid-default/9XfhNiffRJXyXc1ozZWNx1/pasted-image-1789000728144-p14i7fed.png',
  },
] as const;

export const WITHDRAWAL_METHODS = [
  {
    id: 'orange_money',
    name: 'Orange Money',
    logo: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/fADPpQqubCTQpjC6g5o8dE/pasted-image-1788983922550-p56a5x1i.jpg',
  },
  {
    id: 'smega',
    name: 'Smega',
    logo: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/qsufeq6bpP7aqKUHnTkkR8/pasted-image-1788983922584-k4e0raml.png',
  },
  {
    id: 'myzaka',
    name: 'MyZaka',
    logo: 'https://images.fillout.com/orgid-848652/flowpublicid-default/widgetid-default/je7gvaYHS1qaVoKeBZ2zAY/pasted-image-1788983922611-6lyazwjh.png',
  },
] as const;

export const PAYMENT_METHODS = [...DEPOSIT_METHODS, ...WITHDRAWAL_METHODS];

const GAME_NAMES = ['MINES', 'VECTORFLY', 'FRENZY FRUIT', 'WAGR ROULETTE', 'LUCKY 777', 'TOWER CLIMB', 'BLAZING FRUIT'];
const FAKE_USERS = ['Cry***ng', 'Dav***eM', 'Pla***77', 'Bet***er', 'Vip***nr', 'Lun***ot', 'Kin***sa', 'Mot***di'];

function randomBet(id: string): LiveBet {
  const game = GAME_NAMES[Math.floor(Math.random() * GAME_NAMES.length)];
  const user = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const betAmount = Math.round((Math.random() * 300 + 10) * 100) / 100;
  const multiplier = Math.round((Math.random() * 10) * 100) / 100;
  const payout = Math.round(betAmount * multiplier * 100) / 100;
  return { id, game, user, time, betAmount, multiplier, payout };
}

export function generateInitialBets(): LiveBet[] {
  return Array.from({ length: 10 }, (_, i) => randomBet(i.toString()));
}

export function generateNewBet(): LiveBet {
  return randomBet(Date.now().toString());
}
