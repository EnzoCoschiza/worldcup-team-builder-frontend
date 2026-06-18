import { getPositionOption, type ResolvedCountryMetadata } from "../data/presets";
import type { Player } from "../types/team";

type TeamSummaryProps = {
  selectedCountry: string;
  countryMeta: ResolvedCountryMetadata | null;
  completedPlayers: Player[];
  canLoadPreset: boolean;
  submitLoading: boolean;
  onLoadPreset: () => void;
  onValidate: () => void;
  onReset: () => void;
};

export function TeamSummary({
  selectedCountry,
  countryMeta,
  completedPlayers,
  canLoadPreset,
  submitLoading,
  onLoadPreset,
  onValidate,
  onReset,
}: TeamSummaryProps) {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl shadow-slate-900/10 backdrop-blur sm:p-5">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">Summary</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Country</p>
          <p className="mt-1 break-words font-black text-slate-950">
            {countryMeta?.flag ? `${countryMeta.flag} ` : ""}
            {selectedCountry || "Not selected"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Players</p>
          <p className="mt-1 font-black text-slate-950">{completedPlayers.length} / 11</p>
        </div>
      </div>

      <button
        className="mt-4 min-h-12 w-full rounded-2xl px-5 py-3 text-sm font-black shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
        disabled={!canLoadPreset}
        onClick={onLoadPreset}
        style={{
          background: canLoadPreset
            ? `linear-gradient(135deg, ${countryMeta?.accentFrom ?? "#34d399"}, ${
                countryMeta?.accentTo ?? "#38bdf8"
              })`
            : "#e2e8f0",
          color: canLoadPreset ? (countryMeta?.textColor ?? "#0f172a") : "#64748b",
        }}
        type="button"
      >
        {canLoadPreset ? "Cargar equipo prearmado" : "No preset for this country"}
      </button>

      <div className="mt-5">
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">
          Loaded players
        </h3>
        {completedPlayers.length ? (
          <ul className="mt-3 max-h-52 space-y-2 overflow-auto pr-1">
            {completedPlayers.map((player, index) => (
              <li
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                key={`${player.name}-${player.position}-${index}`}
              >
                <span className="font-bold text-slate-950">{player.name}</span>
                <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-800">
                  {getPositionOption(player.position).shortLabel}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500">
            No complete players yet.
          </p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          className="min-h-12 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitLoading}
          onClick={onValidate}
          type="button"
        >
          {submitLoading ? "Validating..." : "Validate Team"}
        </button>
        <button
          className="min-h-12 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
          onClick={onReset}
          type="button"
        >
          Reset Team
        </button>
      </div>
    </section>
  );
}
