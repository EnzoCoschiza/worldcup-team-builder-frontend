import type { PlayerSlot } from "../types/team";

export const defaultFormation: PlayerSlot[] = [
  { slotNumber: 1, x: 50, y: 88, position: "goalkeeper", roleLabel: "GK" },
  { slotNumber: 2, x: 18, y: 68, position: "left-back", roleLabel: "LB" },
  { slotNumber: 3, x: 38, y: 70, position: "center-back", roleLabel: "CB" },
  { slotNumber: 4, x: 62, y: 70, position: "center-back", roleLabel: "CB" },
  { slotNumber: 5, x: 82, y: 68, position: "right-back", roleLabel: "RB" },
  { slotNumber: 6, x: 28, y: 48, position: "central-midfielder", roleLabel: "CM" },
  { slotNumber: 7, x: 50, y: 44, position: "defensive-midfielder", roleLabel: "DM" },
  { slotNumber: 8, x: 72, y: 48, position: "central-midfielder", roleLabel: "CM" },
  { slotNumber: 9, x: 25, y: 24, position: "left-wing", roleLabel: "LW" },
  { slotNumber: 10, x: 50, y: 18, position: "forward", roleLabel: "FW" },
  { slotNumber: 11, x: 75, y: 24, position: "right-wing", roleLabel: "RW" },
];
