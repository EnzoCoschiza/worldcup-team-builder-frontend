import type { TeamPayload } from "../types/team";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

type HealthResponse = {
  status?: string;
};

type CountriesResponse = {
  allowed_countries?: string[];
};

type TeamResponse = {
  message: string;
  country: string;
  players_count: number;
};

async function parseJson(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function getBackendMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "detail" in body) {
    const detail = (body as { detail?: unknown }).detail;

    if (typeof detail === "string" && detail.trim()) {
      return detail;
    }
  }

  return fallback;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
  const body = await parseJson(response);

  if (!response.ok) {
    throw new Error(getBackendMessage(body, "Request failed"));
  }

  return body as T;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const body = await request<HealthResponse>("/health");

    return body.status === "ok";
  } catch {
    return false;
  }
}

export async function getAllowedCountries(): Promise<string[]> {
  const body = await request<CountriesResponse>("/allowed-countries");

  if (!Array.isArray(body.allowed_countries)) {
    throw new Error("Could not load allowed countries");
  }

  return body.allowed_countries;
}

export async function validateTeam(payload: TeamPayload): Promise<TeamResponse> {
  return request<TeamResponse>("/teams", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
