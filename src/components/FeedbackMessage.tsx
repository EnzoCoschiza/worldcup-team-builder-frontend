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
          ? "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-emerald-900/10"
          : "border-red-200 bg-red-50 text-red-700 shadow-red-900/10"
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
