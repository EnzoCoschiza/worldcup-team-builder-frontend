import type { PlayerSlot } from "../types/team";

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
  const isComplete = Boolean(slot.player?.name.trim() && slot.player.position.trim());

  return (
    <button
      aria-label={`Edit player ${slot.slotNumber}`}
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center shadow-2xl transition duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-200/40 ${
        active
          ? "h-16 w-16 border-white bg-white text-emerald-950 shadow-white/25 sm:h-20 sm:w-20"
          : isComplete
            ? "h-16 w-16 border-emerald-100/80 bg-emerald-100 text-emerald-950 shadow-emerald-950/40 sm:h-20 sm:w-20"
            : "h-14 w-14 border-white/30 bg-slate-950/75 text-white shadow-black/40 backdrop-blur sm:h-16 sm:w-16"
      }`}
      onClick={() => onSelect(slot.slotNumber)}
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
      type="button"
    >
      <span className="text-xs font-black opacity-75">#{slot.slotNumber}</span>
      {isComplete ? (
        <>
          <span className="max-w-12 truncate text-xs font-black sm:max-w-14 sm:text-sm">
            {getPlayerLabel(slot.player?.name ?? "")}
          </span>
          <span className="max-w-12 truncate text-[0.6rem] font-bold uppercase opacity-70 sm:max-w-14 sm:text-[0.65rem]">
            {slot.player?.position}
          </span>
        </>
      ) : null}
    </button>
  );
}
