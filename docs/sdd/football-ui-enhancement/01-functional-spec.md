# Functional Spec: Football UI Enhancement

## Objective

Improve the existing team builder frontend with a more football-native experience: country flags, guided position selection, prebuilt national-team presets, prebuilt player suggestions, and a stronger responsive visual design.

## Scope

Included:
- enrich country presentation with local metadata such as flag, accent colors, and aliases while keeping `GET /allowed-countries` as the source of truth
- replace free-text position entry with a constrained football position selector
- add prebuilt team loading for supported countries
- add suggested prebuilt players filtered by selected country and slot/position
- improve the football aesthetic and responsive behavior across mobile and desktop

Excluded:
- backend API changes
- changes to the submit payload shape
- dynamic formations outside the current fixed 11-slot layout
- persistence beyond current browser session state

## Functional Requirements

### Countries

- The app must continue loading allowed countries from `GET /allowed-countries`.
- Local metadata may enrich each allowed country with:
  - flag icon
  - accent colors
  - display alias handling
- Local metadata must not introduce countries that are not returned by the backend.
- If a backend country value has a known alias, the UI must map it to the same local metadata entry without changing the outbound payload country value.

### Position Selection

- The player editor must replace the current free-text `position` input with a constrained selector based on football positions.
- The selector must expose normalized values that are compatible with the backend payload.
- The UI should make the selector easy to use on touch devices and clearly indicate the active choice.

### Prebuilt Teams

- The app must provide an action to load a prebuilt team for supported countries.
- Initial supported presets: `Argentina`, `Brasil`, `España`, `Alemania`.
- Loading a preset must populate only valid slot/player combinations defined by local preset data.
- The user must still be able to edit or clear any loaded slot after applying a preset.

### Suggested Players

- When a slot is active, the editor must offer suggested players for the selected country filtered by normalized position and/or slot definition.
- Selecting a suggested player must fill the player name and position for that slot in one action.
- If no suggestions exist for the active slot, the user must still be able to enter a custom player name while keeping the constrained position selector.

### Validation And Submission

- Existing validation rules must remain in force:
  - selected country is required
  - at least one completed player is required
  - partially completed slots must block validation
- Presets and suggestions must not bypass validation.
- Submission must continue sending only:
  - `country`
  - `players[]` with `name` and normalized `position`

### Visual And Responsive Experience

- The pitch and editor layout must feel football-specific rather than generic form UI.
- Country identity should be visible through flags and restrained accent styling.
- The design must remain readable and usable on mobile, tablet, and desktop.
- The visual refresh must avoid a single-tone green or dark-only palette.

## Acceptance Criteria

1. Allowed countries still come from the backend, while supported entries display local flags and football-themed presentation.
2. Users can assign positions only through the new constrained selector, not free text.
3. Users can load a supported prebuilt team and then edit individual slots normally.
4. Suggested players change according to selected country and active slot/position context.
5. Team validation rules and payload shape remain unchanged from the current contract.
6. The interface remains usable and visually coherent on small and large screens.

## Validation Checklist

- Confirm countries not returned by the backend never appear in the selector.
- Confirm alias mapping does not alter the submitted country value.
- Confirm preset loading never creates partial slots.
- Confirm suggested players always write normalized `position` values.
- Confirm manual custom entry still works when no preset suggestion exists.
- Confirm submit payload remains `{ country, players: [{ name, position }] }`.
- Confirm mobile and desktop layouts keep the pitch, editor, and summary accessible.
