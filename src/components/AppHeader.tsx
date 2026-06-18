import type { ApiHealthStatus } from "../types/team";

type AppHeaderProps = {
  healthStatus: ApiHealthStatus;
};

const statusCopy: Record<ApiHealthStatus, { label: string; className: string }> = {
  idle: {
    label: "Checking API",
    className: "border-slate-300 bg-white text-slate-700",
  },
  healthy: {
    label: "API online",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  unhealthy: {
    label: "API offline",
    className: "border-red-200 bg-red-50 text-red-700",
  },
};

export function AppHeader({ healthStatus }: AppHeaderProps) {
  const status = statusCopy[healthStatus];

  return (
    <header className="flex flex-col gap-6 rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.36em] text-emerald-700">
          FIFA ready
        </p>
        <h1 className="max-w-4xl text-4xl font-black text-slate-950 md:text-6xl">
          World Cup Team Builder
        </h1>
        <p className="mt-3 text-lg font-semibold text-slate-600">
          Build and validate your starting eleven
        </p>
      </div>
      <div
        className={`inline-flex min-h-11 w-fit items-center gap-3 rounded-full border px-4 py-2 text-sm font-bold shadow-lg shadow-slate-900/5 ${status.className}`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_18px_currentColor]" />
        {status.label}
      </div>
    </header>
  );
}
