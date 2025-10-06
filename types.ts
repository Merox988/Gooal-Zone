
export interface Competition {
  id: number;
  name: string;
  code: string;
  emblem: string;
  apiId: number;
}

export interface H2H {
  homeWins: number;
  draws: number;
  awayWins: number;
}

export interface Prediction {
  homeWinProbability: number;
  drawProbability: number;
  awayWinProbability: number;
  rationale: string;
  h2h: H2H;
}

// FIX: Add missing types for the football API data structure.
export interface Team {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest: string;
}

export interface TableEntry {
  position: number;
  team: Team;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Standing {
  stage: string;
  type: string;
  group: string | null;
  table: TableEntry[];
}

export interface StandingsResponse {
  standings: Standing[];
}