import { useState } from 'react';
import { X, Upload, Lock } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Progress } from '@project/components/ui/progress';
import { toast } from 'sonner';

interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AccountModal({ open, onClose }: AccountModalProps) {
  const [firstName, setFirstName] = useState('Kabo');
  const [lastName, setLastName] = useState('Mogale');
  const [displayName, setDisplayName] = useState('YugiO1');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Gaborone, Botswana');
  const [payoutMethod, setPayoutMethod] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!open) return null;

  // Simple profile completion calc
  const fields = [firstName, lastName, displayName, phone, address, payoutMethod];
  const filled = fields.filter((f) => f.trim().length > 0).length;
  const completion = Math.round((filled / fields.length) * 100);

  const handleSave = () => {
    toast.success('Account settings saved');
  };

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword) { toast.error('Fill in both password fields'); return; }
    toast.success('Password updated');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-12 pb-24">
        <div className="w-full max-w-lg space-y-5 animate-in fade-in zoom-in-95 duration-200">

          {/* Profile completion */}
          <div className="rounded-xl border border-border bg-popover p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Profile completion</p>
                <p className="mt-1 text-xs text-muted-foreground">Complete every field and upload an identity document to unlock withdrawals.</p>
              </div>
              <span className="text-sm font-bold text-primary">{completion}%</span>
            </div>
            <Progress value={completion} className="mt-3 h-2" />
          </div>

          {/* Personal information */}
          <div className="rounded-xl border border-border bg-popover p-5 shadow-lg">
            <h3 className="text-base font-bold text-foreground">Personal information</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">First name</label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Last name</label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-foreground">Display name</label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-1.5" />
            </div>

            <h3 className="mt-6 text-base font-bold text-foreground">Contact & payment</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <Input placeholder="+267 7X XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-foreground">Payout method</label>
              <Input placeholder="Bank name, account number, or mobile money number" value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)} className="mt-1.5" />
            </div>

            <h3 className="mt-6 text-base font-bold text-foreground">Identity verification</h3>
            <div className="mt-3 flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border py-6">
              <Upload size={20} className="text-muted-foreground" />
              <p className="text-sm text-foreground">Upload ID or passport <span className="text-muted-foreground">(Image or PDF, max 10MB)</span></p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Stored privately — only you can access this document.</p>

            <Button onClick={handleSave} className="mt-6 w-full gap-2 font-semibold" size="lg">
              <Lock size={14} /> Save Changes
            </Button>
          </div>

          {/* Change password */}
          <div className="rounded-xl border border-border bg-popover p-5 shadow-lg">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-foreground" />
              <h3 className="text-base font-bold italic text-foreground">Change password</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Current password</label>
                <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">New password</label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1.5" />
              </div>
            </div>
            <Button onClick={handlePasswordUpdate} variant="outline" className="mt-4 font-medium">
              Update password
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}
