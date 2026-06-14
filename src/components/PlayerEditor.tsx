import { useEffect, useState } from "react";
import type { Player, PlayerSlot } from "../types/team";

type PlayerEditorProps = {
  activeSlot: PlayerSlot | null;
  onSave: (slotNumber: number, player: Player) => void;
  onClear: (slotNumber: number) => void;
};

export function PlayerEditor({ activeSlot, onSave, onClear }: PlayerEditorProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(activeSlot?.player?.name ?? "");
    setPosition(activeSlot?.player?.position ?? "");
    setError("");
  }, [activeSlot]);

  function handleSave() {
    if (!activeSlot) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedPosition = position.trim();

    if (!trimmedName && !trimmedPosition) {
      onClear(activeSlot.slotNumber);
      setError("");
      return;
    }

    if (!trimmedName || !trimmedPosition) {
      setError("Complete both name and position before saving this slot.");
      return;
    }

    onSave(activeSlot.slotNumber, {
      name: trimmedName,
      position: trimmedPosition,
    });
    setError("");
  }

  if (!activeSlot) {
    return (
      <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-black/20 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">
          Editor
        </p>
        <h2 className="mt-1 text-xl font-black text-white">Select a slot</h2>
        <p className="mt-3 text-sm text-slate-400">
          Tap a numbered bubble on the pitch to start building your eleven.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">Editor</p>
      <h2 className="mt-1 text-xl font-black text-white">
        Editing player #{activeSlot.slotNumber}
      </h2>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-slate-200">Name</span>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200"
            onChange={(event) => setName(event.target.value)}
            placeholder="Lionel Messi"
            type="text"
            value={name}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-200">Position</span>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200"
            onChange={(event) => setPosition(event.target.value)}
            placeholder="forward"
            type="text"
            value={position}
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-100">
          {error}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          className="rounded-2xl bg-emerald-300 px-4 py-3 text-sm font-black text-emerald-950 shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-200"
          onClick={handleSave}
          type="button"
        >
          Save player
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10"
          onClick={() => onClear(activeSlot.slotNumber)}
          type="button"
        >
          Clear slot
        </button>
      </div>
    </section>
  );
}
