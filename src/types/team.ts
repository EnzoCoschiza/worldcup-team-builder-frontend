export type Player = {
  name: string;
  position: string;
};

export type PlayerSlot = {
  slotNumber: number;
  x: number;
  y: number;
  player?: Player;
};

export type TeamPayload = {
  country: string;
  players: Player[];
};

export type ApiHealthStatus = "idle" | "healthy" | "unhealthy";

export type SubmitState = "idle" | "submitting" | "success" | "error";

export type Feedback = {
  kind: "success" | "error";
  message: string;
} | null;
