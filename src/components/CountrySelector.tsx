import { resolveCountryMetadata } from "../data/presets";

type CountrySelectorProps = {
  countries: string[];
  selectedCountry: string;
  loading: boolean;
  error: string | null;
  onSelect: (country: string) => void;
};

export function CountrySelector({
  countries,
  selectedCountry,
  loading,
  error,
  onSelect,
}: CountrySelectorProps) {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl shadow-slate-900/10 backdrop-blur sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
            Nation
          </p>
          <h2 className="text-xl font-black text-slate-950">Choose your country</h2>
        </div>
        {loading ? <span className="text-sm font-bold text-slate-500">Loading...</span> : null}
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {countries.map((country) => {
          const meta = resolveCountryMetadata(country);
          const isSelected = selectedCountry === country;

          return (
            <button
              className={`group min-h-28 rounded-2xl border p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-200 ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-900/10"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
              key={country}
              onClick={() => onSelect(country)}
              type="button"
            >
              <span
                className="mb-3 inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-xl font-black shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${meta.accentFrom}, ${meta.accentTo})`,
                  color: meta.textColor,
                }}
              >
                {meta.flag}
              </span>
              <span className="block break-words text-sm font-black text-slate-950">{country}</span>
              <span className="mt-1 block text-xs font-semibold text-slate-500">
                {meta.preset ? "Preset ready" : "Manual squad"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
