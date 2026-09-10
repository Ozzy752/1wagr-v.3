import { useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import type { ChatMessage } from '../data';

interface SupportChatProps {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSend: (text: string) => void;
}

const QUICK_ACTIONS = ['Deposit help', 'Withdrawal status', 'Bonus terms'];

export default function SupportChat({ open, onClose, messages, onSend }: SupportChatProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  if (!open) return null;

  const handleSend = (text: string) => {
    const msg = text.trim();
    if (!msg) return;
    onSend(msg);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:pointer-events-none" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end justify-center p-0 md:items-end md:justify-end md:p-6 md:pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md overflow-hidden rounded-t-xl border border-border bg-popover shadow-2xl animate-in slide-in-from-bottom-4 duration-200 md:w-[380px] md:rounded-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MessageCircle size={14} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">1WAGR Support</p>
                <p className="text-xs text-muted-foreground">Usually replies in minutes</p>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>

          <div className="h-64 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={m.sender === 'support' ? '' : 'flex justify-end'}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  m.sender === 'support' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="text-sm">{m.text}</p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((a) => (
              <button key={a} onClick={() => handleSend(a)} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                {a}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <input
              ref={inputRef}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(e.currentTarget.value)}
              placeholder="Write a message…"
              className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button onClick={() => inputRef.current && handleSend(inputRef.current.value)} className="text-primary hover:text-primary/80 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
