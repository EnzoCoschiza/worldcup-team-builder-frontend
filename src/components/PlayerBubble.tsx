import type { PlayerSlot } from "../types/team";
import { getPositionOption } from "../data/presets";

type PlayerBubbleProps = {
  slot: PlayerSlot;
  active: boolean;
  onSelect: (slotNumber: number) => void;
};

function getPlayerLabel(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 8);
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function PlayerBubble({ slot, active, onSelect }: PlayerBubbleProps) {
  const isComplete = Boolean(slot.player?.name.trim() && slot.player.position);
  const shownPosition = slot.player?.position ?? slot.position;
  const positionOption = getPositionOption(shownPosition);

  return (
    <button
      aria-label={`Edit slot ${slot.slotNumber} ${slot.roleLabel}`}
      className={`absolute flex min-h-14 min-w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center shadow-2xl transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/60 ${
        active
          ? "h-[4.5rem] w-[4.5rem] border-white bg-white text-emerald-950 shadow-white/25 sm:h-20 sm:w-20"
          : isComplete
            ? "h-[4.5rem] w-[4.5rem] border-amber-100/90 bg-amber-100 text-slate-950 shadow-emerald-950/35 sm:h-20 sm:w-20"
            : "h-16 w-16 border-white/40 bg-slate-950/80 text-white shadow-black/35 backdrop-blur sm:h-[4.5rem] sm:w-[4.5rem]"
      }`}
      onClick={() => onSelect(slot.slotNumber)}
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
      type="button"
    >
      <span className="text-xs font-black opacity-75">#{slot.slotNumber}</span>
      {isComplete ? (
        <>
          <span className="max-w-14 truncate text-xs font-black sm:max-w-16 sm:text-sm">
            {getPlayerLabel(slot.player?.name ?? "")}
          </span>
          <span className="max-w-14 truncate text-[0.6rem] font-black uppercase opacity-75 sm:max-w-16 sm:text-[0.65rem]">
            {positionOption.shortLabel}
          </span>
        </>
      ) : (
        <span className="mt-0.5 text-sm font-black uppercase">{slot.roleLabel}</span>
      )}
    </button>
  );
}
