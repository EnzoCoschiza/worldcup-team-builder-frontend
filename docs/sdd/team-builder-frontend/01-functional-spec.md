# Functional Spec: Team Builder Frontend

## Objective

Build a static frontend that lets a user assemble and validate a World Cup football team against the existing backend API. The frontend owns presentation, local state, and client-side validation only. It does not include backend logic, database, or authentication.

## Scope

Included:
- React + Vite + TypeScript + Tailwind CSS frontend.
- Health check against `GET /health`.
- Load allowed countries from `GET /allowed-countries`.
- Render a fixed 11-slot football pitch.
- Edit players per slot from a dedicated editor panel.
- Show team summary and validation feedback.
- Submit valid payloads to `POST /teams`.
- Provide project setup docs in `README` and `.env.example`.

Excluded:
- Authentication or user accounts.
- Persistence beyond in-memory browser state.
- Backend changes, database, or new endpoints.
- Dynamic formations beyond the fixed 11 predefined slots.

## Users And Main Flow

Primary user: a person building a starting eleven in the browser.

Primary flow:
1. User opens the app.
2. Frontend checks backend health and shows connection status.
3. Frontend loads allowed countries and enables country selection.
4. User selects a country.
5. User clicks one of the 11 pitch slots.
6. User enters player name and position for that slot, saves, and sees the slot update.
7. User repeats for as many players as desired from 1 to 11.
8. User validates the team.
9. Frontend blocks invalid submissions with clear client-side feedback.
10. Frontend sends only completed players to `POST /teams` and shows success or error feedback.

## Functional Requirements

### App Shell

- The main screen must show:
  - title `World Cup Team Builder`
  - subtitle `Build and validate your starting eleven`
  - API connection indicator
- The UI must be responsive for desktop and mobile widths.
- The visual style should feel modern and football-focused, with the pitch as the main focal point.

### API Health

- On initial load, the frontend must call `GET /health`.
- If the response indicates success, show a green/positive status.
- If the request fails or returns a non-OK status, show a red/error status.
- Health status is informative; it does not replace submit-time error handling.

### Allowed Countries

- On initial load, the frontend must call `GET /allowed-countries`.
- The country selector must be populated from the backend response, not hardcoded as the source of truth.
- A country selection is required before team validation.
- The selected country should influence lightweight visual accents such as badge or border styling.

### Pitch And Slots

- The pitch must always show exactly 11 predefined player slots.
- Each slot represents a football position point in a fixed formation.
- Empty slots show the slot number only.
- Filled slots show:
  - slot number
  - player label derived from short name or initials
  - player position
- Clicking a slot must select it and open or refresh the player editor context for that slot.
- The frontend must never allow more than 11 slots or submission of empty slots.

### Player Editor

- The editor must show which slot is being edited, for example `Editing player #7`.
- The editor must provide:
  - `name` input
  - `position` input
  - `Save player` action
  - `Clear slot` action
- A slot is considered filled only when both `name` and `position` are present.
- Clearing a slot removes that player from the local team state.

### Team Summary

- The summary panel must display:
  - selected country
  - loaded players count in `X / 11` format
  - list of completed players
  - `Validate Team` action
  - `Reset Team` action
- Reset clears selected country, all slot assignments, active feedback, and editor state.

### Validation Rules

- Before submit, the frontend must block validation when:
  - no country is selected
  - no completed players exist
  - the active team contains partially completed player data
- For the no-player case, show: `Add at least one player before validating`.
- For partial player entries, the frontend should ask the user to complete or clear that slot before validating.
- The frontend may submit teams with 1 to 11 completed players.
- The frontend must send only completed players in the request payload.

### Submission And Feedback

- On validation, the frontend must call `POST /teams` with:
  - selected country
  - array of completed players only
- The Validate action must show a loading state while the request is in flight.
- On success, show positive feedback with the backend success message.
- On backend rejection, show negative feedback with the backend `detail` message when available.
- On network or unexpected errors, show a generic error message that the validation failed.

## Non-Functional Requirements

- No unnecessary dependencies beyond the required stack.
- Client code should remain simple, componentized, and easy to explain.
- TypeScript types must cover API payloads and slot state.
- Environment configuration must use `VITE_API_BASE_URL`.

## Acceptance Criteria

1. On first render, the app requests `/health` and `/allowed-countries` and reflects their outcomes in the UI.
2. The user can select one allowed country and edit any of the 11 predefined pitch slots.
3. Empty slots remain visible and numbered; completed slots display player summary information.
4. The frontend blocks submit when no country is selected, when zero players are completed, or when any slot is partially filled.
5. A valid submission sends `POST /teams` with the selected country and only completed players.
6. The app shows loading during submission and clear success or error feedback after the response.
7. The documented setup includes `.env.example`, `README`, and commands for install, dev, and build.
