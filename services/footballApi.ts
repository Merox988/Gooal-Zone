import type { StandingsResponse, TableEntry, Team } from '../types';

const SPORTSDB_API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

const fetchFromSportsDB = async (endpoint: string) => {
  const response = await fetch(`${SPORTSDB_API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }
  return response.json();
}

/**
 * Cleans the logo URL from TheSportsDB API.
 * The API sometimes appends a '/preview' suffix which can lead to broken or watermarked images.
 * This function removes that suffix to get the full-quality logo.
 * @param url The original URL from the API.
 * @returns A cleaned URL string, or an empty string if the input is null/undefined.
 */
const cleanLogoUrl = (url: string | null | undefined): string => {
  if (!url) {
    return '';
  }
  if (url.endsWith('/preview')) {
    return url.slice(0, -8); // Remove the '/preview' part
  }
  return url;
};

export const getTeamsForCompetition = async (competitionId: number): Promise<Team[]> => {
  const data = await fetchFromSportsDB(`/lookup_all_teams.php?id=${competitionId}`);
  if (!data.teams) {
    return [];
  }

  const teams: Team[] = data.teams.map((team: any): Team => ({
    id: parseInt(team.idTeam),
    name: team.strTeam,
    crest: cleanLogoUrl(team.strTeamBadge),
  }));

  return teams;
};


export const getStandings = async (competitionId: number): Promise<StandingsResponse> => {
  // Use 2023-2024 season as it's the last completed one for most leagues
  const data = await fetchFromSportsDB(`/lookuptable.php?l=${competitionId}&s=2023-2024`);
  
  // Handle cases where a competition doesn't have a standard league table (e.g., Champions League)
  if (!data.table) {
    return { standings: [{ table: [], stage: 'REGULAR_SEASON', type: 'TOTAL', group: null }] };
  }
  
  const table: TableEntry[] = data.table.map((entry: any): TableEntry => {
    const team: Team = {
      id: parseInt(entry.idTeam),
      name: entry.strTeam,
      crest: cleanLogoUrl(entry.strTeamBadge),
    };
    
    return {
      position: parseInt(entry.intRank),
      team: team,
      playedGames: parseInt(entry.intPlayed),
      // Convert form "WLDWW" to "W,L,D,W,W" for the component
      form: entry.strForm ? entry.strForm.split('').join(',') : null,
      won: parseInt(entry.intWin),
      draw: parseInt(entry.intDraw),
      lost: parseInt(entry.intLoss),
      points: parseInt(entry.intPoints),
      goalsFor: parseInt(entry.intGoalsFor),
      goalsAgainst: parseInt(entry.intGoalsAgainst),
      goalDifference: parseInt(entry.intGoalDifference),
    };
  });

  return {
    standings: [{
      table: table,
      stage: 'REGULAR_SEASON',
      type: 'TOTAL',
      group: null,
    }]
  };
};

export const getTeamLogo = async (teamName: string): Promise<string | null> => {
  if (!teamName) return null;
  try {
    const data = await fetchFromSportsDB(`/searchteams.php?t=${encodeURIComponent(teamName)}`);
    if (data.teams && data.teams.length > 0) {
      // Prefer a team matching 'Soccer' if multiple sports are returned
      const footballTeam = data.teams.find((team: any) => team.strSport === 'Soccer');
      let logoUrl = footballTeam ? footballTeam.strTeamBadge : data.teams[0].strTeamBadge;

      // The API sometimes adds a /preview suffix, which we don't want for the full image.
      if (logoUrl && logoUrl.endsWith('/preview')) {
        logoUrl = logoUrl.slice(0, -8);
      }
      return logoUrl;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching logo for ${teamName}:`, error);
    return null;
  }
};