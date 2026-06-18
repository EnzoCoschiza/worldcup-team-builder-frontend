import type { PlayerSlot } from "../types/team";
import { PlayerBubble } from "./PlayerBubble";

type FootballPitchProps = {
  slots: PlayerSlot[];
  activeSlotNumber: number | null;
  onSelectSlot: (slotNumber: number) => void;
};

export function FootballPitch({ slots, activeSlotNumber, onSelectSlot }: FootballPitchProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/75 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur sm:p-4">
      <div className="relative min-h-[560px] overflow-hidden rounded-[1.5rem] border-2 border-white/80 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(135deg,#1a7f4c,#25a65f_48%,#0e5d3a)] shadow-inner shadow-emerald-950/35 sm:min-h-[680px] lg:min-h-[760px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_50%,transparent_50%)] bg-[length:96px_96px] opacity-60" />
        <div className="absolute inset-3 rounded-[1.2rem] border-2 border-white/65 sm:inset-4" />
        <div className="absolute left-4 right-4 top-1/2 border-t-2 border-white/50" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
        <div className="absolute left-1/2 top-4 h-24 w-48 -translate-x-1/2 rounded-b-[2rem] border-x-2 border-b-2 border-white/50" />
        <div className="absolute bottom-4 left-1/2 h-24 w-48 -translate-x-1/2 rounded-t-[2rem] border-x-2 border-t-2 border-white/50" />
        <div className="absolute left-1/2 top-4 h-10 w-24 -translate-x-1/2 rounded-b-xl border-x-2 border-b-2 border-white/40" />
        <div className="absolute bottom-4 left-1/2 h-10 w-24 -translate-x-1/2 rounded-t-xl border-x-2 border-t-2 border-white/40" />
        <div className="absolute left-5 top-[18%] rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/80">
          Attack
        </div>
        <div className="absolute left-5 top-[46%] rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/80">
          Midfield
        </div>
        <div className="absolute left-5 top-[68%] rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/80">
          Defense
        </div>

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
