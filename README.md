# World Cup Team Builder Frontend

A React frontend for building a World Cup starting eleven on a visual football pitch and validating it against the existing `worldcup-team-builder-api` backend.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Browser `fetch` only for API calls

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Configure the backend base URL:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Run Locally

Start the backend API first, then run:

```bash
npm run dev
```

The app calls:

- `GET /health` to show API status.
- `GET /allowed-countries` to populate the country selector.
- `POST /teams` to validate the selected country and completed players.

## Build

```bash
npm run build
```

## Flow

Open the app, pick an allowed country, click one of the 11 pitch slots, save player name and position, then validate the team. Empty slots are visible but not submitted. The frontend blocks missing country, zero-player validation, and partially filled slots before calling the backend.
