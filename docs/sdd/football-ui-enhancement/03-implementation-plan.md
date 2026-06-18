# Implementation Plan: Football UI Enhancement

## Ordered Handoff

1. Create a local metadata layer in `src/data/presets.ts`.
   Evidence:
   - Exports normalized football position union, slot-role metadata, country metadata, team presets, and player suggestion records.
   - Includes canonical entries for `Argentina`, `Brasil`, `España`, and `Alemania` plus aliases for backend variants such as `Brazil`, `Spain`, `Germany`, and accent-mismatched spellings.
   - Does not change backend payload types.

2. Extend shared frontend types and formation metadata.
   Exact changes:
   - `src/types/team.ts`: narrow `Player.position` to the new normalized position type import; extend `PlayerSlot` with presentational role metadata only if needed by UI (`role`, `roleLabel`), without altering submit payload types.
   - `src/utils/formation.ts`: replace plain coordinates with the canonical 11-slot definition that includes `slotNumber`, `x`, `y`, normalized recommended `position`, and short role label for each slot.
   Evidence:
   - Default slot creation still returns 11 slots.
   - Every slot has one recommended normalized position used by pitch labels, editor defaults, and preset matching.

3. Refactor `src/App.tsx` to own metadata resolution and preset/suggestion selectors.
   Exact changes:
   - Derive `resolvedCountryMeta` from `selectedCountry` using helper functions from `src/data/presets.ts`.
   - Derive `activeSlot`, `completedPlayers`, and `partialSlots` as today, plus `activeSlotSuggestions` and `canLoadPreset`.
   - Add handlers:
     - `handleSelectCountry(country: string)`: keep backend value unchanged, clear transient feedback.
     - `handleLoadPreset()`: map preset players into current slot array by `slotNumber`, skip invalid rows, clear feedback, keep active slot stable.
     - `handleApplySuggestedPlayer(slotNumber: number, player: PresetPlayer)`: save both `name` and normalized `position`.
   State flow:
   - `selectedCountry` stays the raw backend string.
   - `resolvedCountryMeta = resolveCountryMetadata(selectedCountry)`.
   - `activeSlotSuggestions = getSuggestedPlayers(resolvedCountryMeta, activeSlot)`.
   - `load preset` uses the same resolver and writes only local slot state.
   Evidence:
   - Validation and submit still send `{ country: selectedCountry, players: completedPlayers }`.
   - Preset load never creates partial players.

4. Move country presentation concerns out of inline component data.
   Exact changes:
   - `src/components/CountrySelector.tsx`: remove hardcoded `countryMeta`; accept country metadata lookup results or helper accessors from `src/data/presets.ts`.
   - Render only backend-provided countries, but enrich supported ones with flag and accent tokens.
   - Keep unsupported countries selectable with neutral styling and no preset affordance.
   Evidence:
   - A country absent from `/allowed-countries` cannot appear.
   - Alias resolution affects display only, not submitted country value.

5. Replace free-text position entry in `src/components/PlayerEditor.tsx`.
   Exact changes:
   - Keep local `name` state.
   - Replace `position` text input with constrained selector UI backed by normalized position options.
   - Initialize selected position from `activeSlot.player?.position`, else slot recommended position.
   - Add suggested-player chips/cards for the active slot and country.
   - Keep manual name entry available even when suggestions exist.
   Functions/props to add:
   - `positionOptions` or imported `NORMALIZED_POSITIONS`.
   - `suggestedPlayers: PresetPlayer[]`.
   - `onApplySuggestion(slotNumber, player)`.
   Evidence:
   - Saving a slot always writes a normalized position.
   - Empty name + empty position still clears the slot.
   - Partial save still shows an editor error and does not bypass validation.

6. Update pitch and summary for preset-aware football UI.
   Exact changes:
   - `src/components/FootballPitch.tsx`: keep current pitch structure but improve layout classes for mobile and desktop; optionally expose role lanes/section labels without changing slot count.
   - `src/components/PlayerBubble.tsx`: show role label or abbreviated normalized position when empty/filled; keep active and completed states visually distinct.
   - `src/components/TeamSummary.tsx`: add `Load prebuilt team` action near country summary, gated by `canLoadPreset`; optionally show preset availability/help text.
   Evidence:
   - Users can load a preset, then still edit/clear any slot.
   - Summary continues to show loaded players and validate/reset actions.

7. Refresh `src/index.css` and component class usage for the responsive football aesthetic.
   Responsive/design requirements:
   - Preserve the current bright football direction, but avoid a single dark-green wash.
   - Use country accent gradients sparingly on chips, dividers, and CTA emphasis.
   - Mobile first: stack pitch/editor/summary cleanly, keep tap targets >= 44px, avoid horizontal overflow.
   - Desktop: keep a two-column layout with pitch dominant and editor/summary sidebar readable at `lg+`.
   - Ensure contrast on text over pitch and accent surfaces.
   Evidence:
   - Country cards, preset controls, selector chips, and player bubbles remain legible on small screens.
   - Pitch/editor/summary are all usable without zoom on mobile widths.

8. Validate behavior and regression constraints.
   Validation commands:
   - `npm run build`
   Manual checks:
   - Select each supported country and confirm flag/accent/preset availability.
   - Load each supported preset and confirm all saved slots are complete.
   - Switch to an unsupported country and confirm neutral UI, manual editing, and successful validation path.
   - Confirm alias spellings from backend responses map to the same local metadata while submit payload keeps the original backend string.
   - For an active slot, confirm suggestions prefer exact `slotNumber` matches, then fall back to `position` matches.
   - Confirm clearing a slot, resetting the team, and validating partial slots still behave exactly as before.
