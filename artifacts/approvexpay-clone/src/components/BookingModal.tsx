import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ChevronRight, Globe } from "lucide-react";

export function BookingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string | null>(null);

  const handleNext = () => setStep(s => s + 1);

  const reset = () => {
    setStep(1);
    setDate(undefined);
    setTimeSlot(null);
  };

  const handleClose = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-[#0a0f1e] text-white p-0 overflow-hidden shadow-2xl rounded-2xl">
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif">Schedule Discovery Call</h2>
                  <p className="text-muted-foreground text-sm">Select your timezone to continue.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                    <Globe className="text-cyan-400 w-5 h-5" />
                    <div className="flex-1">
                      <Select defaultValue="EST">
                        <SelectTrigger className="border-0 bg-transparent p-0 h-auto focus:ring-0 shadow-none">
                          <SelectValue placeholder="Select Timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EST">Eastern Time (EST/EDT)</SelectItem>
                          <SelectItem value="CST">Central Time (CST/CDT)</SelectItem>
                          <SelectItem value="PST">Pacific Time (PST/PDT)</SelectItem>
                          <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="CET">Central European Time (CET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-lg h-12"
                    onClick={handleNext}
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif">Select Date & Time</h2>
                  <p className="text-muted-foreground text-sm">Pick a 20-minute slot for our chat.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        setTimeSlot(null);
                      }}
                      className="border border-white/10 rounded-xl p-3 bg-white/5"
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium mb-2 text-white/80">Available Times</h3>
                    {!date ? (
                      <p className="text-sm text-muted-foreground italic">Select a date first.</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                        {["09:00 AM", "09:20 AM", "09:40 AM", "10:00 AM", "10:20 AM", "11:00 AM", "01:00 PM", "01:20 PM", "02:00 PM", "03:00 PM", "04:20 PM"].map((time) => (
                          <button
                            key={time}
                            onClick={() => setTimeSlot(time)}
                            className={`p-2 text-sm rounded-lg border transition-all ${timeSlot === time ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400' : 'border-white/10 hover:border-white/30 text-white/80'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg h-12 disabled:opacity-50"
                  onClick={handleNext}
                  disabled={!date || !timeSlot}
                >
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif">Your Details</h2>
                  <p className="text-muted-foreground text-sm">Where should we send the calendar invite?</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white/80">Full Name</Label>
                    <Input className="bg-white/5 border-white/10 text-white h-12" placeholder="Jane Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white/80">Work Email</Label>
                    <Input className="bg-white/5 border-white/10 text-white h-12" type="email" placeholder="jane@company.com" />
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg h-12 mt-4"
                    onClick={handleNext}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-6"
              >
                <div className="mx-auto w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-serif">You're booked!</h2>
                <p className="text-muted-foreground">A calendar invitation has been sent to your email.</p>
                
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl max-w-sm mx-auto my-6 text-left space-y-2">
                  <p className="text-sm text-white/60">Date & Time</p>
                  <p className="font-medium">{date?.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })} at {timeSlot}</p>
                </div>
                
                <Button 
                  className="bg-white/10 hover:bg-white/20 text-white rounded-lg"
                  onClick={() => handleClose(false)}
                >
                  Close
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
