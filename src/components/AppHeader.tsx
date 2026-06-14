import type { ApiHealthStatus } from "../types/team";

type AppHeaderProps = {
  healthStatus: ApiHealthStatus;
};

const statusCopy: Record<ApiHealthStatus, { label: string; className: string }> = {
  idle: {
    label: "Checking API",
    className: "border-slate-500/40 bg-slate-500/15 text-slate-200",
  },
  healthy: {
    label: "API online",
    className: "border-emerald-400/50 bg-emerald-400/15 text-emerald-200",
  },
  unhealthy: {
    label: "API offline",
    className: "border-red-400/50 bg-red-500/15 text-red-200",
  },
};

export function AppHeader({ healthStatus }: AppHeaderProps) {
  const status = statusCopy[healthStatus];

  return (
    <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-emerald-950/30 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.45em] text-emerald-200">
          FIFA ready
        </p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          World Cup Team Builder
        </h1>
        <p className="mt-3 text-lg text-slate-300">
          Build and validate your starting eleven
        </p>
      </div>
      <div
        className={`inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-sm font-bold shadow-lg ${status.className}`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_18px_currentColor]" />
        {status.label}
      </div>
    </header>
  );
}
