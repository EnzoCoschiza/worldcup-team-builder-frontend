import { useEffect, useMemo, useState } from "react";
import { checkHealth, getAllowedCountries, validateTeam } from "./api/client";
import { AppHeader } from "./components/AppHeader";
import { CountrySelector, getCountryAccent } from "./components/CountrySelector";
import { FeedbackMessage } from "./components/FeedbackMessage";
import { FootballPitch } from "./components/FootballPitch";
import { PlayerEditor } from "./components/PlayerEditor";
import { TeamSummary } from "./components/TeamSummary";
import type { ApiHealthStatus, Feedback, Player, PlayerSlot, SubmitState } from "./types/team";
import { defaultFormation } from "./utils/formation";

function createInitialSlots(): PlayerSlot[] {
  return defaultFormation.map((slot) => ({ ...slot }));
}

function isCompletePlayer(player: Player | undefined): player is Player {
  return Boolean(player?.name.trim() && player.position.trim());
}

function isPartialPlayer(player: Player | undefined): boolean {
  return Boolean(player && (player.name.trim() || player.position.trim()) && !isCompletePlayer(player));
}

export default function App() {
  const [healthStatus, setHealthStatus] = useState<ApiHealthStatus>("idle");
  const [countries, setCountries] = useState<string[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [slots, setSlots] = useState<PlayerSlot[]>(createInitialSlots);
  const [activeSlotNumber, setActiveSlotNumber] = useState<number | null>(1);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  useEffect(() => {
    let ignore = false;

    async function bootstrap() {
      const healthy = await checkHealth();

      if (!ignore) {
        setHealthStatus(healthy ? "healthy" : "unhealthy");
      }

      try {
        const allowedCountries = await getAllowedCountries();

        if (!ignore) {
          setCountries(allowedCountries);
          setCountriesError(null);
        }
      } catch (error) {
        if (!ignore) {
          setCountriesError(error instanceof Error ? error.message : "Could not load allowed countries");
        }
      } finally {
        if (!ignore) {
          setCountriesLoading(false);
        }
      }
    }

    void bootstrap();

    return () => {
      ignore = true;
    };
  }, []);

  const activeSlot = useMemo(
    () => slots.find((slot) => slot.slotNumber === activeSlotNumber) ?? null,
    [activeSlotNumber, slots],
  );

  const completedPlayers = useMemo(
    () =>
      slots.flatMap((slot) => {
        if (!isCompletePlayer(slot.player)) {
          return [];
        }

        return [slot.player];
      }),
    [slots],
  );

  const partialSlots = useMemo(
    () => slots.filter((slot) => isPartialPlayer(slot.player)).map((slot) => slot.slotNumber),
    [slots],
  );

  const countryAccent = selectedCountry ? getCountryAccent(selectedCountry) : "from-emerald-300 to-cyan-300";

  function handleSavePlayer(slotNumber: number, player: Player) {
    setSlots((currentSlots) =>
      currentSlots.map((slot) =>
        slot.slotNumber === slotNumber
          ? {
              ...slot,
              player,
            }
          : slot,
      ),
    );
    setFeedback(null);
  }

  function handleClearSlot(slotNumber: number) {
    setSlots((currentSlots) =>
      currentSlots.map((slot) => {
        if (slot.slotNumber !== slotNumber) {
          return slot;
        }

        const { player: _player, ...slotWithoutPlayer } = slot;
        return slotWithoutPlayer;
      }),
    );
    setFeedback(null);
  }

  function handleReset() {
    setSelectedCountry("");
    setSlots(createInitialSlots());
    setActiveSlotNumber(1);
    setFeedback(null);
    setSubmitState("idle");
  }

  async function handleValidate() {
    if (!selectedCountry) {
      setFeedback({ kind: "error", message: "Select a country before validating" });
      return;
    }

    if (!completedPlayers.length) {
      setFeedback({ kind: "error", message: "Add at least one player before validating" });
      return;
    }

    if (partialSlots.length) {
      setFeedback({
        kind: "error",
        message: `Complete or clear slot ${partialSlots.join(", ")} before validating`,
      });
      return;
    }

    setSubmitState("submitting");
    setFeedback(null);

    try {
      const response = await validateTeam({
        country: selectedCountry,
        players: completedPlayers,
      });

      setSubmitState("success");
      setFeedback({ kind: "success", message: response.message || "Team created successfully" });
    } catch (error) {
      setSubmitState("error");
      setFeedback({
        kind: "error",
        message: error instanceof Error ? error.message : "Team validation failed",
      });
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#07110d] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.2),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.16),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0),rgba(15,23,42,0.72))]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-300 via-cyan-200 to-lime-300" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <AppHeader healthStatus={healthStatus} />

        <div className={`h-1 rounded-full bg-gradient-to-r ${countryAccent} opacity-80`} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <FootballPitch
            activeSlotNumber={activeSlotNumber}
            onSelectSlot={setActiveSlotNumber}
            slots={slots}
          />

          <aside className="space-y-6">
            <CountrySelector
              countries={countries}
              error={countriesError}
              loading={countriesLoading}
              onSelect={(country) => {
                setSelectedCountry(country);
                setFeedback(null);
              }}
              selectedCountry={selectedCountry}
            />
            <PlayerEditor activeSlot={activeSlot} onClear={handleClearSlot} onSave={handleSavePlayer} />
            <TeamSummary
              completedPlayers={completedPlayers}
              onReset={handleReset}
              onValidate={handleValidate}
              selectedCountry={selectedCountry}
              submitLoading={submitState === "submitting"}
            />
            <FeedbackMessage feedback={feedback} />
          </aside>
        </div>
      </div>
    </main>
  );
}
