import { useEffect, useMemo, useState } from "react";
import { checkHealth, getAllowedCountries, validateTeam } from "./api/client";
import { AppHeader } from "./components/AppHeader";
import { CountrySelector } from "./components/CountrySelector";
import { FeedbackMessage } from "./components/FeedbackMessage";
import { FootballPitch } from "./components/FootballPitch";
import { PlayerEditor } from "./components/PlayerEditor";
import { TeamSummary } from "./components/TeamSummary";
import { getSuggestedPlayers, resolveCountryMetadata, type PresetPlayer } from "./data/presets";
import type { ApiHealthStatus, Feedback, Player, PlayerSlot, SubmitState } from "./types/team";
import { defaultFormation } from "./utils/formation";

function createInitialSlots(): PlayerSlot[] {
  return defaultFormation.map((slot) => ({ ...slot }));
}

function isCompletePlayer(player: Player | undefined): player is Player {
  return Boolean(player?.name.trim() && player.position);
}

function isPartialPlayer(player: Player | undefined): boolean {
  return Boolean(player && (player.name.trim() || player.position) && !isCompletePlayer(player));
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

  const resolvedCountryMeta = useMemo(
    () => (selectedCountry ? resolveCountryMetadata(selectedCountry) : null),
    [selectedCountry],
  );

  const activeSlotSuggestions = useMemo(
    () => getSuggestedPlayers(resolvedCountryMeta, activeSlot),
    [activeSlot, resolvedCountryMeta],
  );

  const canLoadPreset = Boolean(resolvedCountryMeta?.preset);

  function handleSelectCountry(country: string) {
    setSelectedCountry(country);
    setFeedback(null);
  }

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

  function handleApplySuggestedPlayer(slotNumber: number, player: PresetPlayer) {
    handleSavePlayer(slotNumber, {
      name: player.name,
      position: player.position,
    });
  }

  function handleLoadPreset() {
    const preset = resolvedCountryMeta?.preset;

    if (!preset) {
      return;
    }

    setSlots((currentSlots) =>
      currentSlots.map((slot) => {
        const presetPlayer = preset.players.find((player) => player.slotNumber === slot.slotNumber);

        if (!presetPlayer?.name || !presetPlayer.position) {
          const { player: _player, ...slotWithoutPlayer } = slot;
          return slotWithoutPlayer;
        }

        return {
          ...slot,
          player: {
            name: presetPlayer.name,
            position: presetPlayer.position,
          },
        };
      }),
    );
    setFeedback(null);
    setSubmitState("idle");
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
    <main className="min-h-screen overflow-x-hidden bg-[#f4f7ef] px-3 py-4 text-slate-950 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(236,253,245,0.74)_42%,rgba(224,242,254,0.64))]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-1 bg-gradient-to-r from-lime-400 via-sky-300 to-amber-300" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <AppHeader healthStatus={healthStatus} />

        <div
          className="h-1 rounded-full shadow-sm"
          style={{
            background: `linear-gradient(90deg, ${resolvedCountryMeta?.accentFrom ?? "#34d399"}, ${
              resolvedCountryMeta?.accentTo ?? "#38bdf8"
            })`,
          }}
        />

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
              onSelect={handleSelectCountry}
              selectedCountry={selectedCountry}
            />
            <PlayerEditor
              activeSlot={activeSlot}
              countryMeta={resolvedCountryMeta}
              onApplySuggestion={handleApplySuggestedPlayer}
              onClear={handleClearSlot}
              onSave={handleSavePlayer}
              suggestedPlayers={activeSlotSuggestions}
            />
            <TeamSummary
              canLoadPreset={canLoadPreset}
              completedPlayers={completedPlayers}
              countryMeta={resolvedCountryMeta}
              onLoadPreset={handleLoadPreset}
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
