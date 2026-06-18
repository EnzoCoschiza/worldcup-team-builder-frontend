# Technical Spec: Football UI Enhancement

## Implementation Goal

Extend the current React 19 + Vite 8 + TypeScript + Tailwind CSS v4 frontend with local preset metadata, guided football editing controls, and a more polished responsive presentation without changing backend contracts.

## Affected Frontend Areas

- `src/App.tsx`
- `src/types/team.ts`
- `src/utils/formation.ts`
- `src/components/CountrySelector.tsx`
- `src/components/PlayerEditor.tsx`
- `src/components/FootballPitch.tsx`
- `src/components/PlayerBubble.tsx`
- `src/components/TeamSummary.tsx`
- `src/index.css`
- new local data module: `src/data/presets.ts`

## Design Summary

The enhancement stays frontend-only and introduces a new local metadata layer on top of existing API data.

1. API layer remains unchanged.
2. Local metadata layer maps supported countries to:
   - flag/icon token
   - accent styling tokens
   - alias list
   - preset players by slot and normalized position
3. UI state derives available presets and suggestions from:
   - selected backend country
   - alias-resolved metadata key
   - active slot definition
4. Submission logic continues using the existing backend payload shape.

## Data And Preset Contract

Create `src/data/presets.ts` to centralize normalized football metadata.

Suggested contract:

```ts
export type NormalizedPosition =
  | "goalkeeper"
  | "right-back"
  | "center-back"
  | "left-back"
  | "defensive-midfielder"
  | "central-midfielder"
  | "attacking-midfielder"
  | "right-wing"
  | "left-wing"
  | "forward";

export type SlotPosition = {
  slotNumber: number;
  position: NormalizedPosition;
  label: string;
};

export type PresetPlayer = {
  name: string;
  position: NormalizedPosition;
  slotNumber?: number;
};

export type CountryPreset = {
  country: string;
  aliases: string[];
  flag: string;
  accentFrom: string;
  accentTo: string;
  players: PresetPlayer[];
};
```

Contract rules:
- `country` matches the canonical UI metadata entry, not necessarily every backend spelling.
- `aliases` maps backend-returned variants such as accent differences to the same metadata entry.
- `position` values are normalized locally and must be the same values saved into `Player.position`.
- `slotNumber` is required for full-team presets and optional for general player suggestions.
- The preset module must cover at least `Argentina`, `Brasil`, `España`, and `Alemania`.

## Country Metadata Strategy

- Continue rendering selector options from `GET /allowed-countries`.
- Resolve each backend country string against local metadata by exact match first, then alias match.
- If no metadata exists, render the backend country with neutral styling and no preset actions.
- Do not replace or mutate the backend country string stored for submission.

## Position Selector Strategy

- Replace the current position text input in `PlayerEditor` with a finite selector component or grouped buttons.
- The selector should default from the active slot's recommended normalized position.
- Saving a slot writes:
  - custom or suggested `name`
  - selected normalized `position`

## Preset Loading Strategy

- Add an app-level action such as `Load prebuilt team`.
- Enable the action only when the selected country resolves to a supported preset.
- On load:
  - map preset players into existing slot structure
  - overwrite only the local slot state
  - clear prior validation feedback so the new state can be reviewed cleanly
- Reject or ignore invalid preset rows during development rather than creating partial slot data.

## Suggested Player Strategy

- For the active slot, derive `suggestedPlayers` from the selected country preset by:
  - exact `slotNumber` match when present
  - fallback `position` match when slot-specific data is absent
- The editor should keep custom typing available even when suggestions are shown.
- Choosing a suggestion should populate both fields in one action and preserve the current slot focus.

## UI Composition Notes

- `CountrySelector` should render label, optional flag/icon, and accent treatment.
- `FootballPitch` and `PlayerBubble` should expose slot role labels more clearly so position choices feel spatially correct.
- `PlayerEditor` becomes the main guided-control surface for:
  - position selection
  - suggested player selection
  - custom name entry
- `TeamSummary` should expose the preset-loading entry point and keep current validation/reset actions.
- `index.css` should define refreshed theme tokens for a brighter football aesthetic with responsive spacing and balanced contrast.

## Compatibility Constraints

- Keep `Player` and backend payload compatible with `{ name, position }`.
- Do not add icon packages if the chosen approach would force unnecessary lockfile churn unless the icon value clearly exceeds inline/local asset alternatives.
- Preserve existing partial-slot validation semantics.
- Treat country aliases carefully so display metadata does not break submission behavior.

## Acceptance Criteria

1. A local preset module exists and covers normalized positions, supported country metadata, and prebuilt players.
2. The editor no longer relies on free-text positions.
3. Supported countries expose prebuilt team loading and filtered player suggestions.
4. Unsupported countries still work with neutral styling and manual editing.
5. The frontend keeps the current backend request shape and validation behavior.
6. The layout and styling plan explicitly covers responsive behavior and a non-generic football aesthetic.

## Validation Checklist

- Run `npm run build`.
- Manually verify preset loading for each supported country.
- Manually verify unsupported countries still submit correctly.
- Manually verify alias cases if the backend returns accented/non-accented variants.
- Manually verify mobile and desktop layouts after the styling refresh.
