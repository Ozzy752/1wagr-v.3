import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { DEPOSIT_METHODS, WITHDRAWAL_METHODS, PAYMENT_METHODS, type Transaction } from '../data';
import { toast } from 'sonner';

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  balance: number;
  onBalanceChange: (b: number) => void;
  transactions: Transaction[];
  onAddTransaction: (t: Transaction) => void;
}

export default function WalletModal({ open, onClose, balance, onBalanceChange, transactions, onAddTransaction }: WalletModalProps) {
  const [tab, setTab] = useState<'deposit' | 'withdrawal'>('deposit');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('visa_mastercard');
  const [phone, setPhone] = useState('');

  if (!open) return null;

  const numAmount = parseFloat(amount) || 0;

  const handleConfirm = () => {
    if (numAmount <= 0) { toast.error('Enter a valid amount'); return; }
    if (tab === 'withdrawal' && numAmount > balance) { toast.error('Insufficient balance'); return; }
    if (!phone.trim()) { toast.error(tab === 'deposit' ? 'Enter your card number' : 'Enter your mobile number'); return; }

    const methodName = PAYMENT_METHODS.find((m) => m.id === method)?.name ?? method;
    const newBalance = tab === 'deposit' ? balance + numAmount : balance - numAmount;
    onBalanceChange(newBalance);
    onAddTransaction({
      id: Date.now().toString(),
      type: tab,
      method: methodName,
      amount: numAmount,
    });
    toast.success(`${tab === 'deposit' ? 'Deposit' : 'Withdrawal'} of P ${numAmount.toFixed(2)} confirmed`);
    setAmount('');
    setPhone('');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border border-border bg-popover p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Wallet</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
          </div>

          <div className="mt-3 rounded-lg bg-muted p-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Available balance</p>
            <p className="mt-0.5 text-2xl font-bold font-mono text-foreground">P {balance.toLocaleString('en-BW', { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="mt-3 flex gap-1 rounded-lg border border-border p-1">
            {(['deposit', 'withdrawal'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setMethod(t === 'deposit' ? 'visa_mastercard' : 'orange_money'); setPhone(''); }}
                className={`flex-1 rounded-md py-2 text-center text-sm font-semibold transition-colors ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t === 'deposit' ? 'Deposit' : 'Withdraw'}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <p className="text-sm font-medium text-foreground">Amount</p>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 font-mono"
            />
            <div className="mt-2 flex gap-2">
              {[50, 100, 500].map((v) => (
                <button key={v} onClick={() => setAmount(v.toString())} className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  P{v}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm font-medium text-foreground">Payment method</p>
            <div className={`mt-1.5 grid gap-2 ${tab === 'deposit' ? 'grid-cols-1' : 'grid-cols-3'}`}>
              {(tab === 'deposit' ? DEPOSIT_METHODS : WITHDRAWAL_METHODS).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`rounded-lg border px-2 py-2 text-center transition-colors ${method === m.id ? 'border-primary' : 'border-border hover:border-foreground/30'}`}
                >
                  <img src={m.logo} alt={m.name} className={`mx-auto rounded-md object-contain ${tab === 'deposit' ? 'h-6' : 'h-8 w-8'}`} />
                  <p className={`mt-1 text-xs ${method === m.id ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{m.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm font-medium text-foreground">{tab === 'deposit' ? 'Card number' : 'Mobile number'}</p>
            <Input placeholder={tab === 'deposit' ? '4000 1234 5678 9010' : '+267 71 234 567'} value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 font-mono" />
          </div>

          <Button onClick={handleConfirm} className="mt-4 w-full font-semibold" size="default">
            Confirm {tab === 'deposit' ? 'deposit' : 'withdrawal'}
          </Button>

          {transactions.length > 0 && (
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-sm font-medium text-foreground">Recent activity</p>
              <div className="mt-2 space-y-1.5">
                {transactions.slice(0, 3).map((t) => (
                  <div key={t.id} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.type === 'deposit' ? 'Deposit' : 'Withdrawal'} · {t.method}</span>
                    <span className="text-sm font-mono text-foreground">
                      {t.type === 'deposit' ? '+' : '−'}P {t.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
