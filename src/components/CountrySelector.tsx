type CountrySelectorProps = {
  countries: string[];
  selectedCountry: string;
  loading: boolean;
  error: string | null;
  onSelect: (country: string) => void;
};

const countryMeta: Record<string, { flag: string; accent: string }> = {
  Argentina: { flag: "🇦🇷", accent: "from-sky-400 to-white text-sky-950" },
  Brasil: { flag: "🇧🇷", accent: "from-yellow-300 to-emerald-400 text-emerald-950" },
  Brazil: { flag: "🇧🇷", accent: "from-yellow-300 to-emerald-400 text-emerald-950" },
  "España": { flag: "🇪🇸", accent: "from-red-500 to-yellow-300 text-red-950" },
  Spain: { flag: "🇪🇸", accent: "from-red-500 to-yellow-300 text-red-950" },
  Alemania: { flag: "🇩🇪", accent: "from-zinc-950 via-red-500 to-yellow-300 text-white" },
  Germany: { flag: "🇩🇪", accent: "from-zinc-950 via-red-500 to-yellow-300 text-white" },
};

export function getCountryAccent(country: string): string {
  return countryMeta[country]?.accent ?? "from-emerald-300 to-cyan-300 text-slate-950";
}

export function CountrySelector({
  countries,
  selectedCountry,
  loading,
  error,
  onSelect,
}: CountrySelectorProps) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">
            Nation
          </p>
          <h2 className="text-xl font-black text-white">Choose your country</h2>
        </div>
        {loading ? <span className="text-sm text-slate-400">Loading...</span> : null}
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {countries.map((country) => {
          const meta = countryMeta[country] ?? { flag: "🏆", accent: getCountryAccent(country) };
          const isSelected = selectedCountry === country;

          return (
            <button
              className={`group rounded-2xl border p-3 text-left transition duration-200 hover:-translate-y-1 hover:border-emerald-200/80 ${
                isSelected
                  ? "border-emerald-200 bg-white/15 shadow-lg shadow-emerald-500/20"
                  : "border-white/10 bg-white/5"
              }`}
              key={country}
              onClick={() => onSelect(country)}
              type="button"
            >
              <span
                className={`mb-3 inline-flex rounded-full bg-gradient-to-br px-3 py-1 text-lg shadow-lg ${meta.accent}`}
              >
                {meta.flag}
              </span>
              <span className="block text-sm font-bold text-white">{country}</span>
              <span className="mt-1 block text-xs text-slate-400">
                {isSelected ? "Selected squad" : "Tap to select"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
