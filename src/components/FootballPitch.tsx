import type { PlayerSlot } from "../types/team";
import { PlayerBubble } from "./PlayerBubble";

type FootballPitchProps = {
  slots: PlayerSlot[];
  activeSlotNumber: number | null;
  onSelectSlot: (slotNumber: number) => void;
};

export function FootballPitch({ slots, activeSlotNumber, onSelectSlot }: FootballPitchProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-emerald-950/40 backdrop-blur">
      <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] border-2 border-emerald-100/60 bg-[radial-gradient(circle_at_50%_50%,rgba(187,247,208,0.18),transparent_22%),linear-gradient(135deg,#0f5f35,#11964e_45%,#063d28)] shadow-inner shadow-black/50 sm:min-h-[650px]">
        <div className="absolute inset-4 rounded-[1.2rem] border-2 border-white/55" />
        <div className="absolute left-4 right-4 top-1/2 border-t-2 border-white/50" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
        <div className="absolute left-1/2 top-4 h-24 w-48 -translate-x-1/2 rounded-b-[2rem] border-x-2 border-b-2 border-white/50" />
        <div className="absolute bottom-4 left-1/2 h-24 w-48 -translate-x-1/2 rounded-t-[2rem] border-x-2 border-t-2 border-white/50" />
        <div className="absolute left-1/2 top-4 h-10 w-24 -translate-x-1/2 rounded-b-xl border-x-2 border-b-2 border-white/40" />
        <div className="absolute bottom-4 left-1/2 h-10 w-24 -translate-x-1/2 rounded-t-xl border-x-2 border-t-2 border-white/40" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_50%,transparent_50%)] bg-[length:120px_120px] opacity-40" />

        {slots.map((slot) => (
          <PlayerBubble
            active={activeSlotNumber === slot.slotNumber}
            key={slot.slotNumber}
            onSelect={onSelectSlot}
            slot={slot}
          />
        ))}
      </div>
    </section>
  );
}
