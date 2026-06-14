import type { Player } from "../types/team";

type TeamSummaryProps = {
  selectedCountry: string;
  completedPlayers: Player[];
  submitLoading: boolean;
  onValidate: () => void;
  onReset: () => void;
};

export function TeamSummary({
  selectedCountry,
  completedPlayers,
  submitLoading,
  onValidate,
  onReset,
}: TeamSummaryProps) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">Summary</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Country</p>
          <p className="mt-1 font-black text-white">{selectedCountry || "Not selected"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Players</p>
          <p className="mt-1 font-black text-white">{completedPlayers.length} / 11</p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-300">
          Loaded players
        </h3>
        {completedPlayers.length ? (
          <ul className="mt-3 max-h-52 space-y-2 overflow-auto pr-1">
            {completedPlayers.map((player, index) => (
              <li
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                key={`${player.name}-${player.position}-${index}`}
              >
                <span className="font-bold text-white">{player.name}</span>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold uppercase text-emerald-200">
                  {player.position}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
            No complete players yet.
          </p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitLoading}
          onClick={onValidate}
          type="button"
        >
          {submitLoading ? "Validating..." : "Validate Team"}
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          onClick={onReset}
          type="button"
        >
          Reset Team
        </button>
      </div>
    </section>
  );
}
