import type { Feedback } from "../types/team";

type FeedbackMessageProps = {
  feedback: Feedback;
  onClose: () => void;
};

export function FeedbackMessage({ feedback, onClose }: FeedbackMessageProps) {
  if (!feedback) {
    return null;
  }

  const isSuccess = feedback.kind === "success";

  return (
    <div
      aria-labelledby="validation-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
    >
      <div
        className={`w-full max-w-md rounded-[1.5rem] border bg-white px-5 py-5 text-slate-950 shadow-2xl sm:px-6 ${
          isSuccess ? "border-emerald-200 shadow-emerald-950/20" : "border-red-200 shadow-red-950/20"
        }`}
      >
        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
            isSuccess ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }`}
          aria-hidden="true"
        >
          {isSuccess ? "\u2713" : "!"}
        </div>
        <p
          className={`text-sm font-black uppercase tracking-[0.18em] ${
            isSuccess ? "text-emerald-700" : "text-red-700"
          }`}
        >
          Validacion de equipo
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950" id="validation-modal-title">
          {isSuccess ? "Creado exitosamente" : "No paso la validacion"}
        </h2>
        <p className="mt-3 text-base font-semibold text-slate-600">{feedback.message}</p>
        <button
          className={`mt-6 min-h-12 w-full rounded-2xl px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 ${
            isSuccess
              ? "bg-emerald-500 shadow-emerald-900/20 hover:bg-emerald-600"
              : "bg-red-500 shadow-red-900/20 hover:bg-red-600"
          }`}
          onClick={onClose}
          type="button"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
