# Technical Spec: Team Builder Frontend

## Implementation Goal

Implement a frontend-only Vite application that consumes the existing API through `fetch`, maintains all team-editing state client-side, and provides a responsive football-pitch UI with validation and submit feedback.

## Stack And Constraints

- Runtime: Node.js `v24.13.1` confirmed by explorer.
- Package manager on PowerShell: use `npm.cmd`; avoid `npm.ps1`.
- Framework: React with Vite.
- Language: TypeScript.
- Styling: Tailwind CSS using the current supported setup at implementation time.
- Networking: browser `fetch`.
- No backend, database, authentication, or server-side rendering.

## Proposed Documentation Target

Feature folder:
- `docs/sdd/team-builder-frontend/`

Expected implementation deliverables:
- project scaffold and config
- `.env.example`
- `README.md`
- app source under `src/`

## High-Level Architecture

Single-page frontend with three layers:

1. API layer
   - wraps HTTP calls and normalizes errors
2. State and orchestration layer
   - manages bootstrapping, selected country, slot data, active editor slot, validation state, and submit lifecycle
3. Presentational component layer
   - renders header, country selector, pitch, editor, summary, and feedback

No global state library is required. React local state in `App.tsx` is sufficient for the current scope.

## Suggested Source Structure

```txt
src/
├── api/
│   └── client.ts
├── components/
│   ├── AppHeader.tsx
│   ├── CountrySelector.tsx
│   ├── FeedbackMessage.tsx
│   ├── FootballPitch.tsx
│   ├── PlayerBubble.tsx
│   ├── PlayerEditor.tsx
│   └── TeamSummary.tsx
├── types/
│   └── team.ts
├── utils/
│   └── formation.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Data Model

`types/team.ts`

```ts
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
```

Recommended local UI types:

```ts
export type ApiHealthStatus = "idle" | "healthy" | "unhealthy";

export type SubmitState = "idle" | "submitting" | "success" | "error";

export type Feedback = {
  kind: "success" | "error";
  message: string;
} | null;
```

## API Contract Mapping

Base URL:
- `import.meta.env.VITE_API_BASE_URL`

Endpoints:

### `checkHealth()`

- Method: `GET`
- Path: `/health`
- Success condition: HTTP 200 and body `{ status: "ok" }`
- Return shape: boolean or a small typed result used by the header indicator

### `getAllowedCountries()`

- Method: `GET`
- Path: `/allowed-countries`
- Expected response:

```json
{
  "allowed_countries": ["Argentina", "Brasil", "España", "Alemania"]
}
```

- Return shape: `string[]`

### `validateTeam(payload)`

- Method: `POST`
- Path: `/teams`
- Request body:

```json
{
  "country": "Argentina",
  "players": [
    {
      "name": "Messi",
      "position": "forward"
    }
  ]
}
```

- Success response includes `message`, `country`, and `players_count`
- Error response may include `detail`
- Client should parse JSON when possible and surface backend `detail` for user-facing errors

## State Design

`App.tsx` should own the canonical state:

- `healthStatus`
- `countries`
- `countriesLoading`
- `countriesError`
- `selectedCountry`
- `slots`
- `activeSlotNumber`
- `feedback`
- `submitState`

Derived values:

- `completedPlayers`: slots with both `name` and `position`
- `partialSlots`: slots with only one of the two required fields
- `playersCount`
- `canSubmit`: true only when country exists, at least one completed player exists, no partial slots exist, and no submit is in flight

## UI Component Responsibilities

### `AppHeader`

- Shows title, subtitle, and API health status badge.

### `CountrySelector`

- Renders allowed countries from API data.
- Emits selected country changes to parent state.

### `FootballPitch`

- Renders pitch container and formation layout.
- Maps each slot into `PlayerBubble`.
- Highlights the active slot.

### `PlayerBubble`

- Displays slot number and either placeholder or player summary.
- Emits click events for slot selection.

### `PlayerEditor`

- Receives the active slot and editing callbacks.
- Handles controlled form inputs for name and position.
- Saves completed player data into the selected slot.
- Clears the current slot.

### `TeamSummary`

- Displays selected country, completed player count, and completed player list.
- Exposes Validate and Reset actions.

### `FeedbackMessage`

- Shows transient or persistent success/error message content based on submit result.

## Formation Utility

`utils/formation.ts` should export a fixed array of 11 slot coordinates expressed as percentages. This keeps the pitch layout declarative and separates placement from rendering.

Initial formation seed:

```ts
export const defaultFormation = [
  { slotNumber: 1, x: 50, y: 88 },
  { slotNumber: 2, x: 18, y: 68 },
  { slotNumber: 3, x: 38, y: 70 },
  { slotNumber: 4, x: 62, y: 70 },
  { slotNumber: 5, x: 82, y: 68 },
  { slotNumber: 6, x: 28, y: 48 },
  { slotNumber: 7, x: 50, y: 44 },
  { slotNumber: 8, x: 72, y: 48 },
  { slotNumber: 9, x: 25, y: 24 },
  { slotNumber: 10, x: 50, y: 18 },
  { slotNumber: 11, x: 75, y: 24 }
];
```

## Validation Strategy

Client-side validation before `POST /teams`:

- reject missing country
- reject zero completed players
- reject any partially filled slot
- build payload from completed players only

Error precedence:
1. client-side validation errors
2. backend business-rule errors from `detail`
3. generic network/unexpected error fallback

## Styling Strategy

- Tailwind handles layout, spacing, gradients, and responsive behavior.
- `index.css` should define base theme tokens and Tailwind imports.
- The pitch should be implemented with layered containers and simple CSS shapes rather than SVG-heavy custom drawing unless implementation needs it.
- Country selection may use small accent variants per country without introducing a theming framework.

## Bootstrapping And Lifecycle

On app mount:
1. request health status
2. request allowed countries
3. initialize slots from `defaultFormation`

During editing:
1. user selects slot
2. editor loads slot data or empty fields
3. save updates only the selected slot

During submit:
1. run client validation
2. set submit loading state
3. call `validateTeam`
4. show success or error feedback
5. clear loading state

## Error Handling

- API helpers should throw normalized `Error` instances with user-displayable messages.
- UI should avoid silent failures for bootstrapping and submit flows.
- If `/allowed-countries` fails, the selector should reflect the failure and prevent valid submission.
- Health failure should not crash the app; it only affects the status indicator and may foreshadow submit issues.

## README Requirements

The implementation should include a `README.md` that covers:

- project purpose
- required stack
- local setup with `npm install`
- local run with `npm run dev`
- production build with `npm run build`
- `.env` configuration using `VITE_API_BASE_URL`
- expected backend dependency and flow overview

## Technical Acceptance Criteria

1. The frontend stack is documented as React + Vite + TypeScript + Tailwind with `fetch` and no extra backend/auth layers.
2. API interaction is limited to `GET /health`, `GET /allowed-countries`, and `POST /teams` using `VITE_API_BASE_URL`.
3. The state model supports 11 fixed slots, selected country, active editor slot, validation status, and feedback.
4. The payload builder excludes empty slots and blocks partial slot submissions.
5. The implementation plan can scaffold the app on PowerShell using `npm.cmd` without depending on `npm.ps1`.
6. The deliverable list explicitly includes `.env.example` and `README.md`.
