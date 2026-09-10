import { Button } from '@project/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';

interface SportsComingSoonProps {
  onBack: () => void;
}

export default function SportsComingSoon({ onBack }: SportsComingSoonProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Trophy size={36} className="text-primary" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-foreground md:text-4xl">Sports Betting</h1>
      <p className="mt-3 max-w-md text-base text-muted-foreground">
        Football, basketball, cricket and more — live odds and in-play markets are coming soon to 1WAGR.
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Stay tuned for the launch.</p>
      <Button onClick={onBack} className="mt-8 gap-2 font-semibold" size="lg">
        <ArrowLeft size={16} /> Back to Casino
      </Button>
    </div>
  );
}
