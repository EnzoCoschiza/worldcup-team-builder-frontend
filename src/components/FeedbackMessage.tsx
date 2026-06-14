import type { Feedback } from "../types/team";

type FeedbackMessageProps = {
  feedback: Feedback;
};

export function FeedbackMessage({ feedback }: FeedbackMessageProps) {
  if (!feedback) {
    return null;
  }

  const isSuccess = feedback.kind === "success";

  return (
    <div
      className={`rounded-[1.5rem] border px-5 py-4 shadow-xl backdrop-blur ${
        isSuccess
          ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100 shadow-emerald-950/30"
          : "border-red-300/40 bg-red-500/15 text-red-100 shadow-red-950/20"
      }`}
      role="status"
    >
      <p className="text-sm font-black uppercase tracking-[0.2em]">
        {isSuccess ? "Success" : "Needs attention"}
      </p>
      <p className="mt-1 font-semibold">{feedback.message}</p>
    </div>
  );
}
