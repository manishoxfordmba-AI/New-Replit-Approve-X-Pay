import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Building2, Phone, MessageSquare, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", volume: "", message: "" });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("ApproveXPay – Recovery Enquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nWork Email: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\nAnnual Payment Volume: ${form.volume}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:contact@approvexpay.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  const handleClose = (o: boolean) => {
    if (!o) { setSubmitted(false); setForm({ name: "", email: "", company: "", phone: "", volume: "", message: "" }); }
    onOpenChange(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] border-white/10 bg-[#0a0f1e] text-white p-0 overflow-hidden shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-7">
          {submitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="mx-auto w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-serif">Message Sent!</h2>
              <p className="text-white/60">Your email client should have opened. We'll be in touch shortly.</p>
              <Button className="bg-white/10 hover:bg-white/20 text-white rounded-lg" onClick={() => handleClose(false)}>Close</Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-serif mb-1">Contact Manish</h2>
                <p className="text-white/50 text-sm">All fields required. We'll respond within 24 hours.</p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                    <Input required value={form.name} onChange={set("name")} className="bg-white/5 border-white/10 pl-9 h-11 text-white" placeholder="Jane Doe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Work Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                    <Input required type="email" value={form.email} onChange={set("email")} className="bg-white/5 border-white/10 pl-9 h-11 text-white" placeholder="jane@company.com" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                    <Input required value={form.company} onChange={set("company")} className="bg-white/5 border-white/10 pl-9 h-11 text-white" placeholder="Acme Inc." />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                    <Input required type="tel" value={form.phone} onChange={set("phone")} className="bg-white/5 border-white/10 pl-9 h-11 text-white" placeholder="+1 555 000 0000" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Annual Payment Volume</Label>
                  <Select required onValueChange={(v) => setForm(prev => ({ ...prev, volume: v }))}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-11 text-white">
                      <SelectValue placeholder="Select volume range" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1a2e] border-white/10 text-white">
                      {["<$10M", "$10M – $50M", "$50M – $200M", "$200M – $1B", ">$1B"].map(v => (
                        <SelectItem key={v} value={v} className="focus:bg-white/10">{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Message</Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                    <textarea required value={form.message} onChange={set("message")} className="w-full bg-white/5 border border-white/10 rounded-md pl-9 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[90px] resize-none" placeholder="Tell us about your payment challenges..." />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl h-12 font-semibold mt-2">
                  Send Message
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
