import { useEffect, useState } from "react";
import {
  getPositionOption,
  POSITION_OPTIONS,
  type NormalizedPosition,
  type PresetPlayer,
  type ResolvedCountryMetadata,
} from "../data/presets";
import type { Player, PlayerSlot } from "../types/team";

type PlayerEditorProps = {
  activeSlot: PlayerSlot | null;
  countryMeta: ResolvedCountryMetadata | null;
  suggestedPlayers: PresetPlayer[];
  onSave: (slotNumber: number, player: Player) => void;
  onClear: (slotNumber: number) => void;
  onApplySuggestion: (slotNumber: number, player: PresetPlayer) => void;
};

export function PlayerEditor({
  activeSlot,
  countryMeta,
  suggestedPlayers,
  onSave,
  onClear,
  onApplySuggestion,
}: PlayerEditorProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState<NormalizedPosition>("forward");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(activeSlot?.player?.name ?? "");
    setPosition(activeSlot?.player?.position ?? activeSlot?.position ?? "forward");
    setError("");
  }, [activeSlot]);

  function handleSave() {
    if (!activeSlot) {
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Complete both name and position before saving this slot.");
      return;
    }

    onSave(activeSlot.slotNumber, {
      name: trimmedName,
      position,
    });
    setError("");
  }

  function handleSuggestion(player: PresetPlayer) {
    if (!activeSlot) {
      return;
    }

    setName(player.name);
    setPosition(player.position);
    setError("");
    onApplySuggestion(activeSlot.slotNumber, player);
  }

  if (!activeSlot) {
    return (
      <section className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-xl shadow-slate-900/10 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
          Editor
        </p>
        <h2 className="mt-1 text-xl font-black text-slate-950">Select a slot</h2>
        <p className="mt-3 text-sm font-semibold text-slate-500">
          Tap a numbered bubble on the pitch to start building your eleven.
        </p>
      </section>
    );
  }

  const currentPosition = getPositionOption(position);

  return (
    <section className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl shadow-slate-900/10 backdrop-blur sm:p-5">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">Editor</p>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-slate-950">
          Slot #{activeSlot.slotNumber} · {activeSlot.roleLabel}
        </h2>
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase text-white">
          {currentPosition.shortLabel}
        </span>
      </div>

      <div className="mt-5 space-y-5">
        {suggestedPlayers.length ? (
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-black text-slate-800">Suggested players</span>
              <span className="text-xs font-bold text-slate-500">{countryMeta?.flag}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {suggestedPlayers.map((player) => {
                const option = getPositionOption(player.position);

                return (
                  <button
                    className="min-h-12 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                    key={`${player.name}-${player.position}-${player.slotNumber ?? "any"}`}
                    onClick={() => handleSuggestion(player)}
                    type="button"
                  >
                    <span className="block text-sm font-black text-slate-950">{player.name}</span>
                    <span className="text-xs font-bold uppercase text-emerald-700">
                      {option.shortLabel} · {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <label className="block">
          <span className="text-sm font-black text-slate-800">Name</span>
          <input
            className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            onChange={(event) => setName(event.target.value)}
            placeholder="Lionel Messi"
            type="text"
            value={name}
          />
        </label>

        <div>
          <span className="text-sm font-black text-slate-800">Position</span>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {POSITION_OPTIONS.map((option) => {
              const isSelected = option.value === position;

              return (
                <button
                  className={`min-h-12 rounded-2xl border px-3 py-2 text-left transition focus:outline-none focus:ring-4 focus:ring-emerald-200 ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
                  }`}
                  key={option.value}
                  onClick={() => setPosition(option.value)}
                  type="button"
                >
                  <span className="block text-xs font-black uppercase">{option.shortLabel}</span>
                  <span className="block text-xs font-semibold">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          className="min-h-12 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
          onClick={handleSave}
          type="button"
        >
          Save player
        </button>
        <button
          className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          onClick={() => onClear(activeSlot.slotNumber)}
          type="button"
        >
          Clear slot
        </button>
      </div>
    </section>
  );
}
