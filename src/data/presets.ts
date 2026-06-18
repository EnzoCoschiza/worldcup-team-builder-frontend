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

export type PositionOption = {
  value: NormalizedPosition;
  label: string;
  shortLabel: string;
  line: "Goal" | "Defense" | "Midfield" | "Attack";
};

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
  textColor: string;
  players: PresetPlayer[];
};

export type ResolvedCountryMetadata = {
  country: string;
  flag: string;
  accentFrom: string;
  accentTo: string;
  textColor: string;
  preset: CountryPreset | null;
};

export const POSITION_OPTIONS: PositionOption[] = [
  { value: "goalkeeper", label: "Goalkeeper", shortLabel: "GK", line: "Goal" },
  { value: "right-back", label: "Right Back", shortLabel: "RB", line: "Defense" },
  { value: "center-back", label: "Center Back", shortLabel: "CB", line: "Defense" },
  { value: "left-back", label: "Left Back", shortLabel: "LB", line: "Defense" },
  { value: "defensive-midfielder", label: "Defensive Midfielder", shortLabel: "DM", line: "Midfield" },
  { value: "central-midfielder", label: "Central Midfielder", shortLabel: "CM", line: "Midfield" },
  { value: "attacking-midfielder", label: "Attacking Midfielder", shortLabel: "AM", line: "Midfield" },
  { value: "right-wing", label: "Right Wing", shortLabel: "RW", line: "Attack" },
  { value: "left-wing", label: "Left Wing", shortLabel: "LW", line: "Attack" },
  { value: "forward", label: "Forward", shortLabel: "FW", line: "Attack" },
];

export const SLOT_POSITIONS: SlotPosition[] = [
  { slotNumber: 1, position: "goalkeeper", label: "GK" },
  { slotNumber: 2, position: "left-back", label: "LB" },
  { slotNumber: 3, position: "center-back", label: "CB" },
  { slotNumber: 4, position: "center-back", label: "CB" },
  { slotNumber: 5, position: "right-back", label: "RB" },
  { slotNumber: 6, position: "central-midfielder", label: "CM" },
  { slotNumber: 7, position: "defensive-midfielder", label: "DM" },
  { slotNumber: 8, position: "central-midfielder", label: "CM" },
  { slotNumber: 9, position: "left-wing", label: "LW" },
  { slotNumber: 10, position: "forward", label: "FW" },
  { slotNumber: 11, position: "right-wing", label: "RW" },
];

export const COUNTRY_PRESETS: CountryPreset[] = [
  {
    country: "Argentina",
    aliases: ["argentina", "arg"],
    flag: "🇦🇷",
    accentFrom: "#75aadb",
    accentTo: "#ffffff",
    textColor: "#06223a",
    players: [
      { slotNumber: 1, name: "Emiliano Martinez", position: "goalkeeper" },
      { slotNumber: 2, name: "Nicolas Tagliafico", position: "left-back" },
      { slotNumber: 3, name: "Nicolas Otamendi", position: "center-back" },
      { slotNumber: 4, name: "Cristian Romero", position: "center-back" },
      { slotNumber: 5, name: "Nahuel Molina", position: "right-back" },
      { slotNumber: 6, name: "Alexis Mac Allister", position: "central-midfielder" },
      { slotNumber: 7, name: "Enzo Fernandez", position: "defensive-midfielder" },
      { slotNumber: 8, name: "Rodrigo De Paul", position: "central-midfielder" },
      { slotNumber: 9, name: "Julian Alvarez", position: "left-wing" },
      { slotNumber: 10, name: "Lautaro Martinez", position: "forward" },
      { slotNumber: 11, name: "Lionel Messi", position: "right-wing" },
      { name: "Angel Di Maria", position: "right-wing" },
      { name: "Paulo Dybala", position: "attacking-midfielder" },
    ],
  },
  {
    country: "Brasil",
    aliases: ["brasil", "brazil", "bra"],
    flag: "🇧🇷",
    accentFrom: "#f7df1e",
    accentTo: "#159447",
    textColor: "#062b19",
    players: [
      { slotNumber: 1, name: "Alisson", position: "goalkeeper" },
      { slotNumber: 2, name: "Guilherme Arana", position: "left-back" },
      { slotNumber: 3, name: "Gabriel Magalhaes", position: "center-back" },
      { slotNumber: 4, name: "Marquinhos", position: "center-back" },
      { slotNumber: 5, name: "Danilo", position: "right-back" },
      { slotNumber: 6, name: "Bruno Guimaraes", position: "central-midfielder" },
      { slotNumber: 7, name: "Casemiro", position: "defensive-midfielder" },
      { slotNumber: 8, name: "Lucas Paqueta", position: "attacking-midfielder" },
      { slotNumber: 9, name: "Vinicius Junior", position: "left-wing" },
      { slotNumber: 10, name: "Rodrygo", position: "forward" },
      { slotNumber: 11, name: "Raphinha", position: "right-wing" },
      { name: "Endrick", position: "forward" },
      { name: "Neymar Jr", position: "left-wing" },
    ],
  },
  {
    country: "España",
    aliases: ["espana", "españa", "spain", "esp"],
    flag: "🇪🇸",
    accentFrom: "#c60b1e",
    accentTo: "#ffc400",
    textColor: "#3a0808",
    players: [
      { slotNumber: 1, name: "Unai Simon", position: "goalkeeper" },
      { slotNumber: 2, name: "Alejandro Balde", position: "left-back" },
      { slotNumber: 3, name: "Aymeric Laporte", position: "center-back" },
      { slotNumber: 4, name: "Robin Le Normand", position: "center-back" },
      { slotNumber: 5, name: "Dani Carvajal", position: "right-back" },
      { slotNumber: 6, name: "Pedri", position: "central-midfielder" },
      { slotNumber: 7, name: "Rodri", position: "defensive-midfielder" },
      { slotNumber: 8, name: "Gavi", position: "central-midfielder" },
      { slotNumber: 9, name: "Nico Williams", position: "left-wing" },
      { slotNumber: 10, name: "Alvaro Morata", position: "forward" },
      { slotNumber: 11, name: "Lamine Yamal", position: "right-wing" },
      { name: "Dani Olmo", position: "attacking-midfielder" },
      { name: "Mikel Oyarzabal", position: "forward" },
    ],
  },
  {
    country: "Alemania",
    aliases: ["alemania", "germany", "deutschland", "ger"],
    flag: "🇩🇪",
    accentFrom: "#111827",
    accentTo: "#facc15",
    textColor: "#ffffff",
    players: [
      { slotNumber: 1, name: "Manuel Neuer", position: "goalkeeper" },
      { slotNumber: 2, name: "David Raum", position: "left-back" },
      { slotNumber: 3, name: "Nico Schlotterbeck", position: "center-back" },
      { slotNumber: 4, name: "Antonio Rudiger", position: "center-back" },
      { slotNumber: 5, name: "Joshua Kimmich", position: "right-back" },
      { slotNumber: 6, name: "Ilkay Gundogan", position: "central-midfielder" },
      { slotNumber: 7, name: "Robert Andrich", position: "defensive-midfielder" },
      { slotNumber: 8, name: "Toni Kroos", position: "central-midfielder" },
      { slotNumber: 9, name: "Florian Wirtz", position: "left-wing" },
      { slotNumber: 10, name: "Kai Havertz", position: "forward" },
      { slotNumber: 11, name: "Jamal Musiala", position: "right-wing" },
      { name: "Leroy Sane", position: "right-wing" },
      { name: "Niclas Fullkrug", position: "forward" },
    ],
  },
];

const neutralCountryMeta = {
  flag: "⚽",
  accentFrom: "#e2e8f0",
  accentTo: "#94a3b8",
  textColor: "#0f172a",
};

function normalizeCountry(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getPositionOption(position: NormalizedPosition): PositionOption {
  return POSITION_OPTIONS.find((option) => option.value === position) ?? POSITION_OPTIONS[0];
}

export function resolveCountryMetadata(country: string): ResolvedCountryMetadata {
  const normalizedCountry = normalizeCountry(country);
  const preset =
    COUNTRY_PRESETS.find((candidate) => normalizeCountry(candidate.country) === normalizedCountry) ??
    COUNTRY_PRESETS.find((candidate) =>
      candidate.aliases.some((alias) => normalizeCountry(alias) === normalizedCountry),
    ) ??
    null;

  if (!preset) {
    return {
      country,
      preset: null,
      ...neutralCountryMeta,
    };
  }

  return {
    country: preset.country,
    flag: preset.flag,
    accentFrom: preset.accentFrom,
    accentTo: preset.accentTo,
    textColor: preset.textColor,
    preset,
  };
}

export function getSuggestedPlayers(
  countryMeta: ResolvedCountryMetadata | null,
  slot: { slotNumber: number; position: NormalizedPosition } | null,
): PresetPlayer[] {
  if (!countryMeta?.preset || !slot) {
    return [];
  }

  const slotMatches = countryMeta.preset.players.filter((player) => player.slotNumber === slot.slotNumber);

  if (slotMatches.length) {
    return slotMatches;
  }

  return countryMeta.preset.players.filter((player) => player.position === slot.position);
}
