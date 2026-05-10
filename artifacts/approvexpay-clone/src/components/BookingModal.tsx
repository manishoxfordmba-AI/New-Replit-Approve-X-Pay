import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ChevronRight, Globe, Search, User, Mail, Building2, Phone, MessageSquare } from "lucide-react";

// All major timezones with UTC offset in minutes
const TIMEZONES = [
  { label: "International Date Line West (UTC-12)", offset: -720 },
  { label: "Samoa Standard Time (UTC-11)", offset: -660 },
  { label: "Hawaii-Aleutian Time (UTC-10)", offset: -600 },
  { label: "Alaska Time (UTC-9)", offset: -540 },
  { label: "Pacific Time – US & Canada (UTC-8)", offset: -480 },
  { label: "Mountain Time – US & Canada (UTC-7)", offset: -420 },
  { label: "Central Time – US & Canada (UTC-6)", offset: -360 },
  { label: "Eastern Time – US & Canada (UTC-5)", offset: -300 },
  { label: "Atlantic Time – Canada (UTC-4)", offset: -240 },
  { label: "Brasilia / Buenos Aires (UTC-3)", offset: -180 },
  { label: "Fernando de Noronha (UTC-2)", offset: -120 },
  { label: "Azores (UTC-1)", offset: -60 },
  { label: "GMT / UTC (UTC+0)", offset: 0 },
  { label: "London / Dublin / Lisbon (UTC+1)", offset: 60 },
  { label: "Amsterdam / Berlin / Paris / Rome (UTC+2)", offset: 120 },
  { label: "Helsinki / Kyiv / Riyadh (UTC+3)", offset: 180 },
  { label: "Abu Dhabi / Muscat (UTC+4)", offset: 240 },
  { label: "Kabul (UTC+4:30)", offset: 270 },
  { label: "Islamabad / Karachi (UTC+5)", offset: 300 },
  { label: "India Standard Time – IST (UTC+5:30)", offset: 330 },
  { label: "Colombo / Kathmandu adj (UTC+5:30)", offset: 330 },
  { label: "Dhaka / Bangladesh (UTC+6)", offset: 360 },
  { label: "Bangkok / Hanoi / Jakarta (UTC+7)", offset: 420 },
  { label: "Beijing / Shanghai / Singapore / HK (UTC+8)", offset: 480 },
  { label: "Tokyo / Seoul / Osaka (UTC+9)", offset: 540 },
  { label: "Sydney / Melbourne (UTC+10)", offset: 600 },
  { label: "Vladivostok (UTC+11)", offset: 660 },
  { label: "Auckland / Fiji (UTC+12)", offset: 720 },
];

// Manish availability: Mon–Sat, 6:00am–12:00pm IST
// IST = UTC+5:30 = +330 min
// 6:00am IST = 6*60 - 330 = 30 min from midnight UTC
// 12:00pm IST = 12*60 - 330 = 390 min from midnight UTC
const MANISH_START_UTC = 30;  // 00:30 UTC
const MANISH_END_UTC = 390;   // 06:30 UTC

function getAvailableSlots(clientOffsetMin: number): string[] {
  const slots: string[] = [];
  // Show all of Manish's slots (6am–12pm IST) converted to client's local timezone
  let t = MANISH_START_UTC;
  while (t < MANISH_END_UTC) {
    const localMin = ((t + clientOffsetMin) % 1440 + 1440) % 1440;
    const h = Math.floor(localMin / 60);
    const m = localMin % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const display = `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${ampm}`;
    slots.push(display);
    t += 30;
  }
  return slots;
}

function formatDate(d: Date | undefined) {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}


export function BookingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [tzSearch, setTzSearch] = useState("");
  const [selectedTz, setSelectedTz] = useState<typeof TIMEZONES[0] | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: "", email: "", company: "", phone: "", volume: "", message: "" });

  const filteredTz = useMemo(() =>
    TIMEZONES.filter(tz => tz.label.toLowerCase().includes(tzSearch.toLowerCase())),
    [tzSearch]
  );

  const slots = useMemo(() =>
    selectedTz ? getAvailableSlots(selectedTz.offset) : [],
    [selectedTz]
  );

  const setDetail = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDetails(prev => ({ ...prev, [f]: e.target.value }));

  const reset = () => {
    setStep(1); setTzSearch(""); setSelectedTz(null); setDate(undefined); setTimeSlot(null);
    setDetails({ name: "", email: "", company: "", phone: "", volume: "", message: "" });
  };

  const handleClose = (o: boolean) => { if (!o) reset(); onOpenChange(o); };

  const confirmBooking = () => {
    if (!date || !timeSlot || !selectedTz) return;

    // Send confirmation email to client from Manish's address
    const subject = encodeURIComponent(`Your ApproveXPay Advisory Call – ${formatDate(date)} at ${timeSlot}`);
    const body = encodeURIComponent(
      `Dear ${details.name},\n\nThank you for scheduling an Advisory Call with ApproveXPay.\n\nAppointment Confirmation:\nDate: ${formatDate(date)}\nTime: ${timeSlot} (${selectedTz.label})\n\nYour Details:\nName: ${details.name}\nCompany: ${details.company}\nPhone: ${details.phone}\nAnnual Payment Volume: ${details.volume}\n\nNote: ${details.message}\n\nManish Gupta will connect with you at the scheduled time. Please reach out at manish@approvexpay.com if you need to reschedule.\n\nLooking forward to speaking with you.\n\nBest regards,\nManish Gupta\nFounder & CEO, ApproveXPay\nmanish@approvexpay.com`
    );
    window.location.href = `mailto:${details.email}?cc=manish@approvexpay.com&subject=${subject}&body=${body}`;

    setStep(4);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px] border-white/10 bg-[#0a0f1e] text-white p-0 overflow-hidden shadow-2xl rounded-2xl">
        {/* Progress bar */}
        <div className="flex gap-1 px-6 pt-5">
          {[1,2,3,4].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${step >= s ? "bg-cyan-400" : "bg-white/10"}`} />
          ))}
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* STEP 1: Timezone */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-serif mb-1">Schedule Discovery Call</h2>
                  <p className="text-white/50 text-sm">Search and select your timezone to see available slots.</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/70 text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-cyan-400" /> Your Timezone</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={tzSearch}
                      onChange={e => { setTzSearch(e.target.value); setSelectedTz(null); }}
                      placeholder="Search timezone (e.g. London, India, New York...)"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="max-h-52 overflow-y-auto border border-white/10 rounded-lg divide-y divide-white/5">
                    {filteredTz.length === 0 && (
                      <p className="p-3 text-sm text-white/40 text-center">No timezone found</p>
                    )}
                    {filteredTz.map((tz, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelectedTz(tz); setTzSearch(tz.label); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${selectedTz?.label === tz.label ? "bg-cyan-500/20 text-cyan-300" : "text-white/70 hover:bg-white/5"}`}
                      >
                        {tz.label}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedTz && (
                  <div className={`text-sm px-4 py-2.5 rounded-lg border ${slots.length > 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-red-500/10 border-red-500/20 text-red-300"}`}>
                    {slots.length > 0
                      ? `✓ ${slots.length} slot${slots.length > 1 ? "s" : ""} available in your timezone`
                      : "⚠ No overlapping slots for this timezone. Manish is available 6am–12pm IST (Mon–Sat)."}
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-lg h-12 disabled:opacity-40"
                  onClick={() => setStep(2)}
                  disabled={!selectedTz || slots.length === 0}
                >
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* STEP 2: Date & Time */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-serif mb-1">Select Date & Time</h2>
                  <p className="text-white/50 text-sm">Showing available 30-min slots in <span className="text-cyan-400">{selectedTz?.label}</span></p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => { setDate(d); setTimeSlot(null); }}
                      className="border border-white/10 rounded-xl p-3 bg-white/5 w-full"
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/70 mb-2">
                      {date ? `Available Times (${selectedTz?.label.split(" (")[0]})` : "Select a date first"}
                    </p>
                    {!date ? (
                      <p className="text-sm text-white/30 italic">← Pick a date</p>
                    ) : slots.length === 0 ? (
                      <p className="text-sm text-red-400">No slots available</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                        {slots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setTimeSlot(time)}
                            className={`p-2.5 text-sm rounded-lg border transition-all ${timeSlot === time ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 font-semibold" : "border-white/10 hover:border-white/30 text-white/70"}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-white/10 text-white/70 hover:bg-white/5" onClick={() => setStep(1)}>Back</Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg h-11 disabled:opacity-40"
                    onClick={() => setStep(3)}
                    disabled={!date || !timeSlot}
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Details */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-serif mb-1">Your Details</h2>
                  <p className="text-white/50 text-sm">All fields required. We'll send a calendar invite to your email.</p>
                </div>

                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm text-cyan-300">
                  📅 {formatDate(date)} at <strong>{timeSlot}</strong> ({selectedTz?.label.split(" (")[0]})
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-white/60 text-xs">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 w-4 h-4 text-white/30" />
                        <Input required value={details.name} onChange={setDetail("name")} className="bg-white/5 border-white/10 pl-8 h-10 text-white text-sm" placeholder="Jane Doe" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-white/60 text-xs">Work Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-2.5 w-4 h-4 text-white/30" />
                        <Input required type="email" value={details.email} onChange={setDetail("email")} className="bg-white/5 border-white/10 pl-8 h-10 text-white text-sm" placeholder="jane@co.com" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-white/60 text-xs">Company</Label>
                      <div className="relative">
                        <Building2 className="absolute left-2.5 top-2.5 w-4 h-4 text-white/30" />
                        <Input required value={details.company} onChange={setDetail("company")} className="bg-white/5 border-white/10 pl-8 h-10 text-white text-sm" placeholder="Acme Inc." />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-white/60 text-xs">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-2.5 w-4 h-4 text-white/30" />
                        <Input required type="tel" value={details.phone} onChange={setDetail("phone")} className="bg-white/5 border-white/10 pl-8 h-10 text-white text-sm" placeholder="+1 555 000" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white/60 text-xs">Annual Payment Volume</Label>
                    <Select required onValueChange={(v) => setDetails(prev => ({ ...prev, volume: v }))}>
                      <SelectTrigger className="bg-white/5 border-white/10 h-10 text-white text-sm">
                        <SelectValue placeholder="Select volume range" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1a2e] border-white/10 text-white">
                        {["<$10M", "$10M – $50M", "$50M – $200M", "$200M – $1B", ">$1B"].map(v => (
                          <SelectItem key={v} value={v} className="focus:bg-white/10">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white/60 text-xs">Message</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-2.5 top-2.5 w-4 h-4 text-white/30" />
                      <textarea required value={details.message} onChange={setDetail("message")} className="w-full bg-white/5 border border-white/10 rounded-md pl-8 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[70px] resize-none" placeholder="What payment challenges are you facing?" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <Button variant="outline" className="flex-1 border-white/10 text-white/70 hover:bg-white/5" onClick={() => setStep(2)}>Back</Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-lg h-11 disabled:opacity-40"
                    disabled={!details.name || !details.email || !details.company || !details.phone || !details.volume || !details.message}
                    onClick={confirmBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Confirmation */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center space-y-5">
                <div className="mx-auto w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-serif">You're booked!</h2>
                <p className="text-white/60 max-w-sm mx-auto">Your booking request is confirmed. A confirmation email has been sent to <span className="text-cyan-400">{details.email}</span>. Manish will connect with you at the scheduled time.</p>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl max-w-sm mx-auto text-left space-y-2">
                  <p className="text-xs text-white/40 uppercase tracking-wider">Your Appointment</p>
                  <p className="font-semibold text-white">{formatDate(date)}</p>
                  <p className="text-cyan-400 text-sm">{timeSlot} · {selectedTz?.label.split(" (")[0]}</p>
                  {details.name && <p className="text-white/50 text-xs mt-2">Confirmation sent to {details.email}</p>}
                </div>

                <p className="text-white/30 text-xs">Need to reschedule? Email manish@approvexpay.com</p>

                <Button className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-8" onClick={() => handleClose(false)}>Close</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
